<?php

use App\Models\ApprovalLevels;
use App\Models\Departments;
use App\Models\Positions;
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
        Schema::create('approval_levels', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Departments::class)->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->unsignedBigInteger('requester_position_id')->nullable();
            $table->foreign('requester_position')->references('id')->on('positions')->cascadeOnUpdate()->restrictOnDelete();
            $table->unsignedInteger('level');
            $table->foreignIdFor(Positions::class)->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignIdFor(ApprovalLevels::class, 'next_level_id')->nullable()->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approval_levels');
    }
};
