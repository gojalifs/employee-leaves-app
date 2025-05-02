<?php

namespace App\Http\Controllers;

use App\Models\ApprovalLevels;
use App\Models\LeaveApprovals;
use App\Models\LeaveHistory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RequestApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();
        // Check user policy
        // if ($user->cannot('approve', new LeaveHistory())) {
        //     abort(403);
        // }

        try {
            // Get All user requests
            // with leave type and user details
            $leaveRequest = LeaveHistory::with(['user', 'leaveType', 'leaveApprovals' => function ($query) {
                $query->orderByDesc('created_at')->first();
            }, 'leaveApprovals.approver'])
                ->whereRelation('user', function (Builder $query) use ($user) {
                    $query->where('departments_id', $user->departments_id)
                        ->where('positions_id', '<', $user->positions_id);
                })
                ->whereRelation('leaveApprovals', function (Builder $query) use ($user) {
                    $query->where('approver_id', '!=', $user->id);
                })
                ->where('status', 'pending')
                ->get();
            return Inertia::render('RequestApproval/Index', [
                'requests' => $leaveRequest,
            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error']);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LeaveHistory $requestApproval)
    {
        // Check user policy
        if (request()->user()->cannot('approve', $requestApproval)) {
            abort(403);
        }

        // dd('lolos', $requestApproval);
        $leaveHistory = LeaveHistory::with(['user', 'leaveType'])
            ->where('status', '!=', 'approved')
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('RequestApproval/RequestApproval', [
            'leaveHistory' => $leaveHistory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LeaveHistory $requestApproval)
    {
        // dd($requestApproval);
        if (request()->user()->cannot('approve', $requestApproval)) {
            abort(403);
        }

        try {
            $user = request()->user();
            // dd($request->fullUrl(), $requestApproval->id, $requestApproval);
            // cek dulu last approval di tabel leave approvals
            // jika ada last approval, ambil data di approval_levels
            $lastApproval = LeaveApprovals::with(['approval_level'])
                ->where('leave_history_id', $requestApproval->id)
                ->orderByDesc('created_at')
                ->first();

            // Jika last approval tidak null dan next approval di approval level tidak null, maka verif user sekarang dengan next approval
            if (isset($lastApproval) && isset($lastApproval->approval_level->next_level_id)) {
                $nextApproval = ApprovalLevels::find($lastApproval->approval_level->next_level_id);

                if ($user->positions_id !== $nextApproval->positions_id || $user->departments_id !== $nextApproval->departments_id) {
                    // dd('lolos', $nextApproval->toArray(), $user->toArray());
                    // dd($nextApproval->toArray(), $user->toArray());
                    // return true;
                    return back()->withErrors(['msg' => 'You are not allowed to approve this request']);
                }
            } else {
                // ambil approval lvl 1
                $nextApproval = ApprovalLevels::where('positions_id', $user->positions_id)
                    ->where('departments_id', $user->departments_id)
                    ->where('level', 1)
                    ->first();
            }

            DB::transaction(
                function () use ($requestApproval, $nextApproval, $user, $request) {
                    // Update leave history status
                    $data = [
                        'leave_history_id' => $requestApproval->id,
                        'approval_levels_id' => $nextApproval->id,
                        'approver_id' => $user->id,
                        'status' => $request->input('status'),
                        'comment' => $request->input('comment'),
                    ];

                    LeaveApprovals::create($data);

                    // Jika next level id null, maka update history jadi approve/rejected based on status
                    if (!isset($nextApproval->next_level_id)) {
                        $requestApproval->update([
                            'status' => $request->input('status'),
                        ]);
                    }
                }
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveHistory $leaveHistory)
    {
        //
    }
}
