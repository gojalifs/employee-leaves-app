<?php

use App\Models\Leaves;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_leaves', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignIdFor(Leaves::class)->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->integer('remaining_leaves')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['user_id', 'leaves_id'], 'user_leaves_user_id_IDX');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_leaves');
    }
};
