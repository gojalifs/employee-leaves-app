import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';
import { Position } from "@/types/position";

export default function EditPage({ position }: { position: Position }) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Position" />

            <AppBar title="HRIS - Edit Position Data" />

            <div className="py-4">
                <EditForm position={position} />
            </div>
        </MainLayout>
    );
}
