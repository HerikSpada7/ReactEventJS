import { useEffect, useState } from "react";
import api from "../../services/Services";
import Modal from "../../components/modal/Modal";

import "./ListagemEventos.css"

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import Comentario from "../../assets/img/Comentario.svg"
import Informacao from "../../assets/img/Informacao.svg"
import Toggle from "../../components/toggle/Toggle";
import Swal from "sweetalert2";

const ListagemEventos = () => {
    const [listaEventos, setListaEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioId, setUsuarioId] = useState("be45dd69-63a9-423f-9acb-bfbdeee1d646")

    const [filtroData, setFiltroData] = useState("")

 async function listarEventos() {
        try {
            const resposta = await api.get("Eventos");
            const todosOsEventos = resposta.data;
            const respostaPresencas = await api.get("Presencas/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresencas.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => { 
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return{
                    ...atualEvento,

                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListaEvento(eventosComPresencas)

            
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    }

    
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
    
    async function manipularPresenca(idEvento, presenca, idPresenca){
        try {
            if(presenca && idPresenca != ""){
                await api.put(`Presencas/${idPresenca}`, { situacao: false})
                Swal.fire('Removido', 'Sua presença foi removida.', 'success');

            }else if(idPresenca != ""){
                await api.put(`Presencas/${idPresenca}`, { situacao: true});
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success')

            }else{
                await api.post("Presencas", { situacao: true, idUsuario: usuarioId, idEvento: idEvento})
            }
        } catch (error) {
            Swal.fire('Error!', 'Não foi possivel atualizar a sua presença', 'error')
        }
    }

    function filtrarEventos(){
        const hoje = new Date();


        return listaEventos.filter(evento => {
            
        const dataEvento = new Date(evento.dataEvento);

        if(filtroData.includes("todos")) return true;

        if(filtroData.includes("futuros") && dataEvento > hoje) return true;

        if(filtroData.includes("passados") && dataEvento < hoje) return true;

        return false;

        });
        
    }
    
    useEffect(() => {
        listarEventos();
    }, [])

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
                        <select onChange={(e) => setFiltroData([e.target.value])}>
                            <option value="todos" selected>Todos os eventos</option>
                            <option value="futuros">Somente futuros</option>
                            <option value="passados">Somente passados</option>
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
                                            manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}
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