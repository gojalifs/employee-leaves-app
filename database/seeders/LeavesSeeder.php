<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeavesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('leaves')->insert([
            ['name' => 'Annual Leave', 'max_quantity' => 12],
            ['name' => 'Sick Leave', 'max_quantity' => 6],
            ['name' => 'Maternity Leave', 'max_quantity' => 90],
            ['name' => 'Paternity Leave', 'max_quantity' => 10],
        ]);
    }
}
