// Login.mock.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthModal } from '../components/AuthModal';
import { vi } from 'vitest';

// Firebase Auth mocken
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual<typeof import('firebase/auth')>('firebase/auth');
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(() =>
      Promise.resolve({
        user: { uid: 'mocked-user-id' },
      })
    ),
  };
});

describe('AuthModal – Login mit Mock', () => {
  it('loggt Benutzer erfolgreich ein (Mock)', async () => {
    const handleClose = vi.fn();

    render(<AuthModal onClose={handleClose} />);

    // Eingabefelder ausfüllen
    fireEvent.change(screen.getByPlaceholderText('E-Mail'), {
      target: { value: 'mockuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Passwort'), {
      target: { value: 'geheimespasswort' },
    });

    // Button klicken
    fireEvent.click(screen.getByRole('button', { name: /einloggen/i }));

    // Warten bis handleClose aufgerufen wird
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
