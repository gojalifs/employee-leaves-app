<?php

namespace App\Http\Middleware;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $leavePermit = [
            [
                'title' => 'Home',
                'url' => '/dashboard',
            ],
            [
                'title' => 'Leave Request',
                'url' => '/request',
            ]
        ];

        $hrManagement = [];
        $workflowManagement = [];

        if ($user && $user->hasRole([RoleEnum::MIDDLE_MANAGEMENT, RoleEnum::UPPER_MANAGEMENT, RoleEnum::MANAGERIAL, RoleEnum::EXECUTIVE])) {
            $leavePermit = array_merge($leavePermit, [
                [
                    'title' => 'Leave Request Approval',
                    'url' => '/request_approval',
                ],
            ]);
        }

        if ($user && $user->hasRole([RoleEnum::HR, RoleEnum::SUPER_ADMIN])) {
            $hrManagement = array_merge($hrManagement, [
                [
                    'title' => 'Employee',
                    'url' => '/employee',
                ],
                [
                    'title' => 'Department',
                    'url' => '/dept',
                ],
                [
                    'title' => 'Position',
                    'url' => '/position',
                ],
                [
                    'title' => 'Employee Leave',
                    'url' => '/employee-leave',
                ]
            ]);

            $workflowManagement = array_merge($workflowManagement, [
                [
                    'title' => 'Leave',
                    'url' => '/leave',
                ],
                [
                    'title' => 'Approval',
                    'url' => '/approval',
                ],
            ]);
        }

        return [
            ...parent::share($request),
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'error'   => fn() => $request->session()->get('error'),
            ],
            'auth'  => [
                'user'  => $request->user(),
            ],
            'can'   =>  $request->user() ? [
                'add_user'  =>  $request->user()->can(PermissionEnum::ADD_NEW_USERS),
            ] : null,
            'sidebar' => [
                'leave_permit'          => $leavePermit,
                'hr_management'         => $hrManagement,
                'workflow_management'   => $workflowManagement,
            ],
        ];
    }
}
