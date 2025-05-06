import Checkbox from '@/Components/Checkbox';
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
    role: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.',
    }),
});

export default function AddForm({
    depts,
    positions,
    roles,
}: {
    depts: Department[];
    positions: Position[];
    roles: Role[];
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: '',
            email: '',
            department: '',
            position: '',
            address: '',
            role: [],
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        router.post(route('employee.store'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                console.log('error ' + e.msg);
                toast.error('Failed to add new employee');
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
                                        Select role(s) for this user
                                    </FormDescription>
                                </div>
                                {roles.map((role) => (
                                    <FormField
                                        key={role.id}
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={role.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                role.name,
                                                            )}
                                                            onChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              role.name,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  role.name,
                                                                          ),
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {role.name}
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
                        type="submit"
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        Add Employee
                    </Button>
                </form>
            </Form>
        </div>
    );
}
