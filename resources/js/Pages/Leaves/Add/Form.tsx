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
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    leave_name: z.string().nonempty(),
    max_quantity: z.string().nonempty(),
});

export default function AddForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { leave_name: '', max_quantity: '' },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.post(route('leave.store'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                console.log('error ' + e.msg);
                toast.error('Failed to add new leave type');
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Add New Leave Type</h1>
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
                                <FormLabel htmlFor="leave_name">
                                    Leave Type Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Full Leave Type Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>
                                    Full Leave Type Name
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

                    <Button type="submit" className="w-full">
                        Add Leave Type
                    </Button>
                </form>
            </Form>
        </div>
    );
}
