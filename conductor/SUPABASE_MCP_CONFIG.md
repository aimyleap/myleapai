# Configuración del Supabase MCP (Model Context Protocol)

Esta guía explica cómo configurar el canal de comunicación directa entre los agentes de IA y tu proyecto de Supabase.

## 1. Generar Personal Access Token (PAT)
1. Ve al [Dashboard de Supabase](https://supabase.com/dashboard/account/tokens).
2. Haz clic en **Generate new token**.
3. Ponle un nombre (ej. `antigravity-mcp`).
4. **Copia el token**, ya que no podrás verlo de nuevo.

## 2. Configurar en Claude Desktop / Cursor
Para habilitar el MCP, debes añadir la siguiente configuración en tu archivo de configuración de MCP (usualmente `claude_desktop_config.json` o la sección de MCP en Cursor).

### Comando para Windows
```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd /c npx -y @supabase/mcp-server-supabase@latest --access-token=TU_PAT_AQUI"
    }
  }
}
```

> [!TIP]
> Puedes añadir `--project-ref TU_PROYECTO` si quieres limitar el MCP a un solo proyecto.

## 3. Beneficios Técnicos
- **Ejecución SQL Directa:** Los agentes pueden crear tablas, insertar datos y ejecutar migraciones sin que tengas que copiar y pegar código en el SQL Editor.
- **Inspección de Esquema:** Los agentes pueden "entender" tu base de datos en tiempo real para escribir consultas precisas.
- **Gestión de Storage y Auth:** Comunicación directa para configurar políticas de RLS y buckets de almacenamiento.

---
*Configuración preparada para MY LEAP por el Orquestador Maestro*
