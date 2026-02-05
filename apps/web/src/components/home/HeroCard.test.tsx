import { render, screen } from '@testing-library/react';
import { HeroCard } from './HeroCard';
import { expect, vi, it, describe, beforeEach } from 'vitest';
import * as thirdwebReact from 'thirdweb/react';

vi.mock('thirdweb/react', () => ({
    useActiveAccount: vi.fn(),
    useWalletBalance: vi.fn(),
}));

vi.mock('@/lib/thirdweb', () => ({
    client: {},
    chain: {},
    LEAP_TOKEN_ADDRESS: '0x123',
}));

describe('HeroCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('debe mostrar el saludo principal', () => {
        (thirdwebReact.useActiveAccount as any).mockReturnValue(undefined);
        (thirdwebReact.useWalletBalance as any).mockReturnValue({ data: null, isLoading: false });

        render(<HeroCard />);
        expect(screen.getByText(/Hola leaper!/i)).toBeDefined();
        expect(screen.getByText(/Sanación física y energética/i)).toBeDefined();
    });

    it('debe mostrar el balance cuando está conectado', () => {
        (thirdwebReact.useActiveAccount as any).mockReturnValue({ address: '0x123' });
        (thirdwebReact.useWalletBalance as any).mockReturnValue({
            data: { displayValue: '150.5' },
            isLoading: false
        });

        render(<HeroCard />);
        expect(screen.getByText('150.5')).toBeDefined();
        expect(screen.getByText('LEAP')).toBeDefined();
    });

    it('debe mostrar "0" si no hay balance y no está cargando', () => {
        (thirdwebReact.useActiveAccount as any).mockReturnValue({ address: '0x123' });
        (thirdwebReact.useWalletBalance as any).mockReturnValue({
            data: null,
            isLoading: false
        });

        render(<HeroCard />);
        expect(screen.getByText('0')).toBeDefined();
    });

    it('debe mostrar todos los botones de acción', () => {
        (thirdwebReact.useActiveAccount as any).mockReturnValue(undefined);
        (thirdwebReact.useWalletBalance as any).mockReturnValue({ data: null, isLoading: false });

        render(<HeroCard />);
        expect(screen.getByText('Sanadores')).toBeDefined();
        expect(screen.getByText('Cursos')).toBeDefined();
        expect(screen.getByText('Eventos')).toBeDefined();
    });
});
