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

import { Position } from '@/types/position';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({ position_name: z.string().nonempty() });

export default function EditForm({ position }: { position: Position }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { position_name: position.name ?? '' },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.patch(route('position.update', position.id), data, {
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
                        name="position_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="position_name">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Position Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>Position Name</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        variant={'default'}
                        type="submit"
                        className="w-full"
                    >
                        Update Position
                    </Button>
                </form>
            </Form>

            <Button
                variant={'destructive'}
                onClick={() => {
                    if (
                        confirm(
                            'Are you sure you want to delete this Position?',
                        )
                    ) {
                        router.delete(
                            route('position.destroy', { id: position.id }),
                            {
                                onSuccess: () => {
                                    toast.success(
                                        'Position type deleted successfully',
                                    );
                                },
                                onError: (error) => {
                                    toast.error(
                                        'Failed to delete position type',
                                    );
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
