import { User } from '.';
import { Approval } from './approval';

export interface LeaveApproval {
    id: number;
    leave_history_id: number;
    approval_levels_id: number;
    approval_level: Approval;
    approver_id: number;
    approver: User;
    status: string;
    comment: string | undefined;
}
