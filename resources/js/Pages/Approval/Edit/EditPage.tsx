import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { Approval } from '@/types/approval';
import { Department } from '@/types/department';
import { Position } from '@/types/position';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';

export default function EditPage({
    approval,
    depts,
    positions,
    approvals,
}: {
    approval: Approval;
    depts: Department[];
    positions: Position[];
    approvals: Approval[];
}) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Approval" />

            <AppBar title="HRIS - Edit Approval Data" />

            <div className="py-4">
                <EditForm
                    approval={approval}
                    depts={depts}
                    positions={positions}
                    approvals={approvals}
                />
            </div>
        </MainLayout>
    );
}
