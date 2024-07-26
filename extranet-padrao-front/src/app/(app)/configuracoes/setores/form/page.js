"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import LinkComponent from "@/components/LinkComponent";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";


const SetorForm = () => {

    const [setor, setSetor] = useState([]);
    const router = useRouter();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSetor((prevSetor) => ({
            ...prevSetor,
            [name]:value
        }));
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('/api/departaments', setor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (res.status === 201) {
                setTimeout(() => {
                    router.push('/configuracoes/setores')
                }, 200)
            }
        } catch (error) {
            console.error('Erro ao cadastrar setor!', error);
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
    );
}

export default SetorForm;