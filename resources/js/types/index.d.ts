import { Department } from './department';
import { Position } from './position';

export interface User {
    id: number;
    name: string;
    department: Department;
    position: Position;
    address: string;
    email: string;
    roles: Role[]?;
    email_verified_at?: string;
}

export interface Permission {
    add_user: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    can: Permission;
    sidebar: {
        leave_permit: SidebarMenu[];
        hr_management: SidebarMenu[];
        workflow_management: SidebarMenu[];
    };
    flash: {
        message: string?;
        error: string?;
    };
};

interface SidebarMenu {
    title: string;
    url: string;
}
