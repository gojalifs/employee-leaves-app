<?php

namespace App\Http\Controllers;

use App\Models\LeaveHistory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RequestApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = request()->user();
            // Check user policy
            if ($user->cannot('approve', new LeaveHistory())) {
                abort(403);
            }

            // Get All user requests
            // with leave type and user details
            $leaveRequest = LeaveHistory::with(['user', 'leaveType'])
                ->whereRelation('user', function (Builder $query) use ($user) {
                    $query->where('departments_id', $user->departments_id);
                })
                ->where('status', 'pending')
                ->get();

            // // Get all leave requests that are not approved
            // $leaveHistory = LeaveHistory::with([
            //     'user',
            //     'leaveType',
            //     'leaveApprovals',
            //     'leaveApprovals.approval_level',
            //     'leaveApprovals.approval_level.approval_level' => function ($query) use ($user) {
            //         return $query->where('positions_id', $user->positions_id)->where('departments_id', $user->departments_id)->select('*');
            //     }
            // ])
            //     ->where('status', 'pending')
            //     ->get();

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
    public function show(LeaveHistory $leaveHistory)
    {
        // Check user policy
        if (request()->user()->cannot('approve', $leaveHistory)) {
            abort(403);
        }

        // dd('lolos');
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
    public function update(Request $request, LeaveHistory $leaveHistory)
    {
        dd($leaveHistory);
        if (request()->user()->cannot('approve', $leaveHistory)) {
            abort(403);
        }

        dd($request->fullUrl(), $leaveHistory->id, $leaveHistory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveHistory $leaveHistory)
    {
        //
    }
}
