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

const formSchema = z.object({ name: z.string().nonempty() });

export default function AddForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '' },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.post(route('dept.store'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                console.log('error ' + e.msg);
                toast.error('Failed to add new department');
            },
        });
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Add New Department</h1>
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
                                <FormLabel htmlFor="name">
                                    Department Name
                                </FormLabel>
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

                    <Button type="submit" className="w-full">
                        Add Department
                    </Button>
                </form>
            </Form>
        </div>
    );
}
