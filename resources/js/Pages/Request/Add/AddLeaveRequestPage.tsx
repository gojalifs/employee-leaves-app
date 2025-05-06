import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { Head } from '@inertiajs/react';
import AddForm from './Form';

export default function AddLeaveRequestPage({
    leave_types,
}: {
    leave_types: EmployeeLeave[];
}) {
    return (
        <MainLayout>
            <Head title="Leave Request" />

            <AppBar title="HRIS - Add New Leave Request" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Create New Leave Request
                        </div>
                        <AddForm leaves={leave_types} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
