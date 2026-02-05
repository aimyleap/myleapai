"use client";

import { Home, Compass, Calendar, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabBar() {
    const pathname = usePathname();

    const tabs = [
        { name: "Inicio", href: "/", icon: Home },
        { name: "Cursos", href: "/courses", icon: Compass },
        { name: "Eventos", href: "/events", icon: Calendar },
        { name: "Mi Perfil", href: "/profile", icon: User },
    ];

    return (
        <nav className="fixed bottom-0 z-50 w-full glass pb-6 pt-3 px-6 md:hidden">
            <div className="flex items-center justify-between">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-accent" : "text-slate-500"
                                }`}
                        >
                            <Icon size={24} />
                            <span className="text-[10px] font-medium">{tab.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
