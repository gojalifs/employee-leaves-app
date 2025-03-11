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
import { Input } from '@headlessui/react';

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

export default function EditForm({
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: approval.department?.id.toString() ?? '',
            requester_position:
                approval.requester_position?.id.toString() ?? '',
            approval_level: approval.level?.toString() ?? '',
            approval_position: approval.position?.id.toString() ?? '',
            next_approval: approval.next_approval?.id.toString() ?? '',
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('approval.update', approval.id), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                toast.error(e.msg);
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Update Approval Data</h1>
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
                                    Approval
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Approval" />
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
                                <FormDescription>Approval</FormDescription>
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
                        variant={'default'}
                        type="submit"
                        className="w-full"
                    >
                        Update Approval
                    </Button>
                </form>
            </Form>

            <Button
                variant={'destructive'}
                onClick={() => {
                    if (
                        confirm(
                            'Are you sure you want to delete this Approval?',
                        )
                    ) {
                        router.delete(
                            route('approval.destroy', { id: approval.id }),
                            {
                                onSuccess: () => {
                                    toast.success(
                                        'Approval deleted successfully',
                                    );
                                },
                                onError: (error) => {
                                    toast.error('Failed to delete Approval');
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
