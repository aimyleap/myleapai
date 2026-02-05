"use client";

import { Play } from "lucide-react";

export function Testimonials() {
    const testimonials = [
        { id: 1, title: "Sanación Cuántica", color: "bg-sky-100" },
        { id: 2, title: "Paz Interior", color: "bg-cyan-100" },
        { id: 3, title: "Energía Vital", color: "bg-blue-100" },
    ];

    return (
        <section className="mt-8 px-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-sky-500">Testimonios</h2>
                <button className="text-sm font-semibold text-sky-400">Ver todos &gt;</button>
            </div>

            <div className="mt-4 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {testimonials.map((item) => (
                    <div
                        key={item.id}
                        className={`relative h-44 w-72 flex-shrink-0 overflow-hidden rounded-[2rem] ${item.color} shadow-sm border border-white`}
                    >
                        {/* Simulación de imagen de fondo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="h-12 w-12 rounded-full glass flex items-center justify-center text-white shadow-lg transition-transform active:scale-90">
                                <Play className="ml-1 fill-white" size={24} />
                            </button>
                        </div>

                        <div className="absolute bottom-4 left-4">
                            <span className="text-xs font-bold text-white uppercase tracking-widest">{item.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicador de scroll */}
            <div className="mt-2 flex justify-center gap-1">
                <div className="h-1 w-8 rounded-full bg-sky-400" />
                <div className="h-1 w-2 rounded-full bg-slate-200" />
                <div className="h-1 w-2 rounded-full bg-slate-200" />
            </div>
        </section>
    );
}
