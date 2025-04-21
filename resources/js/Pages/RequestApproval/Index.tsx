import DataTable from '@/Components/Data-Table';
import { Button } from '@/components/ui/button';
import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Request } from '@/types/request';
import { Head, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import ConfirmDialog from './Dialog';

export default function RequestApprovalPage({
    requests,
}: {
    requests: Request[];
}) {
    const { flash } = usePage().props;
    flash.message && toast.info(flash.message);

    const [open, setOpen] = React.useState(false);
    const [rowData, setRowData] = React.useState<Request | null>(null);

    const columns: ColumnDef<Request>[] = [
        {
            accessorKey: 'user',
            header: 'Employee',
            cell: ({ row }) => row.original.user.name,
        },
        {
            accessorKey: 'leaveType',
            header: ({ column }) => {
                return (
                    <Button
                        variant={'ghost'}
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Leave Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => row.original.leave_type.name,
        },
        {
            accessorKey: 'start_date',
            header: 'Start Date',
        },
        {
            accessorKey: 'end_date',
            header: 'End Date',
        },
        {
            accessorKey: 'reason',
            header: 'Reason',
        },
        {
            accessorKey: 'note',
            header: 'Note',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const leaveRequest = row.original as Request;
                return (
                    <div>
                        <Button
                            variant="ghost"
                            onClick={
                                () => {
                                    setOpen(true);
                                    setRowData(leaveRequest);
                                }
                                // router.visit(route('request.show', dept.id))
                            }
                        >
                            <FilePenLine className="mr-2" />
                            Actions
                        </Button>
                        {/* <Button
                            variant="ghost"
                            onClick={() =>
                                router.visit(route('request.show', leaveRequest.id))
                            }
                        >
                            <Ban className="mr-2" />
                            Reject
                        </Button> */}
                    </div>
                );
            },
        },
    ];

    return (
        <MainLayout>
            <Head title="Leave Request Approval" />
            <AppBar title="HRIS - Leave Request Approval" />

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

                <ConfirmDialog
                    open={open}
                    onOpenChange={setOpen}
                    rowData={rowData}
                />
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
