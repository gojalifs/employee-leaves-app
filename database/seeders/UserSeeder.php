<?php

namespace Database\Seeders;

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
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 1,
                'positions_id' => 11,
            ],
            [
                'name' => 'User One',
                'email' => 'user1@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 1,
                'positions_id' => 1,
            ],
            [
                'name' => 'User Two',
                'email' => 'user2@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 2,
                'positions_id' => 2,
            ],
            [
                'name' => 'User Three',
                'email' => 'user3@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 3,
                'positions_id' => 3,
            ],
            [
                'name' => 'User Four',
                'email' => 'user4@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 4,
                'positions_id' => 4,
            ],
            [
                'name' => 'User Five',
                'email' => 'user5@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 1,
                'positions_id' => 5,
            ],
            [
                'name' => 'User Six',
                'email' => 'user6@hris.local',
                'password' => Hash::make('password'),
                'departments_id' => 2,
                'positions_id' => 6,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
