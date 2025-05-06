import { User } from '.';
import { Leave } from './leave';

export interface UserLeave {
    id: number;
    user_id: number;
    user: User;
    leaves_id: number;
    leave_type: Leave;
    remaining_leaves: number;
}
