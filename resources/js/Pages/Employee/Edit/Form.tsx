import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { User } from '@/types';
import { Department } from '@/types/department';
import { Position } from '@/types/position';
import { Role } from '@/types/roles';
import { Button, Input } from '@headlessui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    full_name: z.string().nonempty(),
    email: z.string().nonempty().email(),
    department: z.string().nonempty(),
    position: z.string().nonempty(),
    address: z.string().nonempty(),
    // role: z.string().nonempty(),
});

export default function EditForm({
    depts,
    positions,
    roles,
    user,
}: {
    depts: Department[];
    positions: Position[];
    roles: Role[];
    user: User;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: user.name ?? '',
            email: user.email ?? '',
            department: user.department.id.toString() ?? '',
            position: user.position.id.toString() ?? '',
            address: user.address ?? '',
            // role: '',
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('employee.update', user.id), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                toast.error(e.msg);
            },
            onSuccess: (props) => {
                console.log(props);

                // if (props.props.flash.success) {
                //     toast.success(props.props.flash.success);
                // }
                // toast.info(props.props.success);
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Add New Employee</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="full_name">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Full Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>Full Name</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Email"
                                        className="w-full rounded-md border px-4 py-2"
                                    />
                                </FormControl>
                                <FormDescription>User Email</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="department">
                                    Department
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {depts.map((dept) => (
                                                <SelectItem
                                                    key={dept.id}
                                                    value={dept.id.toString()}
                                                >
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    User Department
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="position">
                                    Position
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {positions.map((position) => (
                                                <SelectItem
                                                    key={position.id}
                                                    value={position.id.toString()}
                                                >
                                                    {position.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>User Position</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Address"
                                        className="w-full rounded-md border px-4 py-2"
                                    />
                                </FormControl>
                                <FormDescription>User Address</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* 
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="role">Role</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem
                                                    key={role.id}
                                                    value={role.id.toString()}
                                                >
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>User Position</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        Update Employee
                    </Button>
                </form>
            </Form>
        </div>
    );
}
