"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import LinkComponent from "@/components/LinkComponent";
import axios from "axios";
import axiosAlias from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";

const UnidadeForm = () => {

    const router = useRouter();
    
    const [unidade, setUnidade] = useState({
        nome: '',
        nome_fantasia: '',
        cnpj: '',
        telefone_contato: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        numero: '',
        complemento: ''
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setUnidade((prevUnidade) => ({
            ...prevUnidade,
            [name]: value,
        }));
    }, []);

    useEffect(() => {
        const getCep = async () => {
            const cepUnidade = unidade.cep;
            if (cepUnidade?.length === 8) {
                try {
                    const { data } = await axios.get(`https://viacep.com.br/ws/${cepUnidade}/json/`);
                    setUnidade((prevUnidade) => ({
                        ...prevUnidade,
                        rua: data.logradouro || '',
                        bairro: data.bairro || '',
                        cidade: data.localidade || '',
                        estado: data.uf || ''
                    }));
                } catch (error) {
                    console.error("Erro ao buscar o CEP:", error);
                }
            }
        };
        getCep();
    }, [unidade.cep]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosAlias.post('/api/unidades', unidade, {
                headers: {
                    'Content-Type':'application/json',
                }
            });
            
            if (res.status === 201) {
                setTimeout(() => {
                    router.push('/configuracoes/unidades')
                }, 200)
            }

        } catch {
            console.error('Erro ao cadastrar unidade')
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                        id="nome"
                        name="nome"
                        type="text"
                        value={unidade.nome}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                </div>
                <div className="mt-3">
                    <Label htmlFor="nome_fantasia">Nome Fantasia</Label>
                    <Input
                        id="nome_fantasia"
                        name="nome_fantasia"
                        type="text"
                        value={unidade.nome_fantasia}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                </div>
                <div className="flex gap-5 mt-3">
                    <div>
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                            id="cnpj"
                            name="cnpj"
                            type="text"
                            value={unidade.cnpj}
                            onChange={handleChange}
                            className="w-52"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="telefone_contato">Telefone</Label>
                        <Input
                            id="telefone_contato"
                            name="telefone_contato"
                            type="text"
                            value={unidade.telefone_contato}
                            onChange={handleChange}
                            className="w-52"
                            required
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                        id="cep"
                        name="cep"
                        type="text"
                        value={unidade.cep}
                        onChange={handleChange}
                        className="w-52"
                        required
                    />
                </div>
                <div className="mt-3">
                    <Label htmlFor="rua">Rua</Label>
                    <Input
                        id="rua"
                        name="rua"
                        type="text"
                        value={unidade.rua}
                        onChange={handleChange}
                        className="w-full bg-gray-200"
                        disabled={true}
                        required
                    />
                </div>
                <div className="flex gap-5 mt-3">
                    <div className="w-80">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                            id="bairro"
                            name="bairro"
                            type="text"
                            value={unidade.bairro}
                            onChange={handleChange}
                            className="w-full bg-gray-200"
                            disabled={true}
                            required
                        />
                    </div>
                    <div className="w-72">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                            id="cidade"
                            name="cidade"
                            type="text"
                            value={unidade.cidade}
                            onChange={handleChange}
                            className="w-full bg-gray-200"
                            disabled={true}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                            id="estado"
                            name="estado"
                            type="text"
                            value={unidade.estado}
                            onChange={handleChange}
                            className="w-full bg-gray-200"
                            disabled={true}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-5 mt-3">
                    <div>
                        <Label htmlFor="numero">Número</Label>
                        <Input
                            id="numero"
                            name="numero"
                            type="number"
                            value={unidade.numero}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input
                            id="complemento"
                            name="complemento"
                            type="text"
                            value={unidade.complemento}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex gap-3 mt-8">
                    <LinkComponent className='w-12' href="/configuracoes/unidades">
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

export default UnidadeForm;
