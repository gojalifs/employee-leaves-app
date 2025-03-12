import DataTable from '@/Components/Data-Table';
import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Position } from '@/types/position';
import { Head, router } from '@inertiajs/react';
import { columns } from './Columns';

export default function PositionPage({ positions }: { positions: Position[] }) {
    return (
        <MainLayout>
            <Head title="Positions" />

            <AppBar title="HRIS - Positions Management" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Positions Management
                        </div>
                        <DataTable
                            columns={columns}
                            data={positions}
                            filterColumnName="name"
                            addDataButton={AddPositionButton()}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function AddPositionButton() {
    return (
        <button
            onClick={() => router.visit(route('position.add'))}
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
            Add New Position
        </button>
    );
}
