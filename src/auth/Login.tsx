import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? 'Registrieren' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Passwort" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{isRegister ? 'Registrieren' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Schon registriert? Login' : 'Noch kein Konto? Jetzt registrieren'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
