<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperLeaveApprovals
 */
class LeaveApprovals extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'leave_history_id',
        'approval_levels_id',
        'approver_id',
        'status',
        'comment',
    ];

    public function approval_level()
    {
        return $this->belongsTo(ApprovalLevels::class, 'approval_levels_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
