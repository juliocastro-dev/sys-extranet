<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskStatus extends Model {
    use HasFactory;

    protected $table = "task_status";

    protected $fillable = [ "id", "status" ];

    public function task(): HasMany
    {
       return $this->hasMany(Task::class);
    }
}