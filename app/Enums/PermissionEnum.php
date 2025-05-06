<?php

namespace App\Enums;

enum PermissionEnum: String
{
    case VIEW_OWN_LEAVE_REQUESTS = 'view own leave requests';
    case CREATE_LEAVE_REQUEST = 'create leave request';
    case CANCEL_OWN_LEAVE_REQUEST = 'cancel own leave request';
    case VIEW_TEAM_LEAVE_REQUESTS = 'view team leave requests';
    case APPROVE_LEAVE_REQUESTS = 'approve leave requests';
    case OVERRIDE_LEAVE_APPROVALS = 'override leave approvals';
    case MANAGE_LEAVE_POLICIES = 'manage leave policies';
    case VIEW_LEAVE_REPORTS = 'view leave reports';
    case ADD_NEW_USERS = 'add new users';
    case ALL = 'all';
}
