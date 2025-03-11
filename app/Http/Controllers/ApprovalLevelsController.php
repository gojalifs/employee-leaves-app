<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ApprovalRequest;

use App\Models\ApprovalLevels;
use App\Models\Departments;
use App\Models\Positions;

class ApprovalLevelsController extends Controller
{
    public function index()
    {
        try {
            $approvals = ApprovalLevels::with([
                'department',
                'requester_position',
                'position',
                'next_approval'
            ])
                ->orderBy('departments_id')
                ->orderBy('requester_position_id')
                ->orderBy('level')
                ->get();

            return Inertia::render('Approval/Approval', ['approvals' => $approvals]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Something went wrong']);
        }
    }

    public function create()
    {
        $depts = Departments::orderBy('name')->get();
        $positions = Positions::whereNot('id', 11)->orderBy('name')->get();
        $approvals = ApprovalLevels::with([
            'position:id,name',
            'department:id,name'
        ])
            ->orderByDesc('id')
            ->get(['id', 'positions_id', 'departments_id']);

        return Inertia::render('Approval/Add/AddApprovalPage', [
            'depts'     => $depts,
            'positions' => $positions,
            'approvals' => $approvals,
        ]);
    }

    public function store(ApprovalRequest $request)
    {
        try {
            $approval = new ApprovalLevels();
            $approval->departments_id = $request->department;
            $approval->requester_position_id = $request->requester_position;
            $approval->level = $request->approval_level;
            $approval->positions_id = $request->approval_position;
            $approval->next_level_id = $request->next_approval;

            $approval->save();

            return to_route('approval')->with('message', 'Employee added successfully ');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to add employee']);
        }
    }

    public function show($id)
    {
        try {
            $approvalLevel = ApprovalLevels::with([
                'department',
                'requester_position',
                'position',
                'next_approval' => function ($query) {
                    $query->orderByDesc('id');
                }
            ])->find($id);

            $depts = Departments::orderBy('name')->get();
            $positions = Positions::whereNot('id', 11)->orderBy('name')->get();
            $approvals = ApprovalLevels::with([
                'position:id,name',
                'department:id,name'
            ])
                ->orderByDesc('id')
                ->get(['id', 'positions_id', 'departments_id']);
            // dd($approvalLevel->toArray());
            return Inertia::render('Approval/Edit/EditPage', [
                'approval'  => $approvalLevel,
                'depts'     => $depts,
                'positions' => $positions,
                'approvals' => $approvals,
            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed get user data']);
        }
    }

    public function update(ApprovalRequest $request, $id)
    {
        try {
            $approval = ApprovalLevels::find($id);
            $approval->departments_id = $request->department;
            $approval->requester_position_id = $request->requester_position;
            $approval->level = $request->approval_level;
            $approval->positions_id = $request->approval_position;
            $approval->next_level_id = $request->next_approval;

            $approval->save();

            return to_route('approval', $id)->with('message', 'Success update user data');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to update data']);
        }
    }

    public function destroy($id)
    {
        try {
            $user = ApprovalLevels::findOrFail($id);
            $user->delete();

            return to_route('approval')->with('message', 'User deleted');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return back()->withErrors(['msg' => 'Failed to delete user!']);
        }
    }
}
