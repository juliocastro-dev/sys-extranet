"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { FaPaperclip, FaPlus } from "react-icons/fa";
import LinkComponent from "@/components/LinkComponent";
import axios from "@/lib/axios";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import LinkView from "../components/LinkView";
import LinkEdit from "../components/LinkEdit";
import BtnDelete from "../components/BtnDelete";
import Swal from "sweetalert2";

export default function Comunicados() {

    const [comunicados, setComunicados] = useState([]);
    useEffect(() => {
        const fetchComunicados = async () => {
            try {
                const res = await axios.get('/api/comunicados');
                if (res.status === 200) {
                    const { data } = res.data;
                    setComunicados(data);
                }
            } catch (error) {
                console.error('Erro ao listar comunicados', error);
            }
        }
        fetchComunicados();
    }, [])

    const formataData = (data) => {
        return format(new Date(data), 'dd/MM/yyyy', { locale: ptBR });
    }

    const handleDeleteComunicado = async (id, comunicadoTitulo) => {
        
        const {value: accept} = await Swal.fire({
            title: `Excluir - "${comunicadoTitulo}"`,
            icon: 'warning',
            text: `Tem certeza que deseja excluir esse comunicado ?`,
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        });

        if (accept) {
            try {
                const res = await axios.delete(`/api/comunicados/${id}`);
                if (res.status === 200) {
                    setComunicados((prevComunicados) => prevComunicados.filter((comunicado) => comunicado.id !== id));
                }
            } catch (error) {
                console.error('Erro ao deletar comunicado', error);
            }
        }
    };

    return (
        <>
            <Header title="Comunicados">
                <LinkComponent href="/comunicados/form">
                    <FaPlus />
                </LinkComponent>
            </Header>
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className='w-full p-4'>
                                <thead>
                                    <tr>
                                        <th className="text-start px-2">Título</th>
                                        <th className="text-start px-2">Remetente</th>
                                        <th className="text-start px-2">Data de envio</th>
                                        <th className="text-start px-2"></th>
                                        <th className="text-start px-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comunicados.length > 0 && (
                                        comunicados.map((comunicado) => (
                                            <tr key={comunicado.id} className="border-t border-gray-300 hover:bg-gray-100">
                                                <td className="px-2 py-2">{ comunicado.titulo }</td>
                                                <td className="px-2 py-2">{ comunicado.remetente.name }</td>
                                                <td className="px-2 py-2">{ formataData(comunicado.created_at) }</td>
                                                <td className="px-2 py-2">{ comunicado.files.length > 0 && <FaPaperclip color="gray" /> }</td>
                                                <td className="px-2 py-2 flex items-center gap-1">
                                                    <LinkView href={`/comunicados/view/${comunicado.id}`} />
                                                    <LinkEdit href={`/comunicados/edit/${comunicado.id}`} />
                                                    <BtnDelete onClick={() => handleDeleteComunicado(comunicado.id, comunicado.titulo)} />
                                                </td>
                                            </tr>
                                        ))
                                    ) || (
                                        <tr className="border-t border-gray-300">
                                            <td colSpan={4} className="text-center px-2 py-2">Nenhum comunicado cadastrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}