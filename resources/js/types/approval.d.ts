import { Department } from './department';
import { Position } from './position';

export interface Approval {
    id: number;
    departments_id: number?;
    department: Department?;
    requester_position_id: number?;
    requester_position: Position?;
    level: number?;
    positions_id: number?;
    position: Position?;
    next_level_id: number?;
    next_approval: Approval?;
}
