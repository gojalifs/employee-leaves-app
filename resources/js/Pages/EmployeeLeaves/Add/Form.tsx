import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Leave } from '@/types/leave';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

const formSchema = z.object({
    employee_id: z.string(),
    leave_type: z
        .array(z.number())
        .refine((value) => value.some((item) => item), {
            message: 'You have to select at least one item.',
        }),
});

export default function AddForm({
    users,
    leave_types,
}: {
    users: User[];
    leave_types: Leave[];
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employee_id: '',
            leave_type: [],
        },
    });

    function onClick() {
        console.log(form.getValues());
    }

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        router.post(route('employee-leave.store'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                console.log('error ' + e.msg);
                toast.error('Failed to add new employee leave');
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Add New Employee Leave</h1>
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
                                            {users.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                >
                                                    {user.name}
                                                </SelectItem>
                                            ))}
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
                        control={form.control}
                        name="leave_type"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Leave Types
                                    </FormLabel>
                                    <FormDescription>
                                        Select leave type(s) for this employee
                                    </FormDescription>
                                </div>
                                {leave_types.map((type) => (
                                    <FormField
                                        key={type.id}
                                        control={form.control}
                                        name="leave_type"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={type.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                type?.id ?? -1,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              type?.id,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  type.id,
                                                                          ),
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {type.name}
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
                        onClick={onClick}
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );
}
