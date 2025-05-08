import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";


const CadastroEvento = () =>{
    return(
        <>
        <Header/>
        
        <Cadastro
        tituloCadastro= "CADASTRO DE EVENTO"
        visibilidade = "none"
        inputzaum1 = "none"
        watashi = "none"
        yokoso = "none"
        />
        <hr />

        <Listar
        tituloLista = "LISTA DE EVENTOS"
        nome= "Titulo"
        tipoEvento= "Tipo Evento"
        />

        <Footer/>
        </>
        
    )
}

export default CadastroEvento;