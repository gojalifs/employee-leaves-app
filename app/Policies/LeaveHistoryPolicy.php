<?php

namespace App\Policies;

use App\Models\ApprovalLevels;
use App\Models\LeaveApprovals;
use App\Models\LeaveHistory;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class LeaveHistoryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, LeaveHistory $leaveHistory): bool
    {
        return $user->id === $leaveHistory->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LeaveHistory $leaveHistory): bool
    {
        return $user->id === $leaveHistory->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, LeaveHistory $leaveHistory): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, LeaveHistory $leaveHistory): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, LeaveHistory $leaveHistory): bool
    {
        return false;
    }

    public function cancel(User $user, LeaveHistory $leaveHistory): bool
    {
        return $user->id === $leaveHistory->user_id;
    }

    public function approve(User $user, LeaveHistory $leaveHistory): bool
    {
        /* 
            Get leave approvals by history id
        */
        $approval = LeaveApprovals::with(['approval'])
            ->where('leave_history_id', $leaveHistory->id)
            ->orderByDesc('created_at')
            ->first();
            
        /* 
            If approval is not found, check for the first approval,
            else check the next approval user
        */
        if (!isset($approval)) {
            // Get first approval object that contains user position and department
            $firstApproval = ApprovalLevels::where('departments_id', $user->departments_id)
                ->where('positions_id', $user->positions_id)
                ->where('level', 1)
                ->first();

            // If first approval not found, it means position and department 
            // is not same, so can't approve
            if (!isset($firstApproval)) {
                return false;
            }
            //TODO Blok if ini sudah kecover

            // Return true because current user is the first approver
            return true;
        } else {
            $nextApproval = $approval->approval->next_approval;

            // If user position is next approval, return true
            if (
                $user->positions_id === $nextApproval->positions_id &&
                $user->departments_id === $nextApproval->departments_id
            ) {
                return true;
            }

            return false;
        }
    }
}
