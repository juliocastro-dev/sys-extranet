<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "userId",
        "task",
        "timeSpent",
        "taskUrl",
        "status_id",
        "created_at"
    ];

    protected static function boot()
    {
        parent::boot();
        // Filtering for last task created
        static::addGlobalScope('created', function (Builder $builder) {
            $builder->orderByDesc('created_at');
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function status(): HasOne
    {
        return $this->hasOne(TaskStatus::class, 'id', 'status_id');
    }
}
