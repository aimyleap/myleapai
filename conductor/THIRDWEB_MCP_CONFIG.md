# Configuración del Thirdweb MCP (Model Context Protocol)

Esta guía explica cómo habilitar el MCP remoto de Thirdweb para que los agentes operen sobre blockchain (wallets, smart contracts, transacciones).

> [!IMPORTANT]
> **¿Por qué dos configuraciones?**
> 1. **`.env.local`**: Permite que tu **Web App** (el código que verán los usuarios) funcione.
> 2. **Configuración MCP**: Permite que la **IA** (Antigravity/Cursor) tenga "poderes" para ayudarte a programar y gestionar la blockchain directamente.
> 
> **Debes agregar el Secret Key en ambos sitios.**
2. Crea una nueva API Key si no tienes una.
3. Copia el **Secret Key** (Nota: No se puede recuperar después).

## 2. Configuración para Windows (Claude Desktop / Cursor)
El MCP de Thirdweb es un **endpoint remoto (URL)**, lo que facilita su configuración sin necesidad de instalar paquetes locales complejos.

Añade esto a tu archivo de configuración de MCP (`claude_desktop_config.json` o settings de Cursor):

```json
{
  "mcpServers": {
    "thirdweb": {
      "url": "https://api.thirdweb.com/mcp?secretKey=TU_SECRET_KEY_AQUI"
    }
  }
}
```

## 3. Capacidades Web3 Habilitadas
Con este MCP, los agentes pueden:
- **Gestión de Wallets:** Listar y crear "Server Wallets" para automatizar transacciones.
- **Contratos:** Listar tus contratos desplegados e interactuar con ellos (read/write).
- **Tokens y NFTs:** Consultar balances y enviar activos.
- **Transacciones Gasless:** Facilitar la orquestación de pagos sin gas mediante los servicios de Thirdweb.

> [!IMPORTANT]
> Nunca compartas tu Secret Key. Si se ve comprometida, revócala inmediatamente en el dashboard.

---
*Configuración preparada para MY LEAP por el Orquestador Maestro*
