<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveHistoryCreateRequest;
use App\Http\Requests\LeaveHistoryUpdateRequest;
use App\Models\LeaveHistory;
use App\Models\Leaves;
use App\Models\UserLeaves;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LeaveHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = request()->user();

            // Get all user requests
            // with leave type and user details
            $leaveRequest = LeaveHistory::where('user_id', $user->id)
                ->with(['leaveType', 'user'])
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render('Request/Index', ['requests' => $leaveRequest]);
        } catch (\Throwable $th) {
            // Log the error message
            Log::error($th->getMessage());

            // Return a back response with an error message
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            $user = request()->user();

            // Get all user requests
            $leaveRequest = LeaveHistory::where('user_id', $user->id)
                ->with(['leaveType', 'user'])
                ->orderBy('created_at', 'desc')
                ->get();

            // Get all leave types that correspond to the user
            $leaveTypes = UserLeaves::where('user_id', $user->id)
                ->with(['leave_type'])
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render('Request/Add/AddLeaveRequestPage', [
                'requests'      => $leaveRequest,
                'leave_types'   => $leaveTypes
            ]);
        } catch (\Throwable $th) {
            // Log the error message
            Log::error($th->getMessage());

            // Return a back response with an error message
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LeaveHistoryCreateRequest $request)
    {
        try {
            $validated = $request->validated();
            $user = $request->user();

            DB::transaction(function () use ($validated, $user) {
                // Check if the leave type is available for the user
                $leaveType = UserLeaves::where('user_id', $user->id)
                    ->where('leaves_id', $validated['leave_type_id'])
                    ->first();

                if (!$leaveType) {
                    return back()->withErrors(['msg' => 'Leave type not available']);
                }

                // Check if the leave type is available for the user
                if ($leaveType->remaining_leaves <= 0) {
                    return back()->withErrors(['msg' => 'No remaining leaves']);
                }

                // Check if the leave request date count more that the remaining leaves
                $startDate  = date('Y-m-d', strtotime($validated['start_date']));
                $endDate    = date('Y-m-d', strtotime($validated['end_date']));

                $carbonStartDate = Carbon::createFromFormat('Y-m-d', $startDate);
                $carbonEndDate = Carbon::createFromFormat('Y-m-d', $endDate);
                if ($carbonStartDate->greaterThan($carbonEndDate)) {
                    return back()->withErrors(['msg' => 'Start date must be less than end date']);
                }

                // Exclude weekends from the date range
                $diff = 0;
                $currentDate = $carbonStartDate->copy();
                while ($currentDate->lte($carbonEndDate)) {
                    if (!$currentDate->isWeekend()) {
                        $diff++;
                    }
                    $currentDate->addDay();
                }

                // Calculate the difference in days
                // between the start and end dates
                // and add 1 to include the start date
                // and end date in the count
                // $diff = $carbonStartDate->diffInDays($carbonEndDate) + 1;

                if ($diff > $leaveType->remaining_leaves) {
                    return back()->withErrors(['msg' => 'Leave request date count more that the remaining leaves']);
                }

                // Create new leave request for user
                LeaveHistory::create([
                    'user_id'       => $user->id,
                    'leaves_id'     => $validated['leave_type_id'],
                    'start_date'    => date('Y-m-d', strtotime($validated['start_date'])),
                    'end_date'      => date('Y-m-d', strtotime($validated['end_date'])),
                    'reason'        => $validated['reason'],
                    'note'          => $validated['note'],
                ]);

                // Update the remaining leaves for the user
                $leaveType->remaining_leaves -= $diff;
                $leaveType->save();
            });

            return to_route('request.index')->with('message', 'Leave request created successfully');
        } catch (\Throwable $th) {
            // Log the error message
            Log::error($th->getMessage());

            // Return a back response with an error message
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, LeaveHistory $leaveHistory)
    {
        if ($request->user()->cannot('view', $leaveHistory)) {
            abort(403);
        }

        try {
            $leaveHistory->load(['leaveType', 'user']);

            return Inertia::render('Request/Edit/EditLeaveRequestPage', [
                'user_leave' => $leaveHistory
            ]);
        } catch (\Throwable $th) {
            // Log the error message
            Log::error($th->getMessage());

            // Return a back response with an error message
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeaveHistory $leaveHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LeaveHistoryUpdateRequest $request, LeaveHistory $leaveHistory)
    {
        try {
            $validated = $request->validated();
            $user = $request->user();

            // Check if the leave type is available for the user
            $leaveType = UserLeaves::where('user_id', $user->id)
                ->where('leaves_id', $validated['leave_type_id'])
                ->first();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveHistory $leaveHistory)
    {
        //
    }

    public function cancel(LeaveHistory $leaveHistory)
    {
        // Check if the user is authorized to cancel the leave request
        if (request()->user()->cannot('cancel', $leaveHistory)) {
            abort(403);
        }

        try {
            $user = request()->user();

            DB::transaction(function () use ($user, $leaveHistory) {

                // Check if the leave type is available for the user
                $leaveType = Leaves::where('id', $leaveHistory->leaves_id)
                    ->first();

                $userLeave = UserLeaves::where('user_id', $user->id)
                    ->where('leaves_id', $leaveType->id)
                    ->first();

                if (!$leaveType) {
                    return back()->withErrors(['msg' => 'Leave type not available']);
                }

                // Check if the leave request is already cancelled
                if ($leaveHistory->status == 'cancelled') {
                    return back()->withErrors(['msg' => 'Leave request already cancelled']);
                }

                // Update the leave request status to cancelled
                $leaveHistory->status = 'cancelled';
                $leaveHistory->save();

                // Update the remaining leaves for the user
                $startDate = Carbon::createFromFormat('Y-m-d', $leaveHistory->start_date);
                $endDate = Carbon::createFromFormat('Y-m-d', $leaveHistory->end_date);

                $diff = 0;
                $currentDate = $startDate->copy();

                // Check if the unit is 'work day'
                if ($leaveType->unit === 'work day') {
                    while ($currentDate->lte($endDate)) {
                        if (!$currentDate->isWeekend()) {
                            $diff++;
                        }
                        $currentDate->addDay();
                    }
                } else {
                    // Include all days if unit is not 'work day'
                    $diff = $startDate->diffInDays($endDate) + 1;
                }

                $userLeave->remaining_leaves += $diff;
                $userLeave->save();
            });

            return to_route('request.index')->with('message', 'Leave request cancelled successfully');
        } catch (\Throwable $th) {
            // Log the error message
            Log::error($th->getMessage());

            // Return a back response with an error message
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }
}
