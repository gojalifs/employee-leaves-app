<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Http\Requests\UserRequest;
use App\Models\Departments;
use App\Models\Leaves;
use App\Models\Positions;
use App\Models\User;
use App\Models\UserLeaves;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

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

        return Inertia::render('Employee/Employee', [
            'users' => $users,
            'message' => 'Employee added successfully '
        ])->with('message', 'Employee added successfully');
    }

    public function create()
    {
        $depts = Departments::orderBy('name')->get();
        $positions = Positions::whereNot('id', 11)->orderBy('name')->get();
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Employee/Add/AddEmployeePage', [
            'depts' => $depts,
            'positions' => $positions,
            'roles' => $roles,
        ]);
    }

    public function store(UserRequest $request)
    {
        try {
            $user = new User();
            $user->name = $request->full_name;
            $user->email = $request->email;
            $user->departments_id = $request->department;
            $user->positions_id = $request->position;
            $user->address = $request->address;
            $user->save();

            $user->assignRole($request->role);

            return to_route('employee')->with('message', 'Employee added successfully ');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to add employee']);
        }
    }

    public function show($id)
    {
        try {
            $user = User::with(['department', 'position'])->find($id);
            $depts = Departments::orderBy('name')->get();
            $positions = Positions::whereNot('id', 11)->orderBy('name')->get();
            $roles = Role::orderBy('name')->get();
            $userRoles = $user->getRoleNames();
            $user->roles = $userRoles;

            return Inertia::render('Employee/Edit/EditPage', [
                'user' => $user,
                'depts' => $depts,
                'positions' => $positions,
                'roles' => $roles,

            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed get user data']);
        }
    }

    public function update(UserRequest $request, $id)
    {
        try {
            DB::transaction(function () use ($request, $id) {
//                $roles = [];
//                array_map(function ($role) {
//                    $roles[] = Role::findByName($role);
//                }, $request->role);

                $user = User::findOrFail($id);
                $user->email = $request->email;
                $user->name = $request->full_name;
                $user->address = $request->address;
                $user->departments_id = $request->department;
                $user->positions_id = $request->position;
                $user->save();

//                dd($roles);
                $user->assignRole($request->role);
            });

            return to_route('employee', $id)->with('message', 'Success update user data');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to update data']);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return to_route('employee')->with('message', 'User deleted');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to delete user!']);
        }
    }

    public function set_password()
    {
        return Inertia::render('Password/ChangePasswordPage');
    }

    public function store_password(Request $request)
    {
        try {
            $rules = [
                'password' => 'required|min:8|confirmed',
            ];
            $request->validate($rules);

            $user = User::find(Auth::user()->id);
            $user->password = Hash::make($request->password);
            $user->is_default_password = 0;
            $user->save();

            return to_route('dashboard')->with('success', 'success change password!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->getMessage());
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error!']);
        }
    }

    public function assignRole(Request $request)
    {
        try {
            $user = $request->user();

            // $user->assignRole(RoleEnum::SUPER_ADMIN);
            // Role::findBYName(RoleEnum::SUPER_ADMIN->value)->givePermissionTo(Permission::all());
            // $role = Role::findByName(RoleEnum::HR->value);
            return response()->json([
                'msg' => 'Role assigned successfully',
                'role' => $user->hasAnyRole([RoleEnum::HR, RoleEnum::SUPER_ADMIN]),
                'permission' => $user->hasPermissionTo(PermissionEnum::ADD_NEW_USERS->value),
            ]);

            return back()->with('success', 'Role assigned successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to assign role']);
        }
    }
}
