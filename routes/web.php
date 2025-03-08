<?php

use App\Enums\PermissionEnum;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('set_password', [UserController::class, 'set_password'])->name('set.password');
    Route::post('set_password', [UserController::class, 'store_password'])->name('save.password');

    Route::get('employee', [UserController::class, 'index'])->name('employee');
    Route::get('employee_add', [UserController::class, 'create'])->name('employee.add');
    Route::post('employee_add', [UserController::class, 'store'])->name('employee.store');
    Route::get('employee_edit/{id}', [UserController::class, 'show'])->name('employee.show');
    Route::patch('employee_edit/{id}', [UserController::class, 'update'])->name('employee.update');
    Route::delete('employee_delete/{id}', [UserController::class, 'destroy'])->name('employee.destroy');

    Route::prefix('dept')->group(function () {
        Route::get('/', [DepartmentsController::class, 'index'])->name('dept');

        Route::group(['middleware' => ['permission:' . PermissionEnum::ADD_NEW_USERS->value]], function () {
            Route::get('add', [DepartmentsController::class, 'deptCreate'])->name('dept.add');

            Route::post('add', [DepartmentsController::class, 'deptStore'])->name('dept.store');
        });

        Route::get('edit/{id}', [DepartmentsController::class, 'deptEdit'])->name('dept.edit');
        Route::patch('edit/{id}', [DepartmentsController::class, 'deptUpdate'])->name('dept.update');
        Route::delete('delete/{id}', [DepartmentsController::class, 'deptDestroy'])->name('dept.destroy');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/assign_role', [UserController::class, 'assignRole'])->name('assign.role');
});

require __DIR__ . '/auth.php';
