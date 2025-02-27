import { Department } from "./department";
import { Position } from "./position";

export interface User {
    id: number;
    name: string;
    department: Department;
    position: Position;
    address: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
