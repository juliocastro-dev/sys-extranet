"use client";
import Header from "@/app/(app)/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Label from "@/components/Label";
import LinkComponent from "@/components/LinkComponent";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";

const ComunicadoEdit = ({params}) => {

    const { id } = params;
    const { user } = useAuth({middleware: 'auth'});
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [setores, setSetores] = useState([]);
    const [comunicado, setComunicado] = useState({user_id: user.id, departament_id: [], users_id: []});
    const [file, setFiles] = useState([]);

    useEffect(() => {

        const fetchComunicado = async () => {
            const res = await axios.get(`/api/comunicados/${id}`);
            if (res.status === 200) {
                const { data } = res.data;
                setComunicado(data);
            }
        }

        const fetchUsers = async () => {
            const res = await axios.get('/api/users');
            if (res.status === 200) {
                const { data } = res.data;
                setUsers(data)
            }
        }

        const fetchDepartments = async () => {
            const result = await axios.get('/api/departaments');
            if (result.status === 200) {
                const { data } = result.data;
                setSetores(data);
            }
        }
        fetchComunicado();
        fetchUsers();
        fetchDepartments();
    }, [id])

    const handleSubmitForm = (event) => {
        event.preventDefault();
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setComunicado((prevComunicado) => ({
            ...prevComunicado,
            [name]: value
        }));
    }

    const handleMultiSelectChange = (e) => {
        const {name, options} = e.target;
        const values = Array.from(options).filter(option => option.selected).map(option => option.value);
        setComunicado((prevComunicado) => ({
            ...prevComunicado,
            [name]: values
        }));
    }

    const handleFileChange = (e) => {
        
    }

    return ( 
        <>
            <Header title="Comunicados - Form" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmitForm}>
                                <div>
                                    <Label htmlFor="titulo">Título</Label>
                                    <Input name="titulo" value={comunicado.titulo} onChange={handleChange} className="w-full" />
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="texto">Descrição</Label>
                                    <TextArea name="texto" value={comunicado.texto} id="texto" rows={5} onChange={handleChange} className="w-full"></TextArea>
                                </div>
                                <div className="mt-4">
                                    {/* <Label htmlFor="destinatario">Destinatário</Label> */}
                                    <div className="flex gap-3">
                                        <div className="flex gap-4 items-start">
                                            <span className="mt-1">Todos</span> 
                                            <Input type="radio" value="T" checked={comunicado.tipo_acesso === 'T' ?? false} name="tipo_acesso" onChange={handleChange} />
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <span className="mt-1">Setor</span> 
                                            <Input type="radio" value="D" checked={comunicado.tipo_acesso === 'D' ?? false} name="tipo_acesso" onChange={handleChange} />
                                            <Select multiple name="departament_id" id="departament_id" onChange={handleMultiSelectChange} className='overflow-y-scroll' 
                                            arrayOption={setores} 
                                            arraySelecteds={comunicado.departament_id} />
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <span className="mt-1">Usuário</span> 
                                            <Input type="radio" value="U" checked={comunicado.tipo_acesso === 'U' ?? false} name="tipo_acesso" onChange={handleChange} />
                                            <Select multiple name="users_id" id="users_id" onChange={handleMultiSelectChange} 
                                            arrayOption={users} 
                                            arraySelecteds={comunicado.users_id} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="anexo">Arquivo</Label>
                                    <InputFile type="file" name="anexos" id="anexos" onChange={handleFileChange} multiple />
                                </div>
                                <div className="flex gap-3 mt-8">
                                    <LinkComponent className='w-12' href="/comunicados">
                                        <FaArrowLeft />
                                    </LinkComponent>
                                    <Button type="submit" className="flex gap-3">
                                        <FaRegSave /> Salvar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComunicadoEdit;


