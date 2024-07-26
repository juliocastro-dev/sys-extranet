"use client";
import React from "react";
import Header from "../Header";
import FullCalendar from "@/components/FullCalendar";

export default function Calendario() {

    return (
        <>
            <Header title="Calendário" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                           <FullCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}