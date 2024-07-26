"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import LinkComponent from "@/components/LinkComponent";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";

const SetorEdit = ({ params }) => {

    const { id } = params;
    const [setor, setSetor] = useState([]);
    const router = useRouter();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSetor((prevSetor) => ({
            ...prevSetor,
            [name]:value
         })); 
    }

    useEffect(() => {
        const fetchSetor = async () => {
            const res = await axios.get(`/api/departaments/${id}`);
            if (res.status === 200) {
                const { data } = res.data;
                setSetor(data);
            }
        }
        fetchSetor();
    },[id])

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`/api/departaments/${id}`, setor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status === 200) {
                setTimeout(() => {
                    router.push('/configuracoes/setores');
                }, 2000)
            }
        } catch (error) {
            console.error('Erro ao atualizar setor', error);
        }
    }
    return (

        <div>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={setor.name}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                </div>
                <div className="flex gap-3 mt-8">
                    <LinkComponent className='w-12' href="/configuracoes/setores">
                        <FaArrowLeft />
                    </LinkComponent>
                    <Button type="submit" className="flex gap-3">
                        <FaRegSave /> Salvar
                    </Button>
                </div>
            </form>
        </div>
    )

}

export default SetorEdit;