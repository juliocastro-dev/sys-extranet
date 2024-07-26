"use client";
import LinkComponent from "@/components/LinkComponent"
import axios from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaRegTrashAlt } from "react-icons/fa"
import LinkEdit from "../../components/LinkEdit";
import BtnDelete from "../../components/BtnDelete";
import Swal from "sweetalert2";

const Setores = () => {

    const [setores, setSetores] = useState([]);

    useEffect(() => {
        const fetchSetores = async () => {
            try {
                const res = await axios.get('/api/departaments');
                if (res.status === 200) {
                    const {data} = res.data
                    setSetores(data);
                }
            } catch (error) {
                console.error('Erro ao buscar setores!', error);
            }
        }
        fetchSetores();
    }, []);

    const handleDeleteSetor = async (id, setorName) => {

        const { value: accept } = await Swal.fire({
            title: `Excluir - "${setorName}"`,
            icon: 'warning',
            text: `Deseja realmente excluir esse setor?`,
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'   
        });

        if (accept) {
            try {
                const res = await axios.delete(`/api/departaments/${id}`);
                if (res.status === 200) {
                    setSetores((prevSetores) => prevSetores.filter((setor) => setor.id !== id));
                }
            } catch (error) {
                console.error('Erro ao deletar setor', error);
            }
        }
    };

    return (
        <>
            <LinkComponent className="grid-flow-col gap-2" href="/configuracoes/setores/form">
                <FaPlus /> Novo
            </LinkComponent>
            <table className='w-full p-2 mt-5'>
                <thead>
                    <tr>
                        <th className="text-start px-2">ID</th>
                        <th className="text-start px-2">Setor</th>
                        <th className="text-start px-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {setores.map((setor) => (
                        <tr key={setor.id} className="border-t border-gray-300 hover:bg-gray-100">
                            <td className="px-2 py-2">{setor.id}</td>
                            <td className="px-2 py-2">{setor.name}</td>
                            <td className="px-2 py-2 flex items-center gap-1">
                                <LinkEdit href={`/configuracoes/setores/edit/${setor.id}`} />
                                <BtnDelete onClick={() => handleDeleteSetor(setor.id, setor.name)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Setores