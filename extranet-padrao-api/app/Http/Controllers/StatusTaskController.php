<?php

namespace App\Http\Controllers;

use App\Models\TaskStatus;

class StatusTaskController extends Controller
{
    public function index(TaskStatus $taskStatus){
        $status = $taskStatus->select('id', 'status')->get();
        return response()->json($status);
    }
}
