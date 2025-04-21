import DataTable from '@/Components/Data-Table';
import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Request } from '@/types/request';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { columns } from './Columns';

export default function RequestPage({ requests }: { requests: Request[] }) {
    const { flash } = usePage().props;
    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Leaves Request" />
            <AppBar title="HRIS - Leave Request Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Leave Request History
                            </h2>
                        </div>
                        <DataTable
                            columns={columns}
                            data={requests}
                            filterColumnName="leaveType"
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
            onClick={() => router.visit(route('request.create'))}
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
            Add New Leave Request
        </button>
    );
}
