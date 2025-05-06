import { Card, CardContent } from '@/components/ui/card';
import AppBar from '@/Layouts/AppBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Request } from '@/types/request';
import { UserLeave } from '@/types/user_leave';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({
    user_leave,
    active_leaves,
}: {
    user_leave: UserLeave[];
    active_leaves: Request[];
}) {
    const user = usePage().props.auth.user;

    return (
        <MainLayout>
            <Head title="Dashboard" />
            <AppBar title="HRIS - Leave Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-center text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold">
                                Welcome back, {user.name}!
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Here's a quick overview of your leave balance
                                and active requests.
                            </p>
                            <p className="mt-4 text-lg font-medium text-indigo-600 dark:text-indigo-400">
                                Let's make today productive!
                            </p>
                        </div>
                    </div>
                    <hr className="py-4" />
                    <h2 className="pb-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Remaining Leaves
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {user_leave.map((leave, index) => {
                            const colors = [
                                'from-blue-50 via-blue-100 to-blue-50',
                                'from-green-50 via-green-100 to-green-50',
                                'from-yellow-50 via-yellow-100 to-yellow-50',
                                'from-red-50 via-red-100 to-red-50',
                                'from-purple-50 via-purple-100 to-purple-50',
                            ];
                            const gradient = colors[index % colors.length];

                            return (
                                <Card
                                    key={leave.id}
                                    className={`bg-gradient-to-r ${gradient} p-4 transition-shadow duration-300 hover:shadow-lg`}
                                >
                                    <CardContent className="relative">
                                        <h2 className="text-4xl font-bold text-blue-600">
                                            {leave.remaining_leaves}
                                        </h2>
                                        <p className="absolute bottom-2 right-2 text-sm text-gray-500">
                                            {leave.leave_type.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <hr className="mt-8" />
                    <h2 className="my-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Active Leave Requests
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {active_leaves.map((leave) => (
                            <Card
                                key={leave.id}
                                className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 shadow-md transition-shadow duration-300 hover:shadow-lg dark:from-gray-700 dark:via-gray-800 dark:to-gray-700"
                            >
                                <CardContent>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        {leave.leave_type.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Start Date: {leave.start_date}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        End Date: {leave.end_date}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Status: {leave.status}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
