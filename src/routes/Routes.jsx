import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import Eventos from "../pages/eventos/Eventos";

const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/CadastroTipoEvento" element={<CadastroTipoEvento/>}/>
            <Route path="/CadastroTipoUsuario" element={<CadastroTipoUsuario/>}/>
            <Route path="/Cadastroevento" element={<CadastroEvento/>}/>
            <Route path="/Eventos" element={<Eventos/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;