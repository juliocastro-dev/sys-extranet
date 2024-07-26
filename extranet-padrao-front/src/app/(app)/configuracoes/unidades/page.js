"use client";
import LinkComponent from "@/components/LinkComponent"
import axios from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaRegTrashAlt } from "react-icons/fa"
import Swal from "sweetalert2";
import LinkEdit from "../../components/LinkEdit";
import BtnDelete from "../../components/BtnDelete";

const Unidades = () => {

    const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        const fetchUnidades = async () => {
            try {
                const res = await axios.get('/api/unidades');
                if (res.status === 200) {
                    const result = res.data.data
                    setUnidades(result.data);
                }
            } catch (error) {
                console.error('Erro ao buscar unidades!', error);
            }
        }
        fetchUnidades();
    }, []);

    const handleDeleteUnidade = async (id, unidadeName) => {

        const { value: accept } = await Swal.fire({
            title: `Excluir - "${unidadeName}"`,
            icon: 'warning',
            text: `Deseja realmente excluir essa unidade?`,
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'   
        });

        if (accept) {
            try {
                const res = await axios.delete(`/api/unidades/${id}`);
                if (res.status === 200) {
                    setUnidades((prevUnidades) => prevUnidades.filter((unidade) => unidade.id !== id));
                }
            } catch (error) {
                console.error('Erro ao deletar Unidade', error);
            }
        }
    };

    return (
        <>
            <LinkComponent className="grid-flow-col gap-2" href="/configuracoes/unidades/form">
                <FaPlus /> Nova
            </LinkComponent>
            <table className='w-full p-2 mt-5'>
                <thead>
                    <tr>
                        <th className="text-start px-2">Nome</th>
                        <th className="text-start px-2">Nome Fantasia</th>
                        <th className="text-start px-2">CNPJ</th>
                        <th className="text-start px-2">Telefone</th>
                        <th className="text-start px-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {unidades.map((unidade) => (
                        <tr key={unidade.id} className="border-t border-gray-300 hover:bg-gray-100">
                            <td className="px-2 py-2">{unidade.nome}</td>
                            <td className="px-2 py-2">{unidade.nome_fantasia}</td>
                            <td className="px-2 py-2">{unidade.cnpj}</td>
                            <td className="px-2 py-2">{unidade.telefone_contato}</td>
                            <td className="px-2 py-2 flex items-center gap-1">
                                <LinkEdit href={`/configuracoes/unidades/edit/${unidade.id}`} />
                                <BtnDelete onClick={() => handleDeleteUnidade(unidade.id, unidade.nome)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Unidades