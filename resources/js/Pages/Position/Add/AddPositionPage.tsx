import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import AddForm from './Form';

export default function AddPositionPage() {
    return (
        <MainLayout>
            <Head title="Position" />

            <AppBar title="HRIS - Add New Position" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Position Management
                        </div>
                        <AddForm />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
