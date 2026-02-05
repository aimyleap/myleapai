# Documentación de Redes y Tokens (Web3)

Este documento detalla la configuración de red y las direcciones de los contratos de los tokens utilizados en el ecosistema MY LEAP.

## Configuración de Redes

Las redes están configuradas en `lib/thirdweb.ts`.

| Red | Chain ID | Tipo |
|-----|----------|------|
| Polygon (Mainnet) | 137 | Producción |
| Amoy (Testnet) | 80002 | Testing/Desarrollo |

## Directorio de Tokens

Para añadir un nuevo token, debes actualizar el objeto `TOKENS` en `lib/thirdweb.ts`.

### Polygon Amoy (Testnet)

| Token | Símbolo | Dirección del Contrato |
|-------|---------|------------------------|
| LEAP Token | LEAP | `0x89e0A43d5440F66Ab3e74Ad8B0925B3dEA704Be3` |
| USD Coin | USDC | `0x41E94E4057A0d75a133604fE564F4278403d7582` |
| Tether USD | USDT | `0xF6243A3060879e5822269dBa912d357f6629A24a` |

### Polygon (Mainnet)

| Token | Símbolo | Dirección del Contrato |
|-------|---------|------------------------|
| USD Coin | USDC | `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` |
| Tether USD | USDT | `0xc2132D059Bc6f264f27AD288F897f540C6EBe8F` |
| LEAP Token | LEAP | `TBD` |

## Cómo añadir un nuevo Token o Red

1. **Localizar `lib/thirdweb.ts`**.
2. **Actualizar el objeto `TOKENS`**: Añade la nueva dirección bajo la red correspondiente.
3. **Actualizar `TOKENS_METADATA`** (opcional): Si necesitas iconos o nombres personalizados.
4. **Exportar**: Si es un token principal (como LEAP), asegúrate de actualizar la constante `LEAP_TOKEN_ADDRESS` si cambia.

---
> [!TIP]
> Para pruebas en Amoy, puedes usar el faucet oficial de Polygon para obtener tokens de gas (POL) y luego interactuar con los contratos mencionados.
