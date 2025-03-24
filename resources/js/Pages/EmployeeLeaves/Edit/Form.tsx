import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@headlessui/react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    employee_id: z.string(),
    remaining_leave: z.string(),
    leave_type: z.string().nullable(),
});

export default function EditForm({
    employeeLeave,
}: {
    employeeLeave: EmployeeLeave;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employee_id: employeeLeave.user.id.toString(),
            remaining_leave: employeeLeave.remaining_leaves.toString(),
            leave_type: employeeLeave.leave_type.name,
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('employee-leave.update', employeeLeave.id), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                toast.error(e.msg);
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Update Employee Data</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="employee_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="employee_id">
                                    Employee
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select User" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[employeeLeave.user].map(
                                                (user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={user.id.toString()}
                                                    >
                                                        {user.name}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Select employee
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="leave_type"
                        disabled={true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="leave_type">
                                    Leave Type
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Full Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>Leave type</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="remaining_leave"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="remaining_leave">
                                    Remaining Leave
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Remaining Leave"
                                        className="w-full rounded-md border px-4 py-2"
                                    />
                                </FormControl>
                                <FormDescription>
                                    User Remaining Leave
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        variant={'default'}
                        type="submit"
                        className="w-full"
                    >
                        Update Employee Leave Detail
                    </Button>
                </form>
            </Form>

            <Button
                variant={'destructive'}
                onClick={() => {
                    if (
                        confirm(
                            'Are you sure you want to delete this employee leave?',
                        )
                    ) {
                        router.delete(
                            route('employee-leave.destroy', {
                                id: employeeLeave.id,
                            }),
                            {
                                onSuccess: () => {
                                    toast.success(
                                        'Employee deleted successfully',
                                    );
                                },
                                onError: (error) => {
                                    toast.error('Failed to delete employee');
                                    console.error(error);
                                },
                            },
                        );
                    }
                }}
                className="my-2 w-full"
            >
                Delete
            </Button>
        </div>
    );
}
