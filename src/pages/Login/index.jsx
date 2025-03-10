import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from '../../services/Firebase.jsx';
import './style.css';
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/perfil")
    } catch {
      setError("Erro ao efetuar Login. Verifique seus dados e tente novamente.");
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <p style={{ color: "red", margin: "0 10px", textAlign:"center"}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        <Link to="/cadastro">Cadastrar</Link>
      </form>
    </div>
  );
};

export default Login;