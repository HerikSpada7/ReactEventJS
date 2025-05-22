import "./Listar.css"
import Lixinho from "../../assets/img/Lixo.png"
import Lapizinho from "../../assets/img/Lapis.png"
const Listar = (props) => {
    return (
        <>
            <section className="listagem">
                <div className="layout_grid div_tabela">
                    <h1>{props.tituloLista}</h1>
                    <hr />

                    <div className="tabela">
                        <table>
                            <thead>
                                <tr className="table_cabecalho">
                                    <th>{props.nomezin}</th>
                                    <th style={{ display: props.visible }}>TipoEvento</th>
                                    <th>{props.edit}</th>
                                    <th style={{ display: props.visibly }}>Excluir</th>
                                    {/* <th id="sim" style={{display:props.acao}}>Ações</th> */}
                                </tr>
                            </thead>
                            <tbody> {/*Corpo da tabela*/}
                                {/*A parte de listagem se encontra aqui*/}
                                {props.lista && props.lista.length > 0 ? (
                                    props.lista.map((item) => (
                                        //Use console.log(item), para identificar o nome do id certinho caso esteja dando erro na requisição(é uma das possíveis soluções)
                                        
                                        <tr className="item_lista"
                                        key={props.tipoLista == "TiposEventos" ? item.TituloTipoEvento : ("Sem respostas...")}>
                                            <td data-cell={props.nomezin}>{props.tipoLista == "TiposEventos" ? item.tituloTipoEvento : ("Sem respostas...")}</td>
                                            <td style={{ display: props.visible }} data-cell="TiposEventos"></td>
                                            <td data-cell="Editar Ações"><img src={Lapizinho} alt="lapizin" onClick={() => props.editar(item)} style={{cursor:"pointer"}} /></td>
                                            <td data-cell="Excluir Ações"><img src={Lixinho} alt="lixin" onClick={() => props.deletar(item.idTipoEvento)} style={{cursor:"pointer"}} /></td>
                                        </tr>
                                    ))
                                ) :
                                    (
                                        <p>Sem respostas...</p>
                                    )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Listar;
