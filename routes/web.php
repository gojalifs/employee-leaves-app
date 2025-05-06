<?php

use App\Http\Controllers\LeaveHistoryController;
use App\Http\Controllers\PositionsController;
use App\Http\Controllers\UserLeavesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Enums\RoleEnum;
use App\Http\Controllers\ApprovalLevelsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\LeavesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestApprovalController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect()->route('dashboard');
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('set_password', [UserController::class, 'set_password'])->name('set.password');
    Route::post('set_password', [UserController::class, 'store_password'])->name('save.password');

    Route::group(['middleware' => ['role:' . RoleEnum::SUPER_ADMIN->value . '|' . RoleEnum::HR->value]], function () {
        Route::get('employee', [UserController::class, 'index'])->name('employee');
        Route::get('employee_add', [UserController::class, 'create'])->name('employee.add');
        Route::post('employee_add', [UserController::class, 'store'])->name('employee.store');
        Route::get('employee_edit/{id}', [UserController::class, 'show'])->name('employee.show');
        Route::patch('employee_edit/{id}', [UserController::class, 'update'])->name('employee.update');
        Route::delete('employee_delete/{id}', [UserController::class, 'destroy'])->name('employee.destroy');
    });

    Route::group([
        'prefix'        => 'dept',
        'middleware'    => ['role:' . RoleEnum::SUPER_ADMIN->value . '|' . RoleEnum::HR->value]
    ], function () {
        Route::get('/', [DepartmentsController::class, 'index'])->name('dept');
        Route::get('add', [DepartmentsController::class, 'create'])->name('dept.add');
        Route::post('add', [DepartmentsController::class, 'store'])->name('dept.store');
        Route::get('edit/{id}', [DepartmentsController::class, 'show'])->name('dept.show');
        Route::patch('edit/{id}', [DepartmentsController::class, 'update'])->name('dept.update');
        Route::delete('delete/{id}', [DepartmentsController::class, 'destroy'])->name('dept.destroy');
    });

    Route::group([
        'prefix'        => 'leave',
        'middleware'    => ['role:' . RoleEnum::SUPER_ADMIN->value . '|' . RoleEnum::HR->value]
    ], function () {
        Route::get('/', [LeavesController::class, 'index'])->name('leave');
        Route::get('add', [LeavesController::class, 'create'])->name('leave.add');
        Route::post('add', [LeavesController::class, 'store'])->name('leave.store');
        Route::get('edit/{id}', [LeavesController::class, 'show'])->name('leave.show');
        Route::patch('edit/{id}', [LeavesController::class, 'update'])->name('leave.update');
        Route::delete('delete/{id}', [LeavesController::class, 'destroy'])->name('leave.destroy');
    });

    Route::group([
        'prefix'        => 'approval',
        'middleware'    => ['role:' . RoleEnum::SUPER_ADMIN->value . '|' . RoleEnum::HR->value]
    ], function () {
        Route::get('/', [ApprovalLevelsController::class, 'index'])->name('approval');
        Route::get('add', [ApprovalLevelsController::class, 'create'])->name('approval.add');
        Route::post('add', [ApprovalLevelsController::class, 'store'])->name('approval.store');
        Route::get('edit/{id}', [ApprovalLevelsController::class, 'show'])->name('approval.show');
        Route::patch('edit/{id}', [ApprovalLevelsController::class, 'update'])->name('approval.update');
        Route::delete('delete/{id}', [ApprovalLevelsController::class, 'destroy'])->name('approval.destroy');
    });

    Route::group([
        'prefix'        => 'position',
        'middleware'    => ['role:' . RoleEnum::SUPER_ADMIN->value . '|' . RoleEnum::HR->value]
    ], function () {
        Route::get('/', [PositionsController::class, 'index'])->name('position');
        Route::get('edit/{id}', [PositionsController::class, 'show'])->name('position.show');
        Route::get('create', [PositionsController::class, 'create'])->name('position.create');
        Route::post('create', [PositionsController::class, 'store'])->name('position.store');
        Route::patch('edit/{id}', [PositionsController::class, 'update'])->name('position.update');
        Route::delete('delete/{id}', [PositionsController::class, 'destroy'])->name('position.destroy');
    });

    Route::resource('request_approval', RequestApprovalController::class)->middleware([
        'role:' . RoleEnum::MIDDLE_MANAGEMENT->value . '|' . RoleEnum::UPPER_MANAGEMENT->value .
            '|' . RoleEnum::MANAGERIAL->value . '|' . RoleEnum::EXECUTIVE->value
    ]);

    Route::resource('employee-leave', UserLeavesController::class);
    Route::resource('request', LeaveHistoryController::class)->parameter('request', 'leave_history');
    Route::post('request/{leave_history}/cancel', [LeaveHistoryController::class, 'cancel'])->name('request.cancel');
    Route::post('request/{leave_history}/approve', [LeaveHistoryController::class, 'approve'])->name('request.approve');
    Route::post('request/{leave_history}/reject', [LeaveHistoryController::class, 'reject'])->name('request.reject');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/assign_role', [UserController::class, 'assignRole'])->name('assign.role');
});

require __DIR__ . '/auth.php';
