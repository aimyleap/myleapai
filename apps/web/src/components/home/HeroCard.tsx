"use client";

import { useState } from "react";
import { Users, GraduationCap, Calendar, Loader2 } from "lucide-react";
import { useActiveAccount, useWalletBalance, useActiveWalletChain } from "thirdweb/react";
import { client, chain, LEAP_TOKEN_ADDRESS } from "@/lib/thirdweb";
import { SendTokensModal } from "../wallet/SendTokensModal";

export function HeroCard() {
    const account = useActiveAccount();
    const activeChain = useActiveWalletChain() || chain;

    const isLeapValid = LEAP_TOKEN_ADDRESS && LEAP_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000";

    const { data: balance, isLoading } = useWalletBalance({
        client,
        chain: activeChain,
        address: account?.address,
        tokenAddress: isLeapValid ? LEAP_TOKEN_ADDRESS : undefined,
    });

    const [isSendModalOpen, setIsSendModalOpen] = useState(false);

    return (
        <div className="mx-4 mt-4 overflow-hidden rounded-[2.5rem] hero-gradient p-6 text-white shadow-lg shadow-sky-200 dark:shadow-none">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Hola leaper! 👋
                    </h1>
                    <p className="mt-1 text-sm font-medium opacity-90">
                        Sanación física y energética para tu cuerpo
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <button
                        onClick={() => setIsSendModalOpen(true)}
                        className="flex h-12 items-center gap-2 rounded-2xl bg-white/20 px-4 backdrop-blur-md border border-white/10 transition-transform active:scale-95 hover:bg-white/30"
                    >
                        <div className="bg-yellow-400 rounded-full p-1 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-white/50" />
                        </div>
                        <span className="text-sm font-bold min-w-[3ch] flex items-center gap-1">
                            {isLoading && account?.address ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : account?.address ? (
                                `${balance?.displayValue || "0"}`
                            ) : (
                                "0.00"
                            )}
                            <span className="uppercase">LEAP</span>
                        </span>
                    </button>

                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                        {activeChain.id === 80002 ? "Testnet Mode" : "Polygon Mode"}
                    </span>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 p-4 transition-transform active:scale-95">
                    <div className="rounded-full bg-white/20 p-2">
                        <Users size={24} />
                    </div>
                    <span className="text-xs font-semibold">Sanadores</span>
                </button>

                <button className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 p-4 transition-transform active:scale-95">
                    <div className="rounded-full bg-white/20 p-2">
                        <GraduationCap size={24} />
                    </div>
                    <span className="text-xs font-semibold">Cursos</span>
                </button>

                <button className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 p-4 transition-transform active:scale-95">
                    <div className="rounded-full bg-white/20 p-2">
                        <Calendar size={24} />
                    </div>
                    <span className="text-xs font-semibold">Eventos</span>
                </button>
            </div>

            <SendTokensModal
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
            />
        </div>
    );
}
