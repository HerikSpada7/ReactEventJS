import "./Cadastro.css"
import Botao from "../botao/Botao";

const Cadastro = (props) => {
    return (
        <section className="layout_grid section_cadastro">
            <div className="cadastro_titulo">
                <h1>{props.titulo_cadastro}</h1>
                <hr />
            </div>

            <form onSubmit={props.funcCadastro} className="form_cadastro">
                <div className="img_cadastro">
                    <img src={props.banner_img} alt="Imagem do Cadastro" />
                </div>

                <div className="campos_cadastro">

                    <div className="campo_cad_nome">
                        <input
                            placeholder={props.campo_placeholder}
                            value={props.valorInput}
                            onChange={(e) => props.setValorInput(e.target.value)}
                        />
                    </div>

                    <div className="campo_cad_nome">
                        <input
                            style={{ display: props.visibili_data }}
                            type="date"
                            value={props.valorData}
                            onChange={(e) => props.setValorData(e.target.value)}
                        />
                    </div>

                    <div className="campo_cad_eventos" style={{ display: props.visibili_tipo_evento }}>
                        <select name="Tipo Evento"
                            value={props.valorTipoEvento}
                            onChange={(e) => props.setValorTipoEvento(e.target.value)}
                        >
                            <option disabled value="">Tipo Evento</option>
                            {props.lista &&
                                props.lista.length > 0 &&
                                props.lista.map((itemTipoEvento) =>
                                    <option
                                        key={itemTipoEvento.idTipoEvento}
                                        value={itemTipoEvento.idTipoEvento}
                                    >
                                        {itemTipoEvento.tituloTipoEvento}
                                    </option>
                                )}

                        </select>
                    </div>

                    <div className="campo_cad_eventos" style={{ display: props.visibili_instituicao }}>
                        <select name="Instituicao"
                            value={props.valorInstituicao}
                            onChange={(e) => props.setValorInstituicao(e.target.value)}
                        >
                            <option selected>Murkoff Corporation</option>
                            <option selected>QG World Marshall</option>
                            <option selected>Senai</option>
                        </select>
                    </div>

                    <div className="campo_cad_nome">
                        <input
                            type="text"
                            placeholder={props.campo_descricao}
                            value={props.valorInputDescricao}
                            style={{ display: props.visibili_descricao }}

                            onChange={(e) => props.setValorInputDescricao(e.target.value)}
                        />
                    </div>
                    <Botao botao={props.botao} />
                </div>
            </form>
        </section>
    )
}

export default Cadastro;