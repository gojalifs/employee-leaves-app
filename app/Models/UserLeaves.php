<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @mixin Builder
 * @mixin IdeHelperUserLeaves
 */
class UserLeaves extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'leave_id',
        'remaining_leaves',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function leave_type(): BelongsTo
    {
        return $this->belongsTo(Leaves::class, 'leaves_id');
    }
}
