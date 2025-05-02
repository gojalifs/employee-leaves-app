import { User } from '.';
import { Leave } from './leave';
import { LeaveApproval } from './leave_approval';

export interface Request {
    id: number;
    user_id: number;
    leaves_id: number;
    leave_type: Leave;
    start_date: string;
    end_date: string;
    status: string;
    reason: string;
    note: string;
    created_at: string;
    leave_approvals: LeaveApproval[] | undefined;
    user: User;
}
