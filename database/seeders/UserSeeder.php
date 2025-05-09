<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $su = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@hris.local',
            'password' => Hash::make('password'),
            'departments_id' => 1,
            'positions_id' => 11,
        ]);
        $su->assignRole(RoleEnum::SUPER_ADMIN);

        $hr = User::create([
            'name' => 'User HR One',
            'email' => 'hr@hris.local',
            'password' => Hash::make('password'),
            'departments_id' => 1,
            'positions_id' => 1,
        ]);
        $hr->assignRole(RoleEnum::HR);
    }
}
