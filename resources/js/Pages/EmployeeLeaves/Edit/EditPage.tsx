import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';

export default function EditPage({
    employeeLeave,
}: {
    employeeLeave: EmployeeLeave;
}) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Employee" />

            <AppBar title="HRIS - Edit Employee Leave Data" />

            <div className="py-4">
                <EditForm employeeLeave={employeeLeave} />
            </div>
        </MainLayout>
    );
}
