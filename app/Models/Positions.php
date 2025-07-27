<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @mixin Builder
 * @mixin IdeHelperPositions
 */
class Positions extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];
}
