import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Department } from '@/types/department';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';

export default function EditPage({ dept }: { dept: Department }) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Department" />

            <AppBar title="HRIS - Edit Department Data" />

            <div className="py-4">
                <EditForm dept={dept} />
            </div>
        </MainLayout>
    );
}
