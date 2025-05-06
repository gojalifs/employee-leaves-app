<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeavesRequest;
use App\Models\Leaves;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LeavesController extends Controller
{
    public function index()
    {
        try {
            $leaves = Leaves::orderBy('name')->get();
            return Inertia::render('Leaves/Leaves', ['leaves' => $leaves]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Leaves/Add/AddLeaveTypePage');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    public function store(LeavesRequest $request)
    {
        try {
            $leave = new Leaves();
            $leave->name = $request->leave_name;
            $leave->max_quantity = $request->max_quantity;
            $leave->save();

            return to_route('leave')->with('message', 'New Department added successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to add department']);
        }
    }

    public function show($id)
    {
        try {
            $leave = Leaves::findOrFail($id);

            return Inertia::render('Leaves/Edit/EditPage', ['leave' => $leave]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to get leave data']);
        }
    }

    public function update(LeavesRequest $request, $id)
    {
        try {
            $leave = Leaves::findOrFail($id);
            $leave->name = $request->leave_name;
            $leave->max_quantity = $request->max_quantity;
            $leave->save();

            return to_route('leave', $id)->with('message', 'Success update department data');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to update data']);
        }
    }

    public function destroy($id)
    {
        try {
            $user = Leaves::findOrFail($id);
            $user->delete();

            return to_route('leave')->with('message', 'Department deleted');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to delete department!']);
        }
    }
}
