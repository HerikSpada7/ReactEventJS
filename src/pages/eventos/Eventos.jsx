import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ListarEvento from "../../components/listarEvento/ListarEvento";

const Eventos = () =>{
    return(
        <>
        <Header/>
        <ListarEvento
        tituloLista = "EVENTOS"
        nome= "Titulo"
        tipoEvento= "Tipo Evento"
        />
        <Footer/>
        </>
        
    )
}

export default Eventos;