import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <style></style>
            <h2>Error</h2>
            <p>Houve um erro ao processar sua solicitação! Tente novamente</p>
            <button onClick={() => navigate("/")}>Voltar para a página de Login</button>
        </div>

    )
};

export default ErrorPage;