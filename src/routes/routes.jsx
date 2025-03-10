import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import ErrorPage from "../pages/Error";
import Perfil from '../pages/Perfil';

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<Cadastro/> } />
                <Route path="/perfil" element={<Perfil />} />
                
                <Route path="*" element={<ErrorPage/>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;