"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaDownload, FaEye } from "react-icons/fa";
import axios from "@/lib/axios";
import Header from "@/app/(app)/Header";
import LinkComponent from "@/components/LinkComponent";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

const ComunicadoView = ({ params }) => {
    const { id } = params;
    const [comunicado, setComunicado] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchComunicado = async () => {
            try {
                const res = await axios.get(`/api/comunicados/${id}`);
                if (res.status === 200) {
                    setComunicado(res.data.data);
                }
            } catch (error) {
                console.error('Erro ao buscar o comunicado', error);
            }
        };
        fetchComunicado();
    }, [id]);

    const formataData = (data) => {
        return format(Date(data), 'dd/mm/yyyy', { locale: ptBR });
    };

    const handleDownload = async (filePath) => {
        try {
            const response = await axios.get(`/api/comunicados/download/${filePath}`, {
                method: 'GET',
                responseType: 'blob'
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filePath.split('/').pop());
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erro ao fazer o download do arquivo', error);
        }
    };

    const previewImageModal = (srcImage) => {
        const urlImage = `http://localhost:8000/api/${srcImage}`;
        setImagePreview(urlImage);
        setShowModal(true);
    }

    return (
        <>
            <Header title={`Comunicado - View`} />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <h1 className="w-full font-sans font-bold text-[1.5rem]">{comunicado?.titulo}</h1>
                                <span className="text-sm">{`${formataData(comunicado?.created_at)} - ${comunicado.remetente?.name}`}</span>
                                <p className="mt-5">{comunicado?.texto}</p>
                            </div>
                            <div className="flex gap-3 mt-5">
                                {comunicado.files?.map((file) => (
                                    <div className="flex flex-col items-center justify-center" key={file.path_file}>
                                        <img src={`http://localhost:8000/api/${file.path_file}`} className="rounded-md" width={150} height={50} />
                                        <div className="flex gap-2 mt-5">
                                            <Button className='hover:bg-black hover:text-white px-3 py-3' onClick={() => handleDownload(file.temporary_file_name)}>
                                                <FaDownload />
                                            </Button>
                                            <Button onClick={() => previewImageModal(file.path_file)} className="px-3 py-3"><FaEye /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <LinkComponent className='w-12' href="/comunicados">
                                    <FaArrowLeft />
                                </LinkComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <img src={imagePreview} />
                </Modal>
            }
        </>
    );
}

export default ComunicadoView;
