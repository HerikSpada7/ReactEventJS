import "./Login.css"
import Logo from "../../assets/img/Logo.svg";
import Logo_banner from "../../assets/img/fundoLogin.svg";
import Botao from "../../components/botao/Botao";
import api from "../../services/Services"
import { useState } from "react";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage"
import {useNavigate} from 'react-router-dom'
import {useAuth} from "../../contexts/AuthContext"

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const {setUsuario} = useAuth();

    async function realizarAutenticacao(e) {
        e.preventDefault();
        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() != "" || email.trim() != "") {
            try {

                const resposta = await api.post("Login", usuario);


                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);

                    setUsuario(tokenDecodificado);

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado))

                    if (tokenDecodificado.TipoUsuarios === "Comum") {
                        navigate("/")
                    } else{
                        navigate("/CadastroEvento")
                    }
                }

            } catch (error) {
                alert("Email ou senha invalidos! para duvidas, entre em contato com o suporte.")
            }
        }
        else {
            alert("Preencha os campos vazios para realizar o login!")
        }
    }

    return (
        <main className="main_login">
            <div className="logo_banner">
                <img src={Logo_banner} alt="" />
            </div>
            <section className="section_login">
                <img src={Logo} alt="" />
                <form action="" className="form_login" onSubmit={realizarAutenticacao}>
                    <div className="campos_login">
                        <div className="campo_input">
                            <input type="email"
                                name="Usuario"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="campo_input">
                            <input type="password"
                                name="senha"
                                placeholder="Password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>
                    <a href="">Esqueceu sua senha?</a>
                    <Botao nomeBotao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;