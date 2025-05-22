import "./Login.css";
import Logo from "../../assets/img/logo.svg"
import Botao from "../../components/botao/Botao";
const Login = () => {
    return (
        <main className="main_login">
            <link rel="stylesheet" href="https://use.typekit.net/pam4ubo.css"></link>
            <div className="banner"></div>
            <section className="section_login">
                <img className="bigger" src={Logo} alt="Event+" />
                <form action="" className="form_login">
                    <div className="campos_login">
                        <div className="campos_input">
                            <input type="email" placeholder="Username" />
                        </div>

                        <div className="campos_input">
                            <input type="password" placeholder="Password" />
                        </div>

                        <p>Esqueceu a senha?</p>

                    </div>
                    <Botao nomeDoBotao = "Login"/>
                </form>
            </section>
        </main>
    )
}
export default Login;