import"./Listar.css"
import Lixo from "../../assets/img/Lixo.png"
import Lapis from "../../assets/img/Lapis.png"

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
                                <th>{props.Infos}</ th>
                                <th>{props.Infos2}</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                                <tr className="item_lista">
                                    <td data-cell={props.nome}></td>
                                    <td></td>
                                    <td></td>
                                    <td data-cell="Editar"><img src={Lapis} alt="lapis" /></td>
                                    <td data-cell="Excluir"><img src={Lixo} alt="lixo" /></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
        </section>
        </>
    )
}
export default Listar;