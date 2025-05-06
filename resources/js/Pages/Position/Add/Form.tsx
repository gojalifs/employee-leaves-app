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

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({ position_name: z.string().nonempty() });

export default function AddForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { position_name: '' },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.post(route('position.store'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                console.log('error ' + e.msg);
                toast.error('Failed to add new position');
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Add New Position</h1>
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
                                    Position Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Full Position Name"
                                        className="w-full rounded-md border px-4 py-2"
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>
                                    Full Position Name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Add Position
                    </Button>
                </form>
            </Form>
        </div>
    );
}
