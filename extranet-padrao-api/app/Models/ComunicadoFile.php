<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComunicadoFile extends Model
{
    use HasFactory;

    protected $table = 'comunicados_files';

    protected $fillable = [
        'comunicado_id',
        'file_name',
        'temporary_file_name',
        'path_file'
    ];

    public function comunicado(): BelongsTo
    {
        return $this->belongsTo(Comunicado::class);
    }
}
