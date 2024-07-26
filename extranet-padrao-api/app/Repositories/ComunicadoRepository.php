<?php

namespace App\Repositories;

use App\Models\Comunicado;
use App\Repositories\BaseRepository;

class ComunicadoRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(new Comunicado());
    }
}