import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { User } from '@/types';
import { Head, router } from '@inertiajs/react';
import DataTable from '../../Components/Data-Table';
import { columns } from './Columns';

interface EmployeeProps {
    data: User[];
    search: string;
    page: number;
    perPage: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export default function Employee({ users }: { users: User[] }) {
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
                            filterColumnName="email"
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
            onClick={() => router.visit(route('employee.add'))}
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
            Add New User
        </button>
    );
}
