import DataTable from '@/Components/Data-Table';
import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Leave } from '@/types/leave';
import { Head, router } from '@inertiajs/react';
import { columns } from './Columns';

export default function DepartmentPage({ leaves }: { leaves: Leave[] }) {
    return (
        <MainLayout>
            <Head title="Leaves" />

            <AppBar title="HRIS - Leave Type Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Leave Type Management
                        </div>
                        <DataTable
                            columns={columns}
                            data={leaves}
                            filterColumnName="name"
                            addDataButton={AddLeaveButton()}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function AddLeaveButton() {
    return (
        <button
            onClick={() => router.visit(route('leave.add'))}
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
            Add New Leave Type
        </button>
    );
}
