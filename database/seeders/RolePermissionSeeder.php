<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::beginTransaction();

        // Create Roles
        $roles = [
            'staff',
            'middle-management',
            'managerial',
            'executive',
            RoleEnum::HR,
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Create Permissions
        $permissions = [
            'view own leave requests',
            'create leave request',
            'cancel own leave request',
            'view team leave requests',
            'approve leave requests',
            'override leave approvals',
            'manage leave policies',
            'view leave reports',
            PermissionEnum::ADD_NEW_USERS,
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign Permissions to Roles
        Role::findByName('staff')->givePermissionTo(['view own leave requests', 'create leave request', 'cancel own leave request']);
        Role::findByName('middle-management')->givePermissionTo(['view team leave requests', 'approve leave requests']);
        Role::findByName('managerial')->givePermissionTo(['override leave approvals', 'manage leave policies', 'view leave reports']);
        Role::findByName('executive')->givePermissionTo(Permission::all());
        Role::findBYName(RoleEnum::HR->value)->givePermissionTo([
            PermissionEnum::VIEW_OWN_LEAVE_REQUESTS,
            PermissionEnum::CREATE_LEAVE_REQUEST,
            PermissionEnum::CANCEL_OWN_LEAVE_REQUEST,
            PermissionEnum::VIEW_TEAM_LEAVE_REQUESTS,
            PermissionEnum::APPROVE_LEAVE_REQUESTS,
            PermissionEnum::OVERRIDE_LEAVE_APPROVALS,
            PermissionEnum::ADD_NEW_USERS,
        ]);

        DB::commit();
    }
}
