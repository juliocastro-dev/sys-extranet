<?php

namespace App\Repositories;

use App\Models\ComunicadoFile;
use App\Repositories\BaseRepository;

class ComunicadoFileRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(new ComunicadoFile());
    }
}