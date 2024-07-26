"use client";
import LinkComponent from "@/components/LinkComponent"
import axios from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaRegTrashAlt } from "react-icons/fa"
import LinkEdit from "../../components/LinkEdit";
import BtnDelete from "../../components/BtnDelete";

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                if (res.status === 200) {
                    const { data } = res.data;
                    setUsers(data);
                }
            } catch (error) {
                console.error('Erro ao buscar usuários', error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <>
            <LinkComponent className="grid-flow-col gap-2" href="/configuracoes/users/form">
                <FaPlus /> Novo
            </LinkComponent>
            <table className='w-full p-2 mt-5'>
                <thead>
                    <tr>
                        <th className="text-start px-2">Nome</th>
                        <th className="text-start px-2">Login</th>
                        <th className="text-start px-2">Setor</th>
                        <th className="text-start px-2">Status</th>
                        <th className="text-start px-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t border-gray-300 hover:bg-gray-100">
                            <td className="px-2 py-2">{user.name}</td>
                            <td className="px-2 py-2">{user.email}</td>
                            <td className="px-2 py-2">{user.departament.name}</td>
                            <td className="px-2 py-2">{user.active === 1 ? "Ativo" : "Inativo"}</td>
                            <td className="px-2 py-2 flex items-center gap-1">
                                <LinkEdit href={`/configuracoes/users/edit/${user.id}`} />
                                <BtnDelete />
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </>
    )
}

export default Users