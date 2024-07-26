<?php

namespace App\Repositories;

use App\Models\Unidade;

class UnidadeRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(new Unidade());
    }

}