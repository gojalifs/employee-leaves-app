<?php

namespace Database\Seeders;

use App\Models\LeaveApprovals;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LeaveApproval;
use App\Models\LeaveHistory;
use App\Models\ApprovalLevels;
use App\Models\User;

class LeaveApprovalsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LeaveApprovals::create([
            'leave_history_id' => LeaveHistory::first()->id,
            'approval_levels_id' => ApprovalLevels::first()->id,
            'approver_id' => User::first()->id,
            'status' => 'approved',
            'comment' => 'Approved by manager',
        ]);

        LeaveApprovals::create([
            'leave_history_id' => LeaveHistory::find(2)->id,
            'approval_levels_id' => ApprovalLevels::find(2)->id,
            'approver_id' => User::find(2)->id,
            'status' => 'approved',
            'comment' => 'Approved',
        ]);
    }
}
