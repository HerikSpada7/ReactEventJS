import "./Login.css";
import Logo from "../../assets/img/logo.svg"
import Botao from "../../components/botao/Botao";

const Login = () => {
    return(
        <main className="main_login">
            <div className="banner"></div>
            <section className="section_login">
                <img className="img_banner" src={Logo} alt="Event+" />
                <form action="" className="form_login">
                    <div className="campos_login">
                        <div className="campo_input">
                            <input className="input_digit" type="nome" name="Nome" placeholder="Username"/>
                        </div>

                        <div className="campo_input">
                            <input className="input_digit"type="senha" name="Senha" placeholder="Password"/>
                        </div>

                        <p>Esqueceu a senha?</p>

                    </div>
                    <Botao nomeDoBotao="Login"/>
                </form>
            </section>

        </main>
    )
}

export default Login;