<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserLeaves;
use App\Models\User;
use App\Models\Leaves;

class UserLeavesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserLeaves::create([
            'user_id' => 2,
            'leaves_id' => Leaves::first()->id,
            'remaining_leaves' => 12,
        ]);
    }
}
