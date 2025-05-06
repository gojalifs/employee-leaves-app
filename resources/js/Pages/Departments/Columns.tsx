import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine } from 'lucide-react';

import { Department } from '@/types/department';
import { router } from '@inertiajs/react';

export const columns: ColumnDef<Department>[] = [
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
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const dept = row.original as Department;
            return (
                <Button
                    variant="ghost"
                    onClick={() => router.visit(route('dept.show', dept.id))}
                >
                    <FilePenLine className="mr-2" />
                    Edit
                </Button>
            );
        },
    },
];
