import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";
import Footer from "../../components/footer/Footer";
const TipoUsuario = () => {
    return (
        <>
            <Header
                nomeUsuario="Administrador"
                botaozinho="none"
            />
            <Cadastro
                tituloCadastro="Cadastro de Tipo Usuario"
                visibilidade="none"
                toveno="none"
                tovenono="none"
            />
            <Listar
                tituloLista="Lista de Tipos Usuarios"
                nomezin="Tipo Usuarios"
                visible="none"
                editar="Editar"
            />
            <Footer />
        </>
    )
}
export default TipoUsuario;