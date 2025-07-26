<div
    style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; color: #333;">
    <h2 style="color: #2c3e50; border-bottom: 1px solid #e1e1e1; padding-bottom: 8px;">Leave Request Notification</h2>
    <p>
        Dear Approver,
    </p>
    <p>
        This is to inform you that a leave request has been submitted by the following user:
    </p>
    <p style="background: #eef6fb; padding: 12px; border-radius: 6px;">
        <strong>Name:</strong> {{ $user->name }} <br>
        <strong>Email:</strong> {{ $user->email }}
    </p>
    <h3 style="color: #2980b9; margin-top: 24px;">Leave Details</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 6px;"><strong>Type of Leave:</strong> {{ $leave->leave_type }}</li>
        <li style="margin-bottom: 6px;"><strong>Start Date:</strong> {{ $leave->start_date }}</li>
        <li style="margin-bottom: 6px;"><strong>End Date:</strong> {{ $leave->end_date }}</li>
        <li style="margin-bottom: 6px;"><strong>Reason:</strong> {{ $leave->reason }}</li>
        <li style="margin-bottom: 6px;"><strong>Additional Notes:</strong> {{ $leave->note }}</li>
    </ul>
    <p>
        Kindly review and process the leave request at your earliest convenience by visiting the following link:<br>
        <a href="{{ route('request_approval.index') }}"
            style="display: inline-block; background: #2980b9; color: #fff; padding: 10px 18px; border-radius: 4px; text-decoration: none; margin-top: 8px;">Review
            Leave Request</a>
    </p>
    <p style="margin-top: 32px;">
        Thank you.<br>
        Regards,<br>
        <span style="color: #2980b9;">Leave Management System</span>
    </p>
</div>
