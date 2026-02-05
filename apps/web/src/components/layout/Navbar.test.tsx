import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { expect, vi, it, describe } from 'vitest';

// Mock de Thirdweb ConnectButton ya que es complejo de testear unitariamente
vi.mock('thirdweb/react', () => ({
    ConnectButton: vi.fn(() => <button data-testid="connect-button">Entrar</button>),
}));

vi.mock('@/lib/thirdweb', () => ({
    client: {},
    chain: {},
}));

describe('Navbar', () => {
    it('debe renderizar el logo "MY LEAP"', () => {
        render(<Navbar />);
        expect(screen.getByText('MY LEAP')).toBeDefined();
    });

    it('debe renderizar el componente de conexión', () => {
        render(<Navbar />);
        expect(screen.getByTestId('connect-button')).toBeDefined();
    });
});
