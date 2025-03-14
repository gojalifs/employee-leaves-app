<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionRequest;
use App\Models\Positions;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PositionsController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        try {
            $positions = Positions::where('name', '!=', 'super_admin')->get();

            return Inertia::render('Position/Index', [
                'positions' => $positions,
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to get positions data']);
        }
    }

    public function show($id)
    {
        try {
            $position = Positions::find($id);
            return Inertia::render('Position/Edit/EditPage', ['position' => $position]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to get position data']);
        }
    }

    public function update(PositionRequest $request, $id): RedirectResponse
    {
        try {
            $position = Positions::find($id);
            $position->name = $request->position_name;
            $position->save();

            return redirect()->route('position')->with('msg', 'Successfully updated position');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to update position']);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Position/Add/AddPositionPage');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to get position data']);
        }
    }

    public function store(PositionRequest $request): RedirectResponse
    {
        try {
            $position = new Positions();
            $position->name = $request->position_name;
            $position->save();

            return redirect()->route('position')->with('msg', 'Successfully added new position');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to save new data']);
        }
    }

    public function destroy($id)
    {
        try {
            Positions::destroy($id);
            return redirect()->route('position')->with('msg', 'Successfully deleted position');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to delete position']);
        }
    }
}
