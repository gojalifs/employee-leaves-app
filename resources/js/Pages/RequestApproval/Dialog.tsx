import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Request } from '@/types/request';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export default function ConfirmDialog({
    open,
    onOpenChange,
    rowData,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rowData: Request | null;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Approve Leave Request?</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>
                        {/* Update info for: <strong>{rowData?.user.name}</strong> */}
                        <strong className="underline">
                            {rowData?.user.name}
                        </strong>{' '}
                        has requested a leave of type {rowData?.leave_type.name}{' '}
                        starting from <strong> {rowData?.start_date} </strong>{' '}
                        until <strong> {rowData?.end_date}. Please</strong>{' '}
                        review the details and confirm your action.
                    </p>
                    <div className="flex gap-2">
                        <strong className="min-w-20">Reason:</strong>{' '}
                        {rowData?.reason}
                    </div>
                    <div className="flex gap-2">
                        <strong className="min-w-20">Note:</strong>{' '}
                        {rowData?.note}
                    </div>
                    <div className="flex gap-2">
                        <strong className="min-w-20">Status:</strong>{' '}
                        {rowData?.status}
                    </div>
                    <div className="flex gap-2">
                        <strong className="min-w-20">Start Date:</strong>{' '}
                        {rowData?.start_date}
                    </div>
                    <div className="flex gap-2">
                        <strong className="min-w-20">End Date:</strong>{' '}
                        {rowData?.end_date}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                // Handle approve action
                                router.patch(
                                    route(
                                        'request_approval.update',
                                        rowData?.id,
                                    ),
                                    { status: 'approved' },
                                    {
                                        onSuccess: () => {
                                            toast.success(
                                                'Leave request approved successfully',
                                            );

                                            router.reload();
                                        },
                                        onError: () => {
                                            toast.error(
                                                'Failed to approve leave request',
                                            );
                                        },
                                    },
                                );

                                console.log('Approved:', rowData);
                                onOpenChange(false);
                            }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                // Handle decline action
                                console.log('Declined:', rowData);
                                router.patch(
                                    route(
                                        'request_approval.update',
                                        rowData?.id,
                                    ),
                                    { status: 'rejected' },
                                    {
                                        onSuccess: () => {
                                            toast.success(
                                                'Leave request rejected successfully',
                                            );

                                            router.reload();
                                        },
                                        onError: () => {
                                            toast.error(
                                                'Failed to reject leave request',
                                            );
                                        },
                                    },
                                );

                                onOpenChange(false);
                            }}
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
