<?php

namespace App\Http\Controllers;

use App\Models\LeaveHistory;
use App\Models\UserLeaves;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetching data for the dashboard
        // Get user leave count
        $userLeave = UserLeaves::with(['user', 'leave_type'])
            ->where('user_id', request()->user()->id)->get();

        $activeLeaves = LeaveHistory::with(['leaveType'])->where('user_id', request()->user()->id)
            ->where('status', 'pending')->get();

        return Inertia::render('Dashboard', [
            'user_leave'    => $userLeave,
            'active_leaves' => $activeLeaves,
        ]);
    }
}
