<?php

namespace App\Repositories;

use App\Models\Departament;

class DepartamentRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(new Departament());
    }
}
