import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../services/Firebase.jsx";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const Cadastro = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password || !name) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuário autenticado:", userCredential.user);

            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                uid: userCredential.user.uid,
                createdAt: new Date().toISOString()
            });

            console.log("Dados salvos no Firestore");
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setError("Erro ao cadastrar: " + error.message);
        }
    };

    return (
        <div className="container">
            <h1>Cadastro</h1>
            {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}
            <form onSubmit={handleCadastro}>
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
};

export default Cadastro;