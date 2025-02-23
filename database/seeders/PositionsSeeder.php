<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Positions;

class PositionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            'staff',
            'leader',
            'foreman',
            'supervisor',
            'assistant manager',
            'manager',
            'senior manager',
            'director',
            'vice president director',
            'president director',
            'super_admin',
        ];

        foreach ($positions as $position) {
            Positions::create(['name' => $position]);
        }
    }
}
