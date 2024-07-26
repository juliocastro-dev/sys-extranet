<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Departament;
use App\Repositories\DepartamentRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DepartamentController extends Controller
{
    private $departamentRepository;

    public function __construct(DepartamentRepository $departamentRepository)
    {
        $this->departamentRepository = $departamentRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $departaments = $this->departamentRepository->all(['users']);
            $response = new ApiResponse(Response::HTTP_OK, 'Listagem de departamentos!');
            return $response->toResponse($departaments);
        } catch (\Exception $e) {
            $response = new ApiResponse(500, $e->getMessage());
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $departament = $this->departamentRepository->save($request->all());
            $response = new ApiResponse(Response::HTTP_CREATED, 'Departamento adicionado com sucesso!');
            return $response->toResponse($departament);
        } catch (\Exception $e) {
            $response = new ApiResponse(500, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $departament = $this->departamentRepository->findOrFail($id);
            $response = new ApiResponse(Response::HTTP_OK, 'Departamento encontrado!');
            return $response->toResponse($departament);
        } catch (\Exception $e) {
            $response = new ApiResponse(500, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departament $departament)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        try {
            $departament = $this->departamentRepository->findOrFail($id)->update($request->all());
            $response = new ApiResponse(Response::HTTP_OK, 'Departamento atualizado!');
            return $response->toResponse($departament);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
            return $response->toResponse([]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $res = $this->departamentRepository->delete($id);
            $response = new ApiResponse(Response::HTTP_OK, 'Departamento removido!');
            return $response->toResponse($res);
        } catch (\Exception $e) {
            $response = new ApiResponse(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
            return $response->toResponse([]);
        }
    }
}
