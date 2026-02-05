import { createThirdwebClient, defineChain } from "thirdweb";
import { polygon, polygonAmoy } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
    throw new Error("No client id provided in .env.local (NEXT_PUBLIC_THIRDWEB_CLIENT_ID)");
}

export const client = createThirdwebClient({
    clientId: clientId,
});

// --- REDES (Instancias Únicas) ---
// Usamos las definiciones oficiales para asegurar que los metadatos de moneda nativa (POL) sean correctos.
export const chainAmoy = defineChain(polygonAmoy);
export const chainPolygon = defineChain(polygon);

// Cadena por defecto (sincronizada con las instancias anteriores)
const defaultChainId = parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || "80002");
export const chain = defaultChainId === 137 ? chainPolygon : chainAmoy;

// --- TOKENS ---
export const TOKENS = {
    AMOY: {
        LEAP: "0xB63C2Ceda3461bd30b24Cd2ff355376637f8f48a" as `0x${string}`, // Contrato DEFINITIVO LEAPt (Amoy) confirmed by Benjai
        USDC: "0x8B0180f2101c8260d49339abfEe87927412494B4" as `0x${string}`, // Confirmada por Benjai (Amoy Faucet)
    },
    POLYGON: {
        LEAP: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        USDC: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" as `0x${string}`, // Nativo Circle Polygon
        USDT: "0xc2132D059Bc6f264f27AD288F897f540C6EBe8F" as `0x${string}`, // Oficial Tether Polygon
    }
};

// Eliminamos NATIVE_TOKEN_ADDRESS de aquí para que el SDK lo maneje de forma nativa y no intente cargarlo como ERC20.
export const SUPPORTED_TOKENS = {
    [chainAmoy.id]: [
        {
            address: TOKENS.AMOY.LEAP,
            name: "LEAP-test",
            symbol: "LEAPt",
        },
        {
            address: TOKENS.AMOY.USDC,
            name: "USDC",
            symbol: "USDC",
        },
    ],
    [chainPolygon.id]: [
        {
            address: TOKENS.POLYGON.USDC,
            name: "USDC",
            symbol: "USDC",
        },
        {
            address: TOKENS.POLYGON.USDT,
            name: "USDT",
            symbol: "USDT",
        },
    ],
};

export const LEAP_TOKEN_ADDRESS = chain.id === 137 ? TOKENS.POLYGON.LEAP : TOKENS.AMOY.LEAP;
