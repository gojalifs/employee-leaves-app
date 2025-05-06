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
import { Leave } from '@/types/leave';
import { Input } from '@headlessui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    leave_name: z.string().nonempty(),
    max_quantity: z.string().nonempty(),
});

export default function EditForm({ leave }: { leave: Leave }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leave_name: leave.name ?? '',
            max_quantity: leave.max_quantity?.toString(),
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('leave.update', leave.id), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                toast.error(e.msg);
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Update Leave Type Data</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="leave_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="leave_name">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Leave Type Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>
                                    Leave Type Name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="max_quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="max_quantity">
                                    Quota in a year
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g 12"
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
                                    Quota in a year
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
                        Update Leave Type
                    </Button>
                </form>
            </Form>

            <Button
                variant={'destructive'}
                onClick={() => {
                    if (
                        confirm(
                            'Are you sure you want to delete this Leave Type?',
                        )
                    ) {
                        router.delete(
                            route('leave.destroy', { id: leave.id }),
                            {
                                onSuccess: () => {
                                    toast.success(
                                        'Leave type deleted successfully',
                                    );
                                },
                                onError: (error) => {
                                    toast.error('Failed to delete leave type');
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
