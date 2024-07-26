<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnidadeRequest;
use App\Http\Responses\ApiResponse;
use App\Repositories\UnidadeRepository;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UnidadeController extends Controller
{
    private $unidadeRepository;

    public function __construct(UnidadeRepository $unidadeRepository)
    {
        $this->unidadeRepository = $unidadeRepository;
    }

    /**
     * @return JsonResponse|Response
     */
    public function index()
    {
        try {
            $unidades = $this->unidadeRepository->getAllWithPaginate(5);
            $response = new ApiResponse(Response::HTTP_OK, 'Listagem de Unidades realizada com sucesso!');
            return $response->toResponse($unidades);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_BAD_REQUEST, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * @param UnidadeRequest $request
     * @return JsonResponse|Response
     */
    public function store(UnidadeRequest $request)
    {
        try {
            $unidade = $this->unidadeRepository->save($request->all());
            $response = new ApiResponse(Response::HTTP_CREATED, 'Unidade cadastrada com sucesso!');
            return $response->toResponse($unidade);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_BAD_REQUEST, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    public function show($id)
    {
        try {
            $unidade = $this->unidadeRepository->findOrFail($id);
            $response = new ApiResponse(Response::HTTP_OK, 'Unidade encontrada com sucesso!');
            return $response->toResponse($unidade);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_BAD_REQUEST, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * @param UnidadeRequest $request
     * @param $id
     * @return JsonResponse|Response
     */
    public function update(UnidadeRequest $request, $id)
    {
        try{
            $this->unidadeRepository->update($id, $request->all());
            $response = new ApiResponse(Response::HTTP_OK, 'Unidade atualizada com sucesso!');
            $unidade = $this->unidadeRepository->findOrFail($id);
            return $response->toResponse($unidade);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_BAD_REQUEST, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * @param $id
     * @return JsonResponse|Response
     */
    public function destroy($id)
    {
        try {
            $this->unidadeRepository->delete($id);
            $response = new ApiResponse(Response::HTTP_OK, 'Unidade deletada com sucesso!');
            return $response->toResponse([]);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_BAD_REQUEST, $e->getMessage());
            return $response->toResponse([]);
        }
    }
}
