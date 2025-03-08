<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super_admin';
    case STAFF = 'staff';
    case MIDDLE_MANAGEMENT = 'middle-management';
    case MANAGERIAL = 'managerial';
    case EXECUTIVE = 'executive';
    case HR = 'hr';
}
