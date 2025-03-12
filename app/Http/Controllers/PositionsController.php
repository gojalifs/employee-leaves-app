<?php

namespace App\Http\Controllers;

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
            $positions = Positions::class::all();

            return Inertia::render('Position/Index', [
                'positions' => $positions,
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['msg' => 'Failed to get positions data']);
        }
    }
}
