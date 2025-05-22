import Footer from "../../components/footer/Footer";
import Listar from "../../components/listar/Listar";
import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
const EventosListar = () => {
    return(
        <>
         <Header
         nomeUsuario = "Administrador"
         botaozinho = "none"
        />
        <Cadastro
        tituloCadastro= "Cadastro de Eventos"
        // visibilidade = "none"
        taveno = "none"
        // toveno = "none"
        tovenono = "none"
        />
        <Listar
        tituloLista = "Lista de Eventos"
        nomezin= "Eventos"
        // visibly = "none"
        editar = "Editar"
        />
        <Footer/>
        </>
    )
}
export default EventosListar;