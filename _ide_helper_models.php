<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $departments_id
 * @property int|null $requester_position_id
 * @property int $level
 * @property int $positions_id
 * @property int|null $next_level_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Departments $department
 * @property-read ApprovalLevels|null $next_approval
 * @property-read \App\Models\Positions $position
 * @property-read \App\Models\Positions|null $requester_position
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $user
 * @property-read int|null $user_count
 * @method static \Database\Factories\ApprovalLevelsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereDepartmentsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereNextLevelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels wherePositionsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereRequesterPositionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ApprovalLevels withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperApprovalLevels {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Database\Factories\DepartmentsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Departments withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperDepartments {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $leave_history_id
 * @property int $approval_levels_id
 * @property int $approver_id
 * @property string $status
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\ApprovalLevels $approval_level
 * @property-read \App\Models\User $approver
 * @method static \Database\Factories\LeaveApprovalsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereApprovalLevelsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereApproverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereLeaveHistoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveApprovals withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperLeaveApprovals {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $leaves_id
 * @property string $start_date
 * @property string $end_date
 * @property string $status
 * @property string $reason
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\LeaveApprovals> $leaveApprovals
 * @property-read int|null $leave_approvals_count
 * @property-read \App\Models\Leaves $leaveType
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\LeaveHistoryFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereLeavesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeaveHistory withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperLeaveHistory {}
}

namespace App\Models{
/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @property int $id
 * @property string $name
 * @property int $max_quantity
 * @property string|null $unit
 * @property string|null $period
 * @property int $fix_duration
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserLeaves> $user_leaves
 * @property-read int|null $user_leaves_count
 * @method static \Database\Factories\LeavesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereFixDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereMaxQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves wherePeriod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Leaves withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperLeaves {}
}

namespace App\Models{
/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Database\Factories\PositionsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Positions withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperPositions {}
}

namespace App\Models{
/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @property int $id
 * @property string $name
 * @property int $departments_id
 * @property int $positions_id
 * @property string $join_date
 * @property string|null $address
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int $is_default_password
 * @property-read \App\Models\Departments|null $department
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \App\Models\Positions|null $position
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDepartmentsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsDefaultPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereJoinDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePositionsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperUser {}
}

namespace App\Models{
/**
 * Represents the Positions model in the application.
 * 
 * Includes factory and soft delete capabilities.
 * Manages the 'name' attribute as a fillable property.
 *
 * @property int $id
 * @property int $user_id
 * @property int $leaves_id
 * @property int $remaining_leaves
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Leaves $leave_type
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\UserLeavesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereLeavesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereRemainingLeaves($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserLeaves withoutTrashed()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperUserLeaves {}
}

