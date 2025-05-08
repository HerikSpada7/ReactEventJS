import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Listar from "../../components/listar/Listar";

const Eventos = () =>{
    return(
        <>
        <Header/>
        
        <Listar
        tituloLista = "EVENTOS"
        nome= "Titulo"
        tipoEvento= "Tipo Evento"
        Infos= "Comentários"
        Infos2= "Participar"
        />

        <Footer/>
        </>
        
    )
}

export default Eventos;