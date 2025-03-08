<?php

namespace App\Enums;

enum RoleEnum: string
{
    case STAFF = 'staff';
    case MIDDLE_MANAGEMENT = 'middle-management';
    case MANAGERIAL = 'managerial';
    case EXECUTIVE = 'executive';
    case HR = 'hr';
}
