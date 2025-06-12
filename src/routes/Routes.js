import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/login/Login"
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario"
import Home from "../pages/home/Home"
import ListagemEventos from "../pages/listagemEventos/ListagemEventos";
import Lista from "../components/lista/Lista";

const Privado = (props) => {
    const { usuario } = useAuth();

    if(!usuario) {
        return <Navigate to="/" />;
    }

    if (usuario.TipoUsuarios !== props.tipoPermitido) {
        return <Navigate to="/" />;
    }
    
    return <props.Item/>;
}


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<Home/>} path="/" exact />
                <Route element = {<Login/>} path="/Login" exact />
                <Route element = {<ListagemEventos/>} path="/Evento" exact />
                <Route element = {<Privado tipoPermitido="Administrador" Item={CadastroTipoEvento} />} path="/CadastroTpEvento" exact />
                <Route element = {<Privado tipoPermitido="Administrador" Item={CadastroEvento} />} path="/CadastroEvento" exact />
                <Route element = {<Privado tipoPermitido="Administrador" Item={CadastroTipoUsuario} />} path="/CadastroTpUsuario" exact />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;