import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { User } from '@/types';
import { Department } from '@/types/department';
import { Position } from '@/types/position';
import { Role } from '@/types/roles';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';

export default function EditPage({
    depts,
    positions,
    roles,
    user,
}: {
    depts: Department[];
    positions: Position[];
    roles: Role[];
    user: User;
}) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Employee" />

            <AppBar title="HRIS - Edit Employee Data" />

            <div>
                <EditForm
                    depts={depts}
                    positions={positions}
                    roles={roles}
                    user={user}
                />
            </div>
        </MainLayout>
    );
}
