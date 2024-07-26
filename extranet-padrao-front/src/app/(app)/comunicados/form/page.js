"use client";

import React, { useEffect, useState } from "react";
import Header from "../../Header";
import Label from "@/components/Label";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import LinkComponent from "@/components/LinkComponent";
import Select from "@/components/Select";
import axios from "@/lib/axios";
import { FaArrowLeft, FaRegSave, FaSave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import InputFile from "@/components/InputFile";

export default function ComunicadosForm () {
    
    const router = useRouter();
    const { user } = useAuth({middleware: 'auth'});
    const [users, setUsers] = useState([]);
    const [setores, setSetores] = useState([]);
    const [comunicado, setComunicado] = useState({user_id: user.id, departament_id: [], users_id: []});
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setComunicado((prevComunicado) => ({
            ...prevComunicado,
            [name]:value
        }));
    }

    const handleMultiSelectChange = (e) => {
        const { name, options } = e.target;
        const values = Array.from(options).filter(option => option.selected).map(option => option.value);
        setComunicado((prevComunicado) => ({
            ...prevComunicado,
            [name]: values
        }));
    }

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    useEffect(() => {
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
        fetchUsers();
        fetchDepartments();
    }, [])

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        try {

            const formData = new FormData();
            formData.append('user_id', comunicado.user_id);
            formData.append('titulo', comunicado.titulo);
            formData.append('texto', comunicado.texto);
            formData.append('tipo_acesso', comunicado.tipo_acesso);
            formData.append('departament_id', comunicado.departament_id);
            formData.append('users_id', comunicado.users_id);

            files.forEach((file, index) => {
                formData.append('anexos[]', file);
            });

            const res = await axios.post('/api/comunicados', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.status === 200) {
                setTimeout(() => {
                    router.push('/comunicados')
                }, 2000)
            }

        } catch (error) {
            console.error('Erro ao cadastrar comunicado', error);
        }
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
                                    <TextArea name="texto" id="texto" rows={5} onChange={handleChange} className="w-full">{comunicado.texto}</TextArea>
                                </div>
                                <div className="mt-4">
                                    {/* <Label htmlFor="destinatario">Destinatário</Label> */}
                                    <div className="flex gap-3">
                                        <div className="flex gap-4 items-start">
                                            <span className="mt-1">Todos</span> 
                                            <Input type="radio" value="T" name="tipo_acesso" onChange={handleChange} />
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <span className="mt-1">Setor</span> 
                                            <Input type="radio" value="D" name="tipo_acesso" onChange={handleChange} />
                                            <Select multiple name="departament_id" id="departament_id" onChange={handleMultiSelectChange} className='overflow-y-scroll' arrayOption={setores} />
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <span className="mt-1">Usuário</span> 
                                            <Input type="radio" value="U" name="tipo_acesso" onChange={handleChange} />
                                            <Select multiple name="users_id" id="users_id" onChange={handleMultiSelectChange} arrayOption={users} />
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