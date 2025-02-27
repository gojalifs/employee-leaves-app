<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Departments;
use App\Models\Positions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {

        $search = $request->query("search");

        $users = User::with(['department', 'position'])
            ->where('name', 'LIKE', "%$search%")
            ->orWhere('email', 'LIKE', "%$search%")
            ->orWhereHas('department', function ($query) use ($search) {
                $query->where('name', 'LIKE', "%$search%");
            })
            ->orWhereHas('position', function ($query) use ($search) {
                $query->where('name', 'LIKE', "%$search%");
            })
            ->get();

        return Inertia::render('Employee/Employee', ['users' => $users]);
    }

    public function create()
    {
        $depts = Departments::orderBy('name')->get();
        $positions = Positions::whereNot('id', 11)->orderBy('name')->get();

        return Inertia::render('Employee/Add/AddEmployeePage', [
            'depts'     => $depts,
            'positions' => $positions,
        ]);
    }

    public function store(UserRequest $request)
    {
        try {
            $user = new User();
            $user->name             = $request->full_name;
            $user->email            = $request->email;
            $user->departments_id   = $request->department;
            $user->positions_id     = $request->position;
            $user->address          = $request->address;
            $user->save();

            Log::error($request->all());

            return to_route('employee')->with('success', 'Employee added successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to add employee']);
        }
    }
}
