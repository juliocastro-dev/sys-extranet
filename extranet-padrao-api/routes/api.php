<?php

use App\Http\Controllers\ComunicadoController;
use App\Http\Controllers\DepartamentController;
use App\Http\Controllers\StatusTaskController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UnidadeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/images/{arquivo}', function ($imagem) {
    $path = storage_path("app/images/$imagem");
    // Verificando se o arquivo existe
    if (!file_exists($path)) {
        abort(404);
    }
    // Retornando a imagem com o tipo MIME correto
    $mime = mime_content_type($path);
    return response()->file($path, ['Content-Type' => $mime]);
});


Route::get('/comunicados/anexos/{arquivo}', function ($imagem) {
    $path = storage_path("app/comunicados/anexos/$imagem");
    // Verificando se o arquivo existe
    if (!file_exists($path)) {
        abort(404);
    }
    // Retornando a imagem com o tipo MIME correto
    $mime = mime_content_type($path);
    return response()->file($path, ['Content-Type' => $mime]);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('/users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('/{id}', [UserController::class, 'update']);
    });

    Route::apiResources([
        'tasks' => TaskController::class,
        'unidades' => UnidadeController::class,
        'departaments' => DepartamentController::class,
        'comunicados' => ComunicadoController::class,
    ]);

    Route::prefix('/comunicados')->group(function () {
        Route::get('/download/{file}', [ComunicadoController::class, 'download'])->name('api.comunicados.download');
    });

    Route::prefix('/status')->group(function () {
        Route::get('/', [StatusTaskController::class, 'index']);
    });
});