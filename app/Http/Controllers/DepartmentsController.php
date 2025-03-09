<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
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
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Departments/Add/AddDeptPage');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    public function store(DepartmentRequest $request)
    {
        try {
            $dept = new Departments();
            $dept->name = $request->name;
            $dept->save();

            return to_route('dept')->with('message', 'New Department added successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to add department']);
        }
    }

    public function show($id)
    {
        try {
            $dept = Departments::findOrFail($id);

            return Inertia::render('Departments/Edit/EditPage', ['dept' => $dept]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to get department data']);
        }
    }

    public function update(DepartmentRequest $request, $id)
    {
        try {
            $user = Departments::findOrFail($id);
            $user->name = $request->name;
            $user->save();

            return to_route('dept', $id)->with('message', 'Success update department data');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to update data']);
        }
    }

    public function destroy($id)
    {
        try {
            $user = Departments::findOrFail($id);
            $user->delete();

            return to_route('dept')->with('message', 'Department deleted');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to delete department!']);
        }
    }
}
