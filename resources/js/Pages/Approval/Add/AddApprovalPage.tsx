import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Approval } from '@/types/approval';
import { Department } from '@/types/department';
import { Position } from '@/types/position';
import { Head, usePage } from '@inertiajs/react';
import AddForm from './Form';

export default function AddApprovalPage({
    depts,
    positions,
    approvals,
}: {
    depts: Department[];
    positions: Position[];
    approvals: Approval[];
}) {
    const { errors } = usePage().props;

    return (
        <MainLayout>
            <Head title="Employee" />

            <AppBar title="HRIS - Add New Approval" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Approvals Management
                        </div>
                        <AddForm
                            depts={depts}
                            positions={positions}
                            approvals={approvals}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
