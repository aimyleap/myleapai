import { describe, it, expect } from 'vitest';
import { client, chain, LEAP_TOKEN_ADDRESS } from './thirdweb';

describe('Thirdweb Infrastructure Integration', () => {
    it('debe tener un cliente inicializado', () => {
        expect(client).toBeDefined();
        expect(client.clientId).toBeDefined();
    });

    it('debe estar configurado para Polygon Amoy (ID 80002)', () => {
        expect(chain).toBeDefined();
        expect(chain.id).toBe(80002);
    });

    it('debe tener la dirección del token LEAP correcta', () => {
        expect(LEAP_TOKEN_ADDRESS).toBe('0x89e0A43d5440F66Ab3e74Ad8B0925B3dEA704Be3');
    });
});
