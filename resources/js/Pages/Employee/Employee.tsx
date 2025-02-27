import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './Columns';
import { DataTable } from './Data-Table';

interface EmployeeProps {
    data: User[];
    search: string;
    page: number;
    perPage: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export default function Employee({ users }: { users: User[] }) {
    // const [query, setQuery] = React.useState('');
    // const [page, setPage] = React.useState(1);
    // const [perPage, setPerPage] = React.useState(users.perPage || 10);

    // useEffect(() => {
    //     const debouncedFetch = debounce(() => {
    //         router.get(
    //             route('employee'),
    //             { search: query, perPage, page },
    //             { preserveState: true, replace: true },
    //         );
    //     }, 500);

    //     debouncedFetch();

    //     return debouncedFetch.cancel();
    // }, [query, page, perPage]);

    return (
        <MainLayout>
            <Head title="Employee" />

            <AppBar title="HRIS - Employee Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Employee Management
                        </div>
                        <DataTable
                            columns={columns}
                            data={users}
                            // links={users.links}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
