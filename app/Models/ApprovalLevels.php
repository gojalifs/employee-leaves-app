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
}
