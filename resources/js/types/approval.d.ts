import { Department } from './department';
import { Position } from './position';

export interface Approval {
    id: number;
    departments_id: number | null;
    department: Department | null;
    requester_position_id: number | null;
    requester_position: Position | null;
    level: number | null;
    positions_id: number | null;
    position: Position | null;
    next_level_id: number | null;
    next_approval: Approval | null;
}
