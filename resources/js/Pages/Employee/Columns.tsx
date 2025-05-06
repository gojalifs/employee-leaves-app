import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine } from 'lucide-react';

import { router } from '@inertiajs/react';

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
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
        cell: ({ row }) => row.original.department.name,
    },
    {
        accessorKey: 'position',
        header: 'Position',
        cell: ({ row }) => row.original.position.name,
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const user = row.original as User;
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        router.visit(route('employee.show', user.id))
                    }
                >
                    <FilePenLine className="mr-2" />
                    Edit
                </Button>
            );
        },
    },
];
