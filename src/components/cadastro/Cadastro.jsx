import Botao from "../botao/Botao";
import "./Cadastro.css"
import imagem from "../../assets/img/more.png"
import imagem2 from "../../assets/img/Imagem2.png"
import imagem3 from "../../assets/img/Imagem3.png"
const Cadastro = (props) => {
    return (
        <>
            <section className="section_cadastro">
                <form onSubmit={props.funcCadastro} className="layout-grid form_cadastro">

                    <h1>{props.tituloCadastro}</h1>
                    <hr />
                    <div className="cadastro_pai">
                    <div className="banner_cadastro" style={{display:props.tovenono}}><img src={imagem} alt="Imagem" /></div>
                    <div className="banner_cadastro"style={{display:props.toveno}}><img src={imagem2} alt="Imagem" /></div>
                    <div className="banner_cadastro" style={{display:props.taveno}} ><img src={imagem3} alt="Imagem" /></div>

                    <div className="campos_cadastros">
                        <div className="campo_cad_nome">
                            <input placeholder={`${props.placeholder}`}
                            value={props.valorInput}
                            onChange={(e)=> props.setValorInput(e.target.value)}
                            />
                        </div>

                        <div className="campo_cad_tipo" style={{ display: props.visibilidade }}>
                            <select name="TipoEvento" id="">
                                <option value="">Games</option>
                                <option value="">Animes</option>
                                <option value="">Series</option>
                                <option value="">Filmes</option>
                            </select>
                        </div>
                        <Botao nomeDoBotao="Cadastrar" />
                    </div>

                    </div>


                </form>
            </section>
        </>
    )
}
export default Cadastro;