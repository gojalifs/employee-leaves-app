import { User } from '@/types';
import { Leave } from '@/types/leave';

export interface EmployeeLeave {
    id: Int;
    user_id: Int;
    leaves_id: Int;
    remaining_leaves: Int;
    user: User;
    leave_type: Leave;
}
