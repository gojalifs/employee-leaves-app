<div
    style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; color: #333;">
    <h2 style="color: #2c3e50; border-bottom: 1px solid #e1e1e1; padding-bottom: 8px;">Leave Request Status Update</h2>
    <p>
        Dear {{ $user->name }},
    </p>
    <p>
        We're pleased to inform you that your leave request has been approved and processed.
    </p>

    <h3 style="color: #2980b9; margin-top: 24px;">Here Are Your Details</h3>
    <p style="background: #eef6fb; padding: 12px; border-radius: 6px;">
        <strong>Name:</strong> {{ $user->name }} <br>
        <strong>Email:</strong> {{ $user->email }}
    </p>

    <h3 style="color: #2980b9; margin-top: 24px;">Leave Request Details</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 6px;"><strong>Type of Leave:</strong> {{ $leave_request->leave_type }}</li>
        <li style="margin-bottom: 6px;"><strong>Start Date:</strong> {{ $leave_request->start_date }}</li>
        <li style="margin-bottom: 6px;"><strong>End Date:</strong> {{ $leave_request->end_date }}</li>
        <li style="margin-bottom: 6px;"><strong>Reason:</strong> {{ $leave_request->reason }}</li>
        @if ($leave_request->note)
            <li style="margin-bottom: 6px;"><strong>Additional Notes:</strong> {{ $leave_request->note }}</li>
        @endif
        <li style="margin-bottom: 6px; color: #27ae60;"><strong>Status:</strong> Approved</li>
    </ul>

    <p style="margin-top: 24px;">
        You can view the details of your leave request by visiting the following link:<br>
        <a href="{{ route('request.index') }}"
            style="display: inline-block; background: #2980b9; color: #fff; padding: 10px 18px; border-radius: 4px; text-decoration: none; margin-top: 8px;">
            View My Leave Requests
        </a>
    </p>

    <p style="margin-top: 32px;">
        Thank you for using our system.<br>
        Regards,<br>
        <span style="color: #2980b9;">Leave Management Team</span>
    </p>
</div>
