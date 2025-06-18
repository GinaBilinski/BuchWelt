import { useState } from 'react';
import { auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

type Props = {
  onClose: () => void;
};

export function AuthModal({ onClose }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCred.user.uid), {
          email,
          firstName,
          lastName,
          createdAt: new Date(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      onClose(); // nur wenn erfolgreich
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isRegister ? 'Registrieren' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="modal-button" type="submit">
            {isRegister ? 'Konto erstellen' : 'Einloggen'}
          </button>
        </form>

        <p>
          {isRegister ? 'Schon registriert?' : 'Noch kein Konto?'}{' '}
          <span className="modal-toggle" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Zum Login' : 'Registrieren'}
          </span>
        </p>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
