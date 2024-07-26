"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Label from "@/components/Label";
import Input from "@/components/Input";
import LinkComponent from "@/components/LinkComponent";
import Button from "@/components/Button";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";

const EditUnidade = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [unidade, setUnidade] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/unidades/${id}`);
        if (res.status === 200) {
          const { data } = res.data;
          setUnidade({
            nome: data?.nome || '',
            nome_fantasia: data?.nome_fantasia || '',
            cnpj: data?.cnpj || '',
            telefone_contato: data?.telefone_contato || '',
            cep: data?.cep || '',
            rua: data?.rua || '',
            bairro: data?.bairro || '',
            cidade: data?.cidade || '',
            estado: data?.estado || '',
            numero: data?.numero || 0,
            complemento: data?.complemento || '',
          });
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnidade((prevUnidade) => ({
      ...prevUnidade,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/unidades/${id}`, unidade, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.status === 200) {
        router.push('/configuracoes/unidades');
      }
    } catch (error) {
      console.log('Erro ao atualizar Unidade!', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
				required={true}
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
				required={true}
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
					required={true}
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
					required={true}
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
				required={true}
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
				required={true}
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
					required={true}
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
					required={true}
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
					required={true}
					disabled={true}
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
					required={true}
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
};

export default EditUnidade;