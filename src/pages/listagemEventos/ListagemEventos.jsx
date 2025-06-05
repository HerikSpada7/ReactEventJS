import { useEffect, useState } from "react";
import api from "../../services/Services";
import Modal from "../../components/modal/Modal";

import "./ListagemEventos.css"

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import Comentario from "../../assets/img/Comentario.svg"
import Informacao from "../../assets/img/Informacao.svg"
import Toggle from "../../components/toggle/Toggle";

const ListagemEventos = () => {
    const [listaEventos, setListaEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioId, setUsuarioId] = useState("be45dd69-63a9-423f-9acb-bfbdeee1d646")

    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos");
            const todosOsEventos = resposta.data;
            
            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/"+usuarioId)  
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return{
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true, idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListaEventos(eventosComPresencas);

            console.log(`Informações de todos os eventos:${todosOsEventos}`)

            console.log(`Informações de eventos com presenca:${minhasPresencas}`)

            console.log(`Informações de todos os eventos com presenca:${eventosComPresencas}`)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEventos();
    }, [])

    function abrirModal(tipo, dados) {
        //Tipo de modal
        //dados
        setModalAberto(true);
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal(){
        setModalAberto(false)
        setDadosModal({})
        setTipoModal("")
    }

    async function manipularPresenca(){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

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
                        <select name="eventos">
                            <option value="" disabled selected>Todos os Eventos</option>
                            <option value="">xxxxxxxx</option>
                        </select>
                    </div>

                    <div className="list">
                        <table>
                            <thead>
                                <tr className="list_tabela">
                                    <th>Titulo</th>
                                    <th>Data do Evento</th>
                                    <th>Tipo Evento</th>
                                    <th>Descrição</th>
                                    <th>Comentários</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaEventos.length > 0 ? (
                                    listaEventos.map((item) => (
                                        <tr className="list_presenca">
                                            <td data-cell="Titulo">{item.nomeEvento}</td>
                                            <td data-cell="Data do Evento">{new Date(item.dataEvento).toLocaleDateString('pt-BR')}</td>
                                            <td data-cell="Tipo Evento">{item.tiposEvento.tituloTipoEvento}</td>

                                            <td data-cell="Descricao">
                                                <img src={Informacao}
                                                    alt="Exclamação de Descrição"
                                                    onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}
                                                />
                                            </td>

                                            <td data-cell="Comentario">
                                                <img src={Comentario}
                                                    alt="Comentário"
                                                    onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}
                                                />
                                            </td>

                                            <td data-cell="Presenca">
                                            <Toggle 
                                            presenca={item.possuiPresenca}
                                            />
                                            </td>
                                        </tr>
                                    ))
                                ) :
                                    (
                                        <p>Sem resposta...</p>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer visibilidade="none" />

            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do evento" : "Comentário"}
                    tipoModel = {tipoModal}
                    idEvento = {dadosModal.idEvento}
                    descricao = {dadosModal.descricao}
                    fecharModal = {fecharModal}
                />
            )}
        </>
    );
}

export default ListagemEventos;