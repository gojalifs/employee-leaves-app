import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { User } from '@/types';
import { Leave } from '@/types/leave';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import AddForm from './Form';

export default function AddEmployeeLeavePage({
    users,
    leave_types,
}: {
    users: User[];
    leave_types: Leave[];
}) {
    const { errors } = usePage().props;

    errors.msg && toast.error(errors.msg);
    return (
        <MainLayout>
            <Head title="Employee Leave" />

            <AppBar title="HRIS - Add New Employee Leave" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Employee Leave Management
                        </div>
                        <AddForm users={users} leave_types={leave_types} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
