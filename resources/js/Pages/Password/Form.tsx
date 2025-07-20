import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
});

export default function ChangePasswordForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            password_confirmation: '',
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        router.post(route('save.password'), data, {
            preserveScroll: true,
            preserveState: true,
            onError: (e) => {
                toast.error(`Failed to change password. Reason: ${e[0]}`);
            },
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Toaster />
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <Form {...form}>
                    <h2 className="mb-2 text-center">
                        <span className="text-center text-2xl font-bold text-gray-800">
                            Set New Password
                        </span>
                    </h2>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter new password"
                                            className="w-full rounded-md border px-3 py-2"
                                            type="password"
                                            autoFocus
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password_confirmation">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Confirm password"
                                            className="w-full rounded-md border px-3 py-2"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Change Password
                        </button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
