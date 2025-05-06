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
import { Department } from '@/types/department';
import { Input } from '@headlessui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({ name: z.string().nonempty() });

export default function EditForm({ dept }: { dept: Department }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: dept.name ?? '' },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('dept.update', dept.id), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                toast.error(e.msg);
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Update Department Data</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Full Department Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>
                                    Full Department Name
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
                        Update Department
                    </Button>
                </form>
            </Form>

            <Button
                variant={'destructive'}
                onClick={() => {
                    if (
                        confirm(
                            'Are you sure you want to delete this Department?',
                        )
                    ) {
                        router.delete(route('dept.destroy', { id: dept.id }), {
                            onSuccess: () => {
                                toast.success(
                                    'Department deleted successfully',
                                );
                            },
                            onError: (error) => {
                                toast.error('Failed to delete Department');
                                console.error(error);
                            },
                        });
                    }
                }}
                className="my-2 w-full"
            >
                Delete
            </Button>
        </div>
    );
}
