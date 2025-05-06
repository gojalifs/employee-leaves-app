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
import { Approval } from '@/types/approval';
import { Department } from '@/types/department';
import { Position } from '@/types/position';
import { Button, Input } from '@headlessui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    department: z.string().nonempty(),
    requester_position: z.string().nonempty(),
    approval_level: z.string().nonempty(),
    approval_position: z.string().nonempty(),
    next_approval: z.string(),
});

export default function AddForm({
    depts,
    positions,
    approvals,
}: {
    depts: Department[];
    positions: Position[];
    approvals: Approval[];
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: '',
            requester_position: '',
            approval_level: '',
            approval_position: '',
            next_approval: '',
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        router.post(route('approval.store'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                console.log('error ' + e.msg);
                toast.error('Failed to add new approval');
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Add New Approval</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                                <FormDescription>Department</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="requester_position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="requester_position">
                                    Requester Position
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Requester Position" />
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
                                <FormDescription>
                                    User/Requester Position
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="approval_level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="approval_level">
                                    Approval level
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Approval Level"
                                        className="w-full rounded-md border px-4 py-2"
                                        onInput={(e) => {
                                            const target =
                                                e.target as HTMLInputElement;
                                            target.value = target.value.replace(
                                                /\D/g,
                                                '',
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Approval Level, e.g 1, 2, 3, 4
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="approval_position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="approval_position">
                                    Approval Position
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Approval Position" />
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
                                <FormDescription>
                                    Current Approval Position
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="next_approval"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="next_approval">
                                    Next Approval ID
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Next Approval ID" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {approvals.map((approval) => (
                                                <SelectItem
                                                    key={approval.id}
                                                    value={approval.id.toString()}
                                                >
                                                    {approval.id} -{' '}
                                                    {approval.position?.name} at{' '}
                                                    {approval.department?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Next Approval ID
                                </FormDescription>
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
