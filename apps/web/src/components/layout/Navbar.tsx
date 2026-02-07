"use client";

import { client, chainAmoy, chainPolygon, chain, SUPPORTED_TOKENS } from "@/lib/thirdweb";
import dynamic from "next/dynamic";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import Link from "next/link";

const ConnectButton = dynamic(
    () => import("thirdweb/react").then((mod) => mod.ConnectButton),
    { ssr: false }
);

const wallets = [
    inAppWallet({
        auth: {
            options: ["google", "email", "apple"],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
];

const chains = [chainAmoy, chainPolygon];

export function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full glass px-4 py-3 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tighter text-sky-500">
                        MY LEAP
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <ConnectButton
                        client={client}
                        chains={chains}
                        theme={"light"}
                        wallets={wallets}
                        // Eliminamos detailsButton.displayBalanceToken para Amoy
                        // Esto permite que el SDK muestre POL (nativo) por defecto, solucionando el loop de carga.
                        supportedTokens={SUPPORTED_TOKENS}
                        accountAbstraction={{
                            chain: chain,
                            sponsorGas: true,
                        }}
                        connectButton={{
                            className: "rounded-full !bg-sky-500 !text-white overflow-hidden text-sm px-4 shadow-lg shadow-sky-100",
                            label: "Entrar",
                        }}
                        connectModal={{
                            size: "compact",
                            title: "Bienvenido a MY LEAP",
                            showThirdwebBranding: false,
                        }}
                    />
                </div>
            </div>
        </header>
    );
}
