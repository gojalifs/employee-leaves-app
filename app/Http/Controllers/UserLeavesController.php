<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeavesRequest;
use App\Models\Leaves;
use App\Models\User;
use App\Models\UserLeaves;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserLeavesController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $leaves = UserLeaves::with(['user', 'leave_type'])
            ->where('user_id', '!=', $user->id)
            ->orderBy('user_id')
            ->orderBy('leaves_id')
            ->get();

        return Inertia::render('EmployeeLeaves/EmployeeLeave', ['leaves' => $leaves]);
    }

    public function create(Request $request)
    {
        try {
            $users = (new User)->where('positions_id', '!=', 11)->get();
            $leaves = (new Leaves)->all();
            return Inertia::render('EmployeeLeaves/Add/AddEmployeeLeavePage', [
                'users' => $users,
                'leave_types' => $leaves,
            ]);
        } catch (Exception $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error']);
        }
    }

    public function store(Request $request): RedirectResponse
    {
        try {

            DB::transaction(function () use ($request) {
                $user = $request->employee_id;
                $user_leaves = collect($request->leave_type)->map(function ($leave_type_id) use ($user) {
                    $leaveType = (new Leaves)->findOrFail($leave_type_id);

                    if (!$leaveType instanceof Leaves) {
                        throw new Exception('Invalid data type for $leaveType. Expected instance of Leaves.');
                    }

                    return [
                        'user_id' => $user,
                        'leaves_id' => $leaveType->id,
                        'remaining_leaves' => $leaveType->max_quantity,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                });

                UserLeaves::insert($user_leaves->toArray());
            });

            return to_route('employee-leave.index')->with('message', 'New Leave added successfully');

        } catch (Exception $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error']);
        }
    }

    public function show($id)
    {
        try {
            $employeeLeave = UserLeaves::with(['user', 'leave_type'])->findOrFail($id);

            return Inertia::render('EmployeeLeaves/Edit/EditPage', ['employeeLeave' => $employeeLeave]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error']);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $roles = [
                'remaining_leave' => 'required|numeric|min:0',
            ];

            $request->validate($roles);

            $userLeave = UserLeaves::findOrFail($id);
            $userLeave->remaining_leaves = $request->remaining_leave;
            $userLeave->save();

            return to_route('employee-leave.index')->with('message', 'Leave updated successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something error']);
        }
    }

    public function destroy($id)
    {
        try {
            $userLeave = UserLeaves::find($id);
            $userLeave->delete();

            return to_route('employee-leave.index')->with('message', 'User Leave deleted');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to delete user leave!']);
        }
    }
}
