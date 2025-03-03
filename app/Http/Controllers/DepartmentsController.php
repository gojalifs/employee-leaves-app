<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DepartmentsController extends Controller
{
    public function index()
    {
        try {
            $depts = Departments::orderBy('name')->get();
            return Inertia::render('Departments/Departments', ['depts' => $depts]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['error' => 'Something went wrong']);
        }
    }
}
