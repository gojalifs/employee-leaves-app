<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super_admin';
    case STAFF = 'staff'; // Staff, Operator
    case MIDDLE_MANAGEMENT = 'middle-management'; // Leader, Foreman
    case UPPER_MANAGEMENT = 'upper-management'; // Supervisor, Assman
    case MANAGERIAL = 'managerial'; // Manager, Senior Manager, General Manager
    case EXECUTIVE = 'executive'; // Director, President Director
    case HR = 'hr';
}
