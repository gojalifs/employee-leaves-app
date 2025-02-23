<?php

use App\Models\ApprovalLevels;
use App\Models\LeaveHistory;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leave_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(LeaveHistory::class)->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignIdFor(ApprovalLevels::class)->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignIdFor(User::class, 'approver_id')->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->enum('status', ['approved', 'rejected']);
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_approvals');
    }
};
