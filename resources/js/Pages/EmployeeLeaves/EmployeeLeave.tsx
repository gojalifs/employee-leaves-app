import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import DataTable from '../../Components/Data-Table';
import { columns } from './Columns';

export default function EmployeeLeavePage({
    leaves,
}: {
    leaves: EmployeeLeave[];
    can: { can_add: string };
}) {
    const { flash, errors } = usePage().props;

    flash.message && toast.info(flash.message);

    errors.msg && toast.error(errors.msg);

    return (
        <MainLayout>
            <Head title="Employee Leave" />

            <AppBar title="HRIS - Employee Leave Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Employee Leave Management
                        </div>
                        <DataTable
                            columns={columns}
                            data={leaves}
                            filterColumnName="user"
                            addDataButton={<AddEmployeeLeaveButton />}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function AddEmployeeLeaveButton() {
    return (
        <button
            onClick={() => router.visit(route('employee-leave.create'))}
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
            Add New Employee Leave
        </button>
    );
}
