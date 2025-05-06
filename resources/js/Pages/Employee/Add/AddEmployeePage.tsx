import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Department } from '@/types/department';
import { Position } from '@/types/position';
import { Role } from '@/types/roles';
import { Head, usePage } from '@inertiajs/react';
import AddForm from './Form';

export default function AddEmployeePage({
    depts,
    positions,
    roles,
}: {
    depts: Department[];
    positions: Position[];
    roles: Role[];
}) {
    const { errors } = usePage().props;

    return (
        <MainLayout>
            <Head title="Employee" />

            <AppBar title="HRIS - Add New Employee" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Employee Management
                        </div>
                        <AddForm
                            depts={depts}
                            positions={positions}
                            roles={roles}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
