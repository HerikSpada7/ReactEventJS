import"./ListarEvento.css"
import comentarioEvento from "../../assets/img/comentarioEvento.png"

const Listar = (props) =>{
    return(
        <>
        <section className="layout-grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />
                <div className="tabela">    
                    <table>
                        <thead>
                            <tr className="table_cabecalho">
                                <th>{props.nome}</th>
                                <th>{props.tipoEvento}</th>
                                <th style={{display:props.visible}}></th>
                                <td></td>
                                <th>Comentários</ th>
                                <th>Participar</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr className="item_lista">
                                    <td data-cell={props.nome}>Nome Evento</td>
                                    <td data-cell={props.tipoEvento}>Tipo Evento</td>
                                    <td></td>
                                    <td></td>
                                    <td data-cell="Comentários"><img src={comentarioEvento} alt="comentarios" /></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
        </section>
        </>
    )
}
export default Listar;