import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function DepartmentPage() {
    return (
        <MainLayout>
            <Head title="Departments" />

            <AppBar title="HRIS - Department Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Department Management
                        </div>
                        {/* <DataTable
                            columns={columns}
                            data={users}
                            // links={users.links}
                        /> */}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
