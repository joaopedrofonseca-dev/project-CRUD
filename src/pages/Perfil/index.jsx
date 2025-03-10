import { useState, useEffect } from "react";
import { auth, db } from '../../services/Firebase.jsx';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { signOut, updateEmail, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './style.css';

const Perfil = () => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);  
                fetchUserData(currentUser); o
            } else {
                setUser(null); 
                setUserData(null);  
            }
        });

        
        return () => unsubscribe();
    }, []);

    
    const fetchUserData = async (currentUser) => {
        if (currentUser) {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            }
        }
    };

    const handleSair = async () => {
        if (user) {
            await signOut(auth);
            navigate("/");
        }
    };

    const handleExcluir = async () => {
        if (user) {
            await deleteDoc(doc(db, "users", user.uid));
            await user.delete();
            alert("Conta excluída com sucesso");
            navigate("/cadastro");
        }
    };

    const handleUpdateName = async () => {
        if (user) {
            const newName = prompt("Digite seu novo nome:", userData.name);
            if (newName) {
                await updateDoc(doc(db, "users", user.uid), { name: newName });
                setUserData((prev) => ({ ...prev, name: newName }));
            }
        }
    };

    const handleEmailUpdate = async () => {
        if (user) {
            const newEmail = prompt("Digite seu novo email:", user.email);
            if (newEmail) {
                try {
                    await updateEmail(user, newEmail);
                    await updateDoc(doc(db, "users", user.uid), { email: newEmail });
                    setUserData((prev) => ({ ...prev, email: newEmail }));
                    alert("Email atualizado com sucesso!");
                } catch (error) {
                    alert("Erro ao atualizar email: " + error.message);
                }
            }
        }
    };

    const handleUpdatePassword = async () => {
        if (user) {
            const newPassword = prompt("Digite sua nova senha:");
            if (newPassword) {
                try {
                    await updatePassword(user, newPassword);
                    alert("Senha atualizada com sucesso!");
                } catch (error) {
                    alert("Erro ao atualizar senha: " + error.message);
                }
            }
        }
    };

    return (
        <div className="perfil">
            <h1>Perfil</h1>
            {userData ? (
                <>
                    <p>Nome: {userData.name}</p>
                    <p>E-mail: {userData.email}</p>
                    <div className="buttons">
                        <button onClick={handleUpdateName}>Atualizar nome</button>
                        <button onClick={handleEmailUpdate}>Atualizar E-mail</button>
                        <button onClick={handleUpdatePassword}>Atualizar Senha</button>
                        <button onClick={handleSair}>Sair</button>
                        <button onClick={handleExcluir}>Excluir conta</button>
                    </div>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Perfil;