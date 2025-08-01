<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @mixin Builder
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    /**
     * This model uses the following traits:
     * - HasFactory: Provides factory methods for creating model instances.
     * - Notifiable: Allows the model to send notifications.
     * - HasRoles: Adds role-based authorization capabilities to the model.
     */
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'departments_id',
        'positions_id',
        'address',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Departments::class, 'departments_id');
    }

    public function position()
    {
        return $this->belongsTo(Positions::class, 'positions_id');
    }
}
