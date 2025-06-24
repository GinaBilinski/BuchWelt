// Login.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthModal } from '../components/AuthModal';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

describe('AuthModal – Firebase Login Integration', () => {
  beforeEach(async () => {
    await signOut(auth); // vorher ausloggen, falls noch angemeldet
  });

  it('loggt bestehenden Testnutzer erfolgreich ein', async () => {
    const handleClose = vi.fn(); // Modal-Schließen simulieren

    render(<AuthModal onClose={handleClose} />);

    // 1. E-Mail und Passwort eingeben
    fireEvent.change(screen.getByPlaceholderText('E-Mail'), {
      target: { value: 'ginabilinski@web.de' },
    });
    fireEvent.change(screen.getByPlaceholderText('Passwort'), {
      target: { value: '123456gb' },
    });

    // 2. Button klicken
    fireEvent.click(screen.getByRole('button', { name: /einloggen/i }));

    // 3. Prüfen ob Modal geschlossen wurde → bedeutet: Login erfolgreich
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
