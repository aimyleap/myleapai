"use client";

import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export function Community() {
    return (
        <section className="mt-8 px-4">
            <h2 className="text-xl font-bold text-sky-500">Comunidad</h2>

            <div className="mt-4 flex items-center justify-between rounded-[2rem] bg-white p-4 shadow-sm border border-slate-100">
                <div className="flex gap-3">
                    <button className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-colors">
                        <Twitter size={20} />
                    </button>
                    <button className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-colors">
                        <Instagram size={20} />
                    </button>
                    <button className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-colors">
                        <Linkedin size={20} />
                    </button>
                    <button className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-colors">
                        <Facebook size={20} />
                    </button>
                </div>

                <button className="rounded-full bg-sky-500 px-6 py-2 text-xs font-bold text-white shadow-md shadow-sky-100 uppercase tracking-tight active:scale-95 transition-transform">
                    Iniciar Sanación
                </button>
            </div>
        </section>
    );
}
