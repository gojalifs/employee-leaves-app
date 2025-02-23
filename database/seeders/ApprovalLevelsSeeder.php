<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ApprovalLevels;

class ApprovalLevelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ApprovalLevels::create([
            'departments_id' => 1,
            'level' => 1,
            'positions_id' => 1,
            'next_level_id' => null,
        ]);

        ApprovalLevels::create([
            'departments_id' => 1,
            'level' => 2,
            'positions_id' => 2,
            'next_level_id' => null,
        ]);

        ApprovalLevels::where('id', 1)->update(['next_level_id' => 2]);
    }
}
