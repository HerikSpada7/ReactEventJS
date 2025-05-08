import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";


const CadastroTipoUsuario = () =>{
    return(
        
        <>
        <Header/>
        
        <Cadastro
        tituloCadastro= "CADASTRO TIPO DE USUÁRIO"
        visibilidade = "none"
        inputzaum2 = "none"
        inputzaum3 = "none"
        yokoso = "none"
        nosoul = "none"
        />
        <hr />

        <Listar
        tituloLista = "LISTA TIPO DE USUÁRIO"
        nome= "Titulo"
        />

        <Footer/>
        </>
        
    )
}

export default CadastroTipoUsuario;