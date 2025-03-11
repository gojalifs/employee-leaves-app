import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine } from 'lucide-react';

import { Approval } from '@/types/approval';
import { router } from '@inertiajs/react';

export const columns: ColumnDef<Approval>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'department',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Department
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.original.department?.name,
    },
    {
        accessorKey: 'requester_position',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Requester Position
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.original.requester_position?.name,
    },
    {
        accessorKey: 'level',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Approval Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'position',
        header: 'Approval Position',
        cell: ({ row }) => row.original.position?.name,
    },
    {
        accessorKey: 'next_approval',
        header: 'Next Approval ID',
        cell: ({ row }) => row.original.next_approval?.id ?? '[end]',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const approval = row.original as Approval;
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        router.visit(route('approval.show', approval.id))
                    }
                >
                    <FilePenLine className="mr-2" />
                    Edit
                </Button>
            );
        },
    },
];
