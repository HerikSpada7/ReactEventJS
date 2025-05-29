import "./ListagemEventos.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/Comentario.svg"
import Check from "../../components/check/Check";

const ListagemEventos = () => {
    return (
        <>
            <Header 
            user="Aluno"
            botao_logar="none"
            />
            <main>
                <section className="layout_grid listagem_section">
                    <div className="titulo_listagem">
                        <h1>Eventos</h1>
                        <hr />
                    </div>

                    <div className="listagem_eventos">
                        <select name="eventos" id="">
                            <option value="" disabled selected>Todos os Eventos</option>
                            <option value="">???</option>
                            <option value="">???</option>
                            <option value="">???</option>
                        </select>
                    </div>

                    <div className="list">
                        <table>
                            <tr className="list_tabela">
                                <th>Titulo</th>
                                <th>Tipo Evento</th>
                                <th>Comentários</th>
                                <th>Participar</th>
                            </tr>

                            <tr className="list_presenca">
                                <td data-cell="Titulo"></td>
                                <td data-cell="Tipo Evento">Tipo Evento</td>
                                <td data-cell="Comentario"><img src={Comentario} alt="Comentário" /></td>
                                <td data-cell="Presenca"><Check/></td>
                            </tr>

                            <tr className="list_presenca">
                                <td data-cell="Titulo"></td>
                                <td data-cell="Tipo Evento">Tipo Evento</td>
                                <td data-cell="Comentario"><img src={Comentario} alt="Comentário" /></td>
                                <td data-cell="Presenca"><Check/></td>
                            </tr>
                        </table>
                    </div>
                </section>
            </main>
            <Footer
            visibilidade="none"
            />
        </>
    )
}

export default ListagemEventos;