'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/app/(app)/Header';
import LinkComponent from '@/components/LinkComponent';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import Link from 'next/link';
import { FaRegTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import BtnDelete from '../components/BtnDelete';
import LinkEdit from '../components/LinkEdit';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth({ middleware: 'auth' });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                const tasksRes = response.data;
                setTasks(tasksRes.data);
            } catch (err) {
                console.error("Erro ao buscar tarefas!", err);
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = async (id, taskName) => {

        const {value: accept} = await Swal.fire({
            title: `Excluir - "${taskName}"`,
            icon: 'warning',
            text: `Tem certeza que deseja excluir essa tarefa ?`,
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        });

        if (accept) {
            try {
                const res = await axios.delete(`/api/tasks/${id}`);
                if (res.status === 200) {
                    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                }
            } catch (error) {
                console.error('Erro ao deletar tarefa', error);
            }
        }
    };

    return (
        <>
            <Header title="Tarefas">
                <LinkComponent className="bg-transparent border-black hover:bg-transparent active:bg-transparent" href="/dashboard/form">
                    <FaPlus className="text-black text-center" />
                </LinkComponent>
            </Header>
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className='w-full p-2'>
                                <thead>
                                    <tr>
                                        <th className="text-start px-2">Tarefa</th>
                                        <th className="text-start px-2">Horas gastas</th>
                                        <th className="text-start px-2">URL da tarefa</th>
                                        <th className="text-start px-2">Desenvolvedor</th>
                                        <th className="text-start px-2">Status</th>
                                        <th className="text-start px-2">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(tasks.filter(task => (task.userId === user.id)).length > 0) && (
                                        tasks.map((task) => (
                                            (task.userId === user.id || user.isAdmin === 1) && (
                                                <tr key={task.id} className="border-t border-gray-300 hover:bg-gray-100">
                                                    <td className="px-2 py-2">{task.task}</td>
                                                    <td className="px-2 py-2">{task.timeSpent}</td>
                                                    <td className="px-2 py-2">
                                                        <a href={task.taskUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                            {task.taskUrl}
                                                        </a>
                                                    </td>
                                                    <td className="px-2 py-2">{task.user.name}</td>
                                                    <td className="px-2 py-2">{task.status.status}</td>
                                                    <td className="px-2 py-2 flex items-center gap-2">
                                                        <LinkEdit href={`/dashboard/edit/${task.id}`} />
                                                        <BtnDelete onClick={() => handleDeleteTask(task.id, task.task)} />
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    ) || (
                                        <tr className="border-t border-gray-300 hover:bg-gray-100">
                                            <td colSpan={6} className='p-2 text-center'>Nenhuma task cadastrada.</td>
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
};

export default Dashboard;
