"use client";

import { useState, useEffect } from "react";
import { X, Search, Send, User, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { client, LEAP_TOKEN_ADDRESS, chain } from "@/lib/thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { transfer } from "thirdweb/extensions/erc20";
import { sendAndConfirmTransaction } from "thirdweb";

interface Leaper {
    id: string;
    username: string | null;
    full_name: string | null;
    wallet_address: string | null;
    email: string | null;
}

interface SendTokensModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SendTokensModal({ isOpen, onClose }: SendTokensModalProps) {
    const account = useActiveAccount();
    const [searchQuery, setSearchQuery] = useState("");
    const [leapers, setLeapers] = useState<Leaper[]>([]);
    const [selectedLeaper, setSelectedLeaper] = useState<Leaper | null>(null);
    const [amount, setAmount] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (searchQuery.length < 3) {
            setLeapers([]);
            return;
        }

        const fetchLeapers = async () => {
            setIsSearching(true);
            console.log("🔍 Buscando Leapers con:", searchQuery);

            // Intentamos buscar por full_name y email (columnas confirmadas en useUserSync)
            // Agregamos wallet_address también por si el usuario pega una dirección.
            // Intentamos buscar por full_name, email o wallet_address exacto/parcial
            const { data, error } = await supabase
                .from("profiles")
                .select("id, full_name, wallet_address, email")
                .or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,wallet_address.eq.${searchQuery},wallet_address.ilike.%${searchQuery}%`)
                .limit(5);

            if (error) {
                console.error("❌ Error en búsqueda Supabase:", error);
                setErrorMessage("Error de permisos o tabla: " + error.message);
                setStatus("error");
            } else if (data) {
                console.log("✅ Leapers encontrados:", data.length);
                // Filtrar para no mostrarse a sí mismo si se conoce la dirección
                setLeapers(data.filter(l => l.wallet_address?.toLowerCase() !== account?.address?.toLowerCase()));
            }
            setIsSearching(false);
        };

        const timer = setTimeout(fetchLeapers, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, account?.address]);

    const handleSend = async () => {
        if (!selectedLeaper?.wallet_address || !amount || !account) return;

        setIsSending(true);
        setStatus("idle");

        try {
            const transaction = transfer({
                contract: {
                    address: LEAP_TOKEN_ADDRESS,
                    client,
                    chain,
                },
                to: selectedLeaper.wallet_address,
                amount: amount,
            });

            await sendAndConfirmTransaction({
                transaction,
                account,
            });

            setStatus("success");
            setAmount("");
            setSelectedLeaper(null);
            setSearchQuery("");
        } catch (err: any) {
            console.error("Transfer error:", err);
            setStatus("error");
            setErrorMessage(err.message || "Error al enviar tokens");
        } finally {
            setIsSending(false);
        }
    };

    // Resetear estados al cerrar o abrir el modal para asegurar limpieza
    useEffect(() => {
        if (!isOpen) {
            // Un pequeño delay para que no se vea el cambio durante la animación de cierre
            const timer = setTimeout(() => {
                setStatus("idle");
                setAmount("");
                setSelectedLeaper(null);
                setSearchQuery("");
                setErrorMessage("");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-gray-900">
            <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Send className="h-5 w-5 text-sky-600" />
                        Enviar LEAPt
                    </h2>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {status === "success" ? (
                    <div className="flex flex-col items-center py-8 text-center">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">¡Envío Exitoso!</h3>
                        <p className="text-sm text-gray-600 mt-2 font-medium">Los tokens están en camino al Leaper.</p>
                        <button
                            onClick={onClose}
                            className="mt-6 w-full py-3 rounded-2xl bg-sky-500 text-white font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-100"
                        >
                            Listo
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Buscador */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 ml-1">Buscar Leaper</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Nombre, usuario o email..."
                                    className="w-full rounded-2xl border-none bg-gray-100/50 py-4 pl-12 pr-4 text-sm text-gray-900 focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {isSearching && (
                                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-sky-600" />
                                )}
                            </div>
                        </div>

                        {/* Resultados / Seleccionado */}
                        {selectedLeaper ? (
                            <div className="flex items-center justify-between rounded-2xl bg-sky-50/50 p-4 border border-sky-100 animate-in slide-in-from-top-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center text-white shadow-sm">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{selectedLeaper.full_name || selectedLeaper.username}</p>
                                        <p className="text-[10px] text-sky-700 font-bold font-mono truncate max-w-[150px]">{selectedLeaper.wallet_address}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLeaper(null)}
                                    className="text-xs font-bold text-sky-600 hover:text-sky-700 underline"
                                >
                                    Cambiar
                                </button>
                            </div>
                        ) : (
                            <div className="max-h-40 overflow-y-auto space-y-2 custom-scrollbar">
                                {leapers.map((leaper) => (
                                    <button
                                        key={leaper.id}
                                        onClick={() => setSelectedLeaper(leaper)}
                                        className="w-full flex items-center gap-3 rounded-2xl p-3 hover:bg-gray-100 transition-colors text-left group border border-transparent hover:border-gray-200"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{leaper.full_name || leaper.username}</p>
                                            <p className="text-[10px] text-gray-500 font-medium truncate max-w-[200px]">{leaper.email}</p>
                                        </div>
                                    </button>
                                ))}
                                {searchQuery.length >= 3 && leapers.length === 0 && !isSearching && (
                                    <div className="py-4 text-center">
                                        <p className="text-sm text-gray-500 font-medium">No se encontraron Leapers.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Monto */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 ml-1">Monto a Enviar</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full rounded-2xl border-none bg-gray-100/50 py-4 px-4 text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-gray-300"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-sky-600">LEAPt</span>
                            </div>
                        </div>

                        {status === "error" && (
                            <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 p-3 rounded-xl">
                                <AlertCircle className="h-4 w-4" />
                                {errorMessage}
                            </div>
                        )}

                        {/* Botón Acción */}
                        <button
                            disabled={!selectedLeaper || !amount || isSending}
                            onClick={handleSend}
                            className="w-full py-4 rounded-[1.5rem] bg-sky-500 text-white font-bold hover:bg-sky-600 disabled:opacity-50 disabled:bg-gray-200 transition-all shadow-xl shadow-sky-100 flex items-center justify-center gap-2"
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    Confirmar Envío
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
