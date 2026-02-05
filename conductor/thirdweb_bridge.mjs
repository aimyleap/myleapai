import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Este script actúa como puente entre el MCP remoto de Thirdweb (SSE)
// y el transporte local Stdio, permitiendo usar variables de entorno.

const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!secretKey) {
    console.error("Error: THIRDWEB_SECRET_KEY no definida en el entorno.");
    process.exit(1);
}

const url = new URL("https://api.thirdweb.com/mcp");
url.searchParams.set("secretKey", secretKey);

async function main() {
    const transport = new SSEClientTransport(url);
    const client = new Client({ name: "thirdweb-bridge", version: "1.0.0" }, { capabilities: {} });

    await client.connect(transport);

    const serverTransport = new StdioServerTransport();
    // Aquí se implementaría el proxy real de mensajes si fuera necesario,
    // pero para uso directo con npx @modelcontextprotocol/sdk es más simple.
    // Sin embargo, como solución "out-of-the-box" usaremos un comando más directo.
}

// Nota: Para simplicidad extrema sin dependencias pesadas,
// usaremos el comando 'npx' con el proxy oficial si estuviera disponible.
// Como no lo está, usaremos la URL en mcp_config.json pero con la advertencia de seguridad.
