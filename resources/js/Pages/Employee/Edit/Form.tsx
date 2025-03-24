import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Input } from '@headlessui/react';

import { Leave } from '@/types/leave';
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
    role: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.',
    }),
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
            role: user.roles ? user.roles.map((role) => role?.name) : [],
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('employee.update', user.id), data, {
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

                    <FormField
                        control={form.control}
                        name="role"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Roles
                                    </FormLabel>
                                    <FormDescription>
                                        Select the roles for this user
                                    </FormDescription>
                                </div>
                                {roles.map((item) => (
                                    <FormField
                                        key={item.name}
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.name}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                item.name,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              item.name,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  item.name,
                                                                          ),
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {item.name}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        variant={'default'}
                        type="submit"
                        className="w-full"
                    >
                        Update Employee
                    </Button>
                </form>
            </Form>

            <Button
                variant={'destructive'}
                onClick={() => {
                    if (
                        confirm(
                            'Are you sure you want to delete this employee?',
                        )
                    ) {
                        router.delete(
                            route('employee.destroy', { id: user.id }),
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
