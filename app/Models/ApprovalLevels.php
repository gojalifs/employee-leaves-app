<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApprovalLevels extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'department_id',
        'level',
        'position_id',
        'next_level_id',
    ];

    public function department()
    {
        return $this->belongsTo(Departments::class, 'departments_id');
    }

    public function position()
    {
        return $this->belongsTo(Positions::class, 'positions_id');
    }

    public function next_approval()
    {
        return $this->belongsTo(ApprovalLevels::class, 'next_level_id');
    }

    public function requester_position(){
        return $this->belongsTo(Positions::class, 'requester_position_id');
    }
}
