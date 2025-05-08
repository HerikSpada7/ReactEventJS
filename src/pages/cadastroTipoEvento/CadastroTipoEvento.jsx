import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";


const CadastroTipoEvento = () =>{
    return(
        
        <>
        <Header/>
        
        <Cadastro
        tituloCadastro= "CADASTRO TIPO DE EVENTO"
        visibilidade = "none"
        inputzaum2 = "none"
        inputzaum3 = "none"
        watashi = "none"
        nosoul = "none"
        />
        <hr />

        <Listar
        tituloLista = "LISTA TIPO DE EVENTO"
        nome= "Titulo"
        />

        <Footer/>
        </>
        
    )
}

export default CadastroTipoEvento;