import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Leave } from '@/types/leave';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';

export default function EditPage({ leave }: { leave: Leave }) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Leave Type" />

            <AppBar title="HRIS - Edit Leave Type Data" />

            <div className="py-4">
                <EditForm leave={leave} />
            </div>
        </MainLayout>
    );
}
