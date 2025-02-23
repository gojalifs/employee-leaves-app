<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LeaveHistory;
use App\Models\Leaves;
use Illuminate\Support\Facades\DB;

class LeaveHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LeaveHistory::create([
            'user_id' => 3,
            'leaves_id' => Leaves::first()->id,
            'start_date' => '2025-03-01',
            'end_date' => '2025-03-10',
            'status' => 'approved',
            'reason' => 'Vacation',
            'note' => 'Family trip',
        ]);

        LeaveHistory::create([
            'user_id' => 2,
            'leaves_id' => Leaves::first()->id,
            'start_date' => '2025-04-15',
            'end_date' => '2025-04-20',
            'status' => 'pending',
            'reason' => 'Medical leave',
            'note' => 'Surgery',
        ]);
    }
}
