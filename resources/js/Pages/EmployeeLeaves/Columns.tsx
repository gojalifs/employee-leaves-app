import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine } from 'lucide-react';

import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { router } from '@inertiajs/react';

export const columns: ColumnDef<EmployeeLeave>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'user',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.original.user.name,
    },
    {
        accessorKey: 'leave_type',
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
        accessorKey: 'remaining_leaves',
        header: 'Remaining Leaves',
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
        cell: ({ row }) => {
            const leave = row.original as EmployeeLeave;
            return leave.leave_type.unit;
        },
    },
    {
        accessorKey: 'period',
        header: 'Period', // One time/annual
        cell: ({ row }) => {
            const leave = row.original as EmployeeLeave;
            return leave.leave_type.period;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const leave = row.original as EmployeeLeave;
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        router.visit(route('employee-leave.show', leave.id))
                    }
                >
                    <FilePenLine className="mr-2" />
                    Edit
                </Button>
            );
        },
    },
];
