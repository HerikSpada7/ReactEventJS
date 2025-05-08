import "./Cadastro.css"
import Botao from "../botao/Botao";
import tipoevento from "../../assets/img/tipoevento.png"
import evento from "../../assets/img/evento.png"    
import tipousuario from "../../assets/img/tipousuario.png"

const Cadastro = (props) => {
    return (
        <>
            <section className="section_cadastro">
                <form action="" className="layout-grid form_cadastro">

                    <h1>{props.tituloCadastro}</h1>
                    <hr />

                    <div className="cadastro_pai">
                    <div className="banner_cadastro" style={{display:props.yokoso}}><img src={tipoevento} alt="Imagem" /></div>
                    <div className="banner_cadastro"style={{display:props.watashi}}><img src={tipousuario} alt="Imagem" /></div>
                    <div className="banner_cadastro" style={{display:props.nosoul}} ><img src={evento} alt="Imagem" /></div>



                    <div className="campos_cadastros">
                        <div className="campo_cad_nome">
                            <input style={{display:props.inputzaum1}} placeholder={`Titulo`} />
                            <input style={{display:props.inputzaum2}} placeholder={`Nome`} />
                            <p></p>
                            <input style={{display:props.inputzaum3}} placeholder={`Tipo Evento`} />
                        </div>

                        <div className="campo_cad_tipo" style={{ display: props.visibilidade }}>
                            <select name="TipoEvento" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
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