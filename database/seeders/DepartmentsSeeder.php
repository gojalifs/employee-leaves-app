<?php

namespace Database\Seeders;

use App\Models\Departments;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $depts = [
            [
                'name' => 'IT',
            ],
            [
                'name' => 'HR',
            ],
            [
                'name' => 'FINANCE',
            ],
            [
                'name'  => 'PRODUCTION'
            ]
        ];

        Departments::insert($depts);
    }
}
