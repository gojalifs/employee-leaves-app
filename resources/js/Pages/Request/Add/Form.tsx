import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { EmployeeLeave } from '@/Pages/EmployeeLeaves/employeeLeave';
import { Leave } from '@/types/leave';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar1Icon, Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    leave_type_id: z.string().nonempty(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    reason: z.string().nonempty(),
    note: z.string().optional(),
});

export default function AddForm({ leaves }: { leaves: EmployeeLeave[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leave_type_id: '',
            start_date: undefined,
            end_date: undefined,
            reason: '',
            note: '',
        },
    });

    const [leaveType, setLeaveType] = React.useState<Leave | undefined>(
        undefined,
    );

    const [userLeave, setUserLeave] = React.useState<EmployeeLeave | undefined>(
        undefined,
    );

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true); // 👉 mulai submitting
        try {
            await router.post(route('request.store'), data, {
                onError: (e) => {
                    toast.error('Failed to create leave request');
                    console.error(e);
                },
                onFinish: () => {
                    setIsSubmitting(false); // 👉 selesai
                },
            });
        } catch (err) {
            console.error(err);
            toast.error('Unexpected error');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">
                Add New {leaveType ? leaveType.name : 'Leave'} Request
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="leave_type_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="leave_type_id">
                                    Leave Type
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);

                                            const selectedLeave = leaves.find(
                                                (leave) =>
                                                    leave.leave_type.id.toString() ===
                                                    value,
                                            );
                                            setLeaveType(
                                                selectedLeave?.leave_type,
                                            );

                                            setUserLeave(selectedLeave);

                                            console.log(
                                                selectedLeave?.remaining_leaves ??
                                                    'd',
                                            );
                                        }}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-gray-500 px-4 py-2">
                                            <SelectValue placeholder="Select Leave Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {leaves.map((leave) => (
                                                <SelectItem
                                                    key={leave.id}
                                                    value={leave.leave_type.id.toString()}
                                                >
                                                    {leave.leave_type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>Leave Type</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="start_date">
                                    Pick Start Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={'outline'}
                                            className={cn(
                                                'w-full rounded-md border border-gray-500 px-4 py-2',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            <Calendar1Icon />
                                            {field.value ? (
                                                format(
                                                    field.value, // 👈 ensure it's a Date
                                                    'LLL dd, y',
                                                )
                                            ) : (
                                                <span>Select a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value} // 👈 ensure it's a Date
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                form.setValue(
                                                    'end_date',
                                                    date &&
                                                        leaveType?.fix_duration ==
                                                            1
                                                        ? new Date(
                                                              date.getTime() +
                                                                  (leaveType?.max_quantity ??
                                                                      0) *
                                                                      24 *
                                                                      60 *
                                                                      60 *
                                                                      1000,
                                                          )
                                                        : undefined,
                                                );
                                            }}
                                            initialFocus
                                            // defaultMonth={range?.from}
                                            numberOfMonths={1}
                                            disabled={(date) =>
                                                date.getDay() === 0 ||
                                                date.getDay() === 6 ||
                                                date < new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Select start date for leave request
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* disable kalo fix = 1 */}

                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="end_date">
                                    Pick End Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={'outline'}
                                            disabled={
                                                leaveType?.fix_duration == 1
                                            }
                                            className={cn(
                                                'w-full rounded-md border border-gray-500 px-4 py-2',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            <Calendar1Icon />
                                            {field.value ? (
                                                format(
                                                    field.value, // 👈 ensure it's a Date
                                                    'LLL dd, y',
                                                )
                                            ) : (
                                                <span>Select a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value} // 👈 ensure it's a Date
                                            onSelect={field.onChange}
                                            initialFocus
                                            fromDate={form.getValues(
                                                'start_date',
                                            )}
                                            toDate={
                                                leaveType?.unit === 'work day'
                                                    ? calculateMaxDate(
                                                          form.getValues(
                                                              'start_date',
                                                          ),
                                                          userLeave?.remaining_leaves ??
                                                              0,
                                                      )
                                                    : new Date(
                                                          (form
                                                              .getValues(
                                                                  'start_date',
                                                              )
                                                              ?.getTime() ??
                                                              0) +
                                                              (leaveType?.max_quantity ??
                                                                  0) *
                                                                  24 *
                                                                  60 *
                                                                  60 *
                                                                  1000,
                                                      )
                                            }
                                            numberOfMonths={1}
                                            disabled={(date) =>
                                                date.getDay() === 0 ||
                                                date.getDay() === 6 ||
                                                date < new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Select end date for leave request
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="range">
                                    Pick Date(s)
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={'outline'}
                                            className={cn(
                                                'w-full rounded-md border border-gray-500 px-4 py-2',
                                                !range &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            <Calendar1Icon />
                                            {singleDate ? (
                                                format(singleDate, 'LLL dd, y')
                                            ) : (
                                                <span>Select a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={singleDate}
                                            onSelect={setSingleDate}
                                            initialFocus
                                            defaultMonth={singleDate}
                                            numberOfMonths={1}
                                            weekStartsOn={1}
                                            disabled={(date) =>
                                                date.getDay() === 0 ||
                                                date.getDay() === 6 ||
                                                date < new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Select date range for leave request
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="reason">Reason</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Reason"
                                        className="w-full rounded-md border px-4 py-2"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Reason for leave request
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="note">Note</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Note"
                                        className="w-full rounded-md border px-4 py-2"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Additional Note for leave request
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        )}
                        {isSubmitting ? 'Submitting...' : 'Create Request'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

function calculateMaxDate(
    startDate: Date | undefined,
    maxQuantity: number,
): Date {
    if (!startDate) {
        return new Date();
    }

    let daysAdded = 0;
    let currentDate = new Date(startDate);

    while (daysAdded < maxQuantity - 1) {
        currentDate.setDate(currentDate.getDate() + 1);

        // Skip weekends (Saturday and Sunday)
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            daysAdded++;
        }
    }

    return currentDate;
}
