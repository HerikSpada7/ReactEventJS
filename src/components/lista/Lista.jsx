import "./Lista.css"
import Editar from "../../assets/img/Editar.svg"
import Detalhes from "../../assets/img/detalhes.png"
import Excluir from "../../assets/img/Excluir.svg"

const Lista = (props) => {
    return (
        <section className="listagem">
            <h1>{props.titulo}</h1>
            <hr />

            <div className="tabela">
                <thead>
                    <tr className="table_cabecalho">
                        <th>{props.tituloEvento}</th>
                        <th style={{ display: props.DataEvent }}>Data Evento</th>
                        <th>{props.nomeEvento1}</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                        <th style={{ display: props.Desc2 }}>Descrição</th>
                    </tr>
                </thead>
                {props.lista && props.lista.length > 0 ? (
                    props.lista.map((item) => (
                        <tbody>
                            <tr className="item_lista" key={props.tipoLista == "TiposEventos" ? item.idTipoEvento : (props.tipoLista == "tiposUsuarios" ? item.idTipoUsuario : item.idEvento)}>
                                <td data-cell="Nome" >
                                    {props.tipoLista == "TiposEventos" ? item.tituloTipoEvento : (props.tipoLista == "tiposUsuarios" ? item.tituloTipoUsuario : item.nomeEvento)}
                                </td>
                                <td data-cell="Data" style={{ display: props.ListaData }}>
                                    {item.dataEvento}
                                </td>
                                <td data-cell="Evento">{item.tiposEvento?.tituloTipoEvento}</td>
                                <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" onClick={() => { props.funcEditar(item) }} style={{ cursor: "pointer" }} /></td>
                                <td data-cell="Excluir">
                                    <img
                                        src={Excluir}
                                        alt="Lixeira"
                                        onClick={() => (props.deletar(item))}
                                        style={{ cursor: "pointer" }}
                                    />
                                </td>
                                <td data-cell="Descrição" style={{ display: props.Desc1 }}>
                                    <img
                                        src={Detalhes}
                                        alt="Detalhes"
                                        onClick={() => props.descricao(item)}
                                        style={{ cursor: "pointer" }} />
                                </td>
                            </tr>
                        </tbody>
                    ))
                ) :
                    (
                        <p>Nenhum Tipo de Evento Encontrado.</p>
                    )
                }
            </div>
        </section>
    )
}

export default Lista;