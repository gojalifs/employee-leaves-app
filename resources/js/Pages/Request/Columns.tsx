import { Button } from '@/components/ui/button';
import { Request } from '@/types/request';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine } from 'lucide-react';

export const columns: ColumnDef<Request>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
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
        id: 'lastApproval',
        header: 'Last Approval',
        cell: ({ row }) => {
            const leaveRequest = row.original as Request;

            return (
                leaveRequest.leave_approvals &&
                leaveRequest.leave_approvals.length > 0 &&
                leaveRequest.leave_approvals[0].approver?.name
            );
        },
    },
    {
        id: 'nextApproval',
        header: 'Next Approval',
        cell: ({ row }) => {
            const leaveRequest = row.original as Request;

            return (
                leaveRequest.leave_approvals &&
                leaveRequest.leave_approvals.length > 0 &&
                leaveRequest.leave_approvals[0].approval_level.next_approval
                    ?.position?.name
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const dept = row.original as Request;
            return (
                <Button
                    variant="ghost"
                    onClick={() => router.visit(route('request.show', dept.id))}
                >
                    <FilePenLine className="mr-2" />
                    Edit
                </Button>
            );
        },
    },
];
