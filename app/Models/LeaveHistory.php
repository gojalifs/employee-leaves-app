<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveHistory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'leaves_id',
        'start_date',
        'end_date',
        'status',
        'reason',
        'note',
    ];

    public function leaveType()
    {
        return $this->belongsTo(Leaves::class, 'leaves_id');
    }

    public function leaveApprovals()
    {
        return $this->hasMany(LeaveApprovals::class, 'leave_history_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
