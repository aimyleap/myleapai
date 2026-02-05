"use client";

import { Calendar, MapPin, Clock, Tag } from "lucide-react";

export function NewsFeed() {
    const news = [
        {
            id: 1,
            type: "EVENTO",
            status: "GRATIS",
            title: "Círculo de Sanación Semanal",
            description: "Únete a nuestra sesión de sanación colectiva cada semana.",
            date: "Todos los Miércoles",
            time: "20:00",
            location: "Online - Zoom",
            icon: Calendar,
            accent: "bg-blue-500"
        },
        {
            id: 2,
            type: "NOTICIA",
            status: "NUEVO",
            title: "Nueva Guía de Meditación",
            description: "Explora técnicas avanzadas para calmar tu mente.",
            date: "Hoy",
            time: "10:00",
            location: "App MY LEAP",
            icon: Tag,
            accent: "bg-cyan-500"
        }
    ];

    return (
        <section className="mt-8 px-4">
            <h2 className="text-xl font-bold text-sky-500">Noticias</h2>

            <div className="mt-4 flex gap-4 overflow-x-auto pb-6 no-scrollbar">
                {news.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="relative w-[85vw] flex-shrink-0 overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-sm border border-slate-100 md:w-80"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accent} text-white shadow-lg shadow-sky-100`}>
                                    <Icon size={24} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-2">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                                            {item.type}
                                        </span>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                                            {item.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 leading-tight mt-1">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mt-6 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                    <Calendar size={14} className="text-sky-400" />
                                    <span>{item.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                    <Clock size={14} className="text-sky-400" />
                                    <span>{item.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                    <MapPin size={14} className="text-sky-400" />
                                    <span>{item.location}</span>
                                </div>
                            </div>

                            <button className="mt-6 w-full rounded-2xl bg-sky-50 py-3 text-sm font-bold text-sky-500 transition-colors active:bg-sky-100">
                                Leer más
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
