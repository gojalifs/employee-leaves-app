import AppBar from '@/Layouts/AppBar';
import MainLayout from '@/Layouts/MainLayout';
import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import EditForm from './Form';

export default function EditLeaveRequestPage({
    user_leave,
}: {
    user_leave: EmployeeLeave;
}) {
    const { flash } = usePage().props;

    flash.message && toast.info(flash.message);

    return (
        <MainLayout>
            <Head title="Leave Request" />

            <AppBar title="HRIS - Edit Leave Request Data" />

            <div className="py-4">
                <EditForm leave={user_leave} />
            </div>
        </MainLayout>
    );
}
