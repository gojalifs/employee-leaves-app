import DataTable from '@/Components/Data-Table';
import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Approval } from '@/types/approval';
import { Head, router } from '@inertiajs/react';
import { columns } from './Columns';

export default function ApprovalPage({ approvals }: { approvals: Approval[] }) {
    return (
        <MainLayout>
            <Head title="Approvals" />

            <AppBar title="HRIS - Approval Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Approval Management
                        </div>
                        <DataTable
                            columns={columns}
                            data={approvals}
                            filterColumnName="department"
                            addDataButton={<AddUserButton />}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function AddUserButton() {
    return (
        <button
            onClick={() => router.visit(route('approval.add'))}
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
            Add New Approval
        </button>
    );
}
