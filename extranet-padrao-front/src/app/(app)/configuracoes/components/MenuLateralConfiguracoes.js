import Link from "next/link";
import React from "react";
import { 
    FaBuilding, 
    FaFileExcel,
    FaListAlt, 
    FaNetworkWired, 
    FaShoppingCart, 
    FaTruck, 
    FaUsers 
} from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

export default function MenuLateralConfiguracoes() {
    return (
        <div className="bg-white h-fit w-[15%] p-5 overflow-hidden shadow-sm rounded-lg mt-2 border-gray-200 border">
            <div className="p-2">
                <Link href={'/configuracoes/menus'} className="flex gap-3 items-center">
                    <IoColorPalette /> Layout
                </Link>
            </div>
            <div className="p-2">
                <Link href={'/configuracoes/menus'} className="flex gap-3 items-center">
                    <FaListAlt /> Menus
                </Link>
            </div>
            <div className="p-2">
                <Link href={'/configuracoes/menus'} className="flex gap-3 items-center">
                    <FaFileExcel /> Relatórios
                </Link>
            </div>
            <div className="mt-1 p-2">
                <Link href={'/configuracoes/unidades'} className="flex gap-3 items-center">
                    <FaBuilding /> Unidades
                </Link>
            </div>
            <div className="mt-1 p-2">
                <Link href={'/configuracoes/users'} className="flex gap-3 items-center">
                    <FaUsers /> Usuários
                </Link>
            </div>
            <div className="mt-1 p-2">
                <Link href={'/configuracoes/menus'} className="flex gap-3 items-center">
                    <FaShoppingCart /> Produtos
                </Link>
            </div>
            <div className="mt-1 p-2">
                <Link href={'/configuracoes/menus'} className="flex gap-3 items-center">
                    <FaTruck /> Fornecedores
                </Link>
            </div>
            <div className="mt-1 p-2">
                <Link href={'/configuracoes/setores'} className="flex gap-3 items-center">
                    <FaNetworkWired /> Setores
                </Link>
            </div>
        </div>
    )
}