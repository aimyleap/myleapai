# Arquitectura Técnica: MY LEAP

## 💎 1. Capa de Aplicación (Frontend/UX)
- **Framework**: Next.js 15 (App Router).
- **Estilo**: Basado en `ui_design_spec.md` (Limpio, moderno, centrado en Hero Card).
- **Navegación**: Tab Bar inferior + Hero Dashboard.
- **Wallet Connect**: Thirdweb Connect SDK (Email/Google) integrado en el balance de la Hero Card.

## ⛓️ 2. Capa Blockchain (Interoperabilidad)
- **Polygon (Main)**:
    - Smart Wallets (ERC-4337).
    - Paymaster (Gasless): La plataforma paga el gas.
    - Token LEAP (ERC-20).
- **Solana (Community)**:
    - Pump.fun Bridge/Integration para visibilidad y liquidez inicial.

## 📊 3. Capa de Datos y Conocimiento
- **Memoria Cuántica**: Consultas a NotebookLM vía MCP para respuestas especializadas.
- **Backend**: Node.js / Prisma para gestión de Cursos y Eventos (Metadata off-chain).

## 🔄 4. Flujo del Usuario "Sin Mareos"
1. El usuario entra e inicia sesión con su **Email**.
2. Se le crea una **Smart Wallet** automáticamente en Polygon (Invisble para él).
3. Compra o recibe tokens LEAP (transferencia o swap).
4. Accede a un curso. La firma de la transacción es automática y **gratis**.
