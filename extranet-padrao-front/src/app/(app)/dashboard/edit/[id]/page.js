'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../Header';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import LinkComponent from '@/components/LinkComponent';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';
import { FaArrowLeft, FaRegSave } from 'react-icons/fa';

export default function FormTask({ params }) {
    const router = useRouter();
    const { user } = useAuth({ middleware: 'auth' });
    const { id } = params;

    const [tarefa, setTarefa] = useState({
        task: '',
        timeSpent: '',
        taskUrl: '',
        status_id: 0,
    });

    const [status, setStatus] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user.id) {
                    router.push('/dashboard');
                    return;
                }

                const [taskResponse, statusResponse] = await Promise.all([
                    axios.get(`/api/tasks/${id}`),
                    axios.get('/api/status')
                ]);

                if (taskResponse.data.userId !== user.id && user.isAdmin !== 1) {
                    router.push('/dashboard');
                } else {
                    setTarefa({
                        task: taskResponse.data.task || '',
                        timeSpent: taskResponse.data.timeSpent || '',
                        taskUrl: taskResponse.data.taskUrl || '',
                        status_id: taskResponse.data.status_id || 0,
                    });
                }

                setStatus(statusResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados!', error);
            }
        };

        fetchData();
    }, [id, user.id, user.isAdmin, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarefa((prevTarefa) => ({
            ...prevTarefa,
            [name]: value,
        }));
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`/api/tasks/${id}`, tarefa, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setMensagem('Tarefa atualizada com sucesso!');
                setTimeout(() => {
                    setMensagem('');
                    router.push('/dashboard');
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao atualizar tarefa!', error);
        }
    };

    return (
        <>
            <Header title="Tarefas - Edit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {mensagem && (
                        <div className="bg-green-300 border-green-600 rounded-md p-2 text-green-700 w-96 m-auto text-center mb-5">
                            {mensagem}
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 w-full">
                            <form onSubmit={handleSubmitForm}>
                                <div>
                                    <Label htmlFor="task">Tarefa</Label>
                                    <Input
                                        id="task"
                                        name="task"
                                        type="text"
                                        value={tarefa.task}
                                        onChange={handleChange}
                                        className="w-96"
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="taskUrl">URL da tarefa</Label>
                                    <Input
                                        id="taskUrl"
                                        name="taskUrl"
                                        type="text"
                                        value={tarefa.taskUrl}
                                        onChange={handleChange}
                                        className="w-96"
                                    />
                                </div>

                                <div className="mt-4 flex gap-5">
                                    <div>
                                        <Label htmlFor="timeSpent">Tempo gasto</Label>
                                        <Input
                                            id="timeSpent"
                                            name="timeSpent"
                                            type="text"
                                            value={tarefa.timeSpent}
                                            onChange={handleChange}
                                            className="w-20"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="status_id">Status</Label>
                                        <select
                                            id="status_id"
                                            name="status_id"
                                            value={tarefa.status_id}
                                            onChange={handleChange}
                                            className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="">Selecione o status</option>
                                            {status.map((statusItem) => (
                                                <option key={statusItem.id} value={statusItem.id}>
                                                    {statusItem.status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <LinkComponent className='w-12' href="/dashboard">
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
    );
}
