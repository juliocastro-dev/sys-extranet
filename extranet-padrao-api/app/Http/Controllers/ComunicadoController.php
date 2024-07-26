<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComunicadoRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Comunicado;
use App\Models\ComunicadoFile;
use App\Repositories\ComunicadoFileRepository;
use App\Repositories\ComunicadoRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ComunicadoController extends Controller
{
    private $comunicadoRepository;
    private $comunicadoFileRepository;

    public function __construct(
        ComunicadoRepository $comunicadoRepository,
        ComunicadoFileRepository $comunicadoFileRepository
    )
    {
        $this->comunicadoRepository = $comunicadoRepository;
        $this->comunicadoFileRepository = $comunicadoFileRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $comunicados = $this->comunicadoRepository->all(['remetente', 'files']);
            $response = new ApiResponse(Response::HTTP_OK, 'Listagem de comunicados realizada.');
            return $response->toResponse($comunicados);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * @param ComunicadoRequest $request
     * @return JsonResponse|Response
     */
    public function store(ComunicadoRequest $request)
    {
        try {

            $comunicado = Comunicado::create([
                'user_id' => $request['user_id'],
                'titulo' => $request['titulo'],
                'texto' => $request['texto'],
                'tipo_acesso' => $request['tipo_acesso'],
                'departament_id' => !empty($request['departament_id']) ? $request['departament_id'] : null,
                'users_id' => !empty($request['users_id']) ? $request['users_id'] : null
            ]);

            if ($request->hasFile('anexos')) {
                foreach ($request->file('anexos') as $file) {
                    $fileName = $file->getClientOriginalName();
                    $tempName = time() . '_' . $fileName;
                    $pathFile = $file->storeAs('comunicados/anexos', $tempName);

                    $this->comunicadoFileRepository->save([
                        'comunicado_id' => $comunicado->id,
                        'file_name' => $fileName,
                        'temporary_file_name' => $tempName,
                        'path_file' => $pathFile,
                    ]);
                }
            }
            $comunicadoCreated = $this->comunicadoRepository->find($comunicado->id, ['files']);
            $response = new ApiResponse(Response::HTTP_OK, 'Comunicado cadastrado com sucesso.');
            return $response->toResponse($comunicadoCreated);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $comunicado = $this->comunicadoRepository->find($id, ['files', 'remetente']);
            $response = new ApiResponse(Response::HTTP_OK, 'Comunicado listado com sucesso.');
            return $response->toResponse($comunicado);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    public function download($file)
    {
        if ($file) {
            return response()->download(storage_path('app/comunicados/anexos/'.$file));
        }
        return response()->json(['message' => 'File not found.'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comunicado $comunicado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $comunicado = $this->comunicadoRepository->delete($id);
            $response = new ApiResponse(Response::HTTP_OK, 'Comunicado removido com sucesso.');
            return $response->toResponse($comunicado);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
            return $response->toResponse([]);
        }
    }
}
