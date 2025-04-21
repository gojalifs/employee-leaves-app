<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveApprovals extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'leave_history_id',
        'approval_level_id',
        'approver_id',
        'status',
        'comment',
    ];

    public function approval_level()
    {
        return $this->belongsTo(ApprovalLevels::class, 'approval_level_id');
    }
}
