# Plan de Ejecución: MY LEAP MVP

Este plan detalla las tareas para revisar estado actual y construir la interfaz móvil de MY LEAP integrando la economía del token LEAP via Thirdweb.

## 🛠️ Fase 1: Setup del Proyecto & Infraestructura
- [x] Inicializar proyecto Next.js 15 con TypeScript y Tailwind CSS.
- [x] Configurar el SDK de Thirdweb para Polygon Amoy.
- [x] Configurar el Paymaster (Gasless) en el dashboard de Thirdweb (Configurado en .env.local).
- [x] Definir el contrato del Token LEAP (Referenciado en plan para Amoy).

## 🎨 Fase 2: Desarrollo del Frontend (Mobile-First)
- [x] Implementar el Layout base (Header, Tab Bar inferior).
- [x] Construir la **Hero Card**:
    - [x] Widget de saludo dinámico.
    - [x] Integración de `useBalance` de Thirdweb para mostrar saldo LEAP.
    - [x] Grid de botones (Cursos, Eventos, Sanadores).
- [x] Implementar secciones informativas:
    - [x] Carrusel de Testimonios.
    - [x] Sección de Comunidad (Botones RRSS).
    - [x] Feed de Noticias/Eventos.

## ⛓️ Fase 3: Integración Web3 & Autenticación
- [x] Implementar Login Social (Email/Google) con Smart Wallets.
- [x] Sincronizar billetera con perfiles de Supabase (`profiles`).
- [x] Validar el flujo de transacciones gasless (Configurado en ConnectButton).

## ✅ Fase 4: Verificación & Calidad
- [x] Pruebas unitarias de componentes UI.
- [x] Pruebas de integración de billetera.
- [x] Revisión final de diseño vs imagen de referencia.

---
**Responsable Principal**: Orquestador Maestro Benjai
**Modo**: Subagent-Driven Development + MCP servers Supabase y Thirdweb
