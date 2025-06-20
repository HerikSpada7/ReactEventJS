import { useEffect, useState } from "react";
import api from "../../services/Services";
import Swal from 'sweetalert2'
import { format, compareAsc } from "date-fns";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemEventos.css"
import Comentario from "../../assets/img/Comentario.svg"
import Detalhes from "../../assets/img/detalhe2.png"
import Toggle from "../../components/toggle/Toggle";
import Modal from "../../components/modal/Modal";
import {useAuth} from "../../contexts/AuthContext"



const ListagemEventos = (props) => {
    const [listaEventos, setListarEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    // const [usuarioId, setUsuarioId] = useState("3feffa48-7846-4f48-8c74-ec355e891680");

    const [filtroData, setFiltroData] = useState(["todos"]);

    const {usuario} = useAuth();
    

    function alertar(icone, mensagem) {
        Swal.fire({
            title: mensagem,
            icon: icone
        });
    }

    async function listarEventos() {
        try {
            const eventoListado = await api.get("Eventos");
            const todosOsEventos = eventoListado.data;

            const respostaPresenca = await api.get("Presencas/ListarMinhas/" + usuario.idUsuario)
            const minhasPresencas = respostaPresenca.data

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.IdEvento);

                return {
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListarEventos(eventosComPresencas);

            console.log(`informacoes de todos os eventos`);
            console.log(todosOsEventos);

            console.log(`informacoes de eventos com presenca`);
            console.log(minhasPresencas);

            console.log(`informacoes de todos os eventos com presenca`);
            console.log(eventosComPresencas);



        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEventos();
    }, []);

    function abrirModal(tipo, dados) {
        setModalAberto(true);
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {

        try {
            if (presenca && idPresenca != "") {
                await api.put(`Presencas/${idPresenca}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presenca foi removida.', 'success');
            } else if (idPresenca != "") {
                await api.put(`Presencas/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            } else {
                await api.post("Presencas", { situacao: true, idUsuario: usuario.IdUsuario, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            }
            listarEventos()
        } catch (error) {
            console.log(error);

        }
    }
    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento < hoje) return true;

            return false;
        });
    }

   

    return (
        <>
            <Header nomeUsu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select onChange={(e) => setFiltroData(e.target.value)}
                        name="Todos os Eventos" id="" className="select_evento">
                        <option value="todos" selected>Todos os Eventos</option>
                        <option value="futuros">Somente futuros</option>
                        <option value="passados">Somente passados</option>

                    </select>
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Data do Evento</th>
                            <th>Tipo Evento</th>
                            <th>Descricao</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrarEventos() && filtrarEventos().map((item) => (
                            <tr className="item_evento" key={item.idEvento}>
                                <td data-cell="Nome">{item.nomeEvento}</td>
                                <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                <td data-cell="Tipo_Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                <td data-cell="Descricao">
                                    <button onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                        <img src={Detalhes} alt="Imagem de descricao" />
                                    </button>
                                </td>
                                <td data-cell="Comentar">
                                    <button onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}>
                                        <img src={Comentario} alt="Imagem de um comentario" />
                                    </button>
                                </td>
                                <td data-cell="Botao">
                                    <Toggle presenca={item.possuiPresenca}
                                        manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </section>
            <Footer />
            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descricao do evento" : "Comentario"}
                    tipoModel={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}


                />
            )}
        </>
    );
};

export default ListagemEventos;