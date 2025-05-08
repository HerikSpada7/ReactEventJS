import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import TipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import Eventos from "../pages/cadastroEvento/CadastroEvento";

const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>

            <Route path="/Login" element={<Login/>}/>
            {/* <Route path="/Tipoevento" element={<TipoEvento/>}/>
            <Route path="/Tipousuario" element={<TipoUsuario/>}/>
            <Route path="/Cadastroevento" element={<Eventos/>}/> */}

        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;