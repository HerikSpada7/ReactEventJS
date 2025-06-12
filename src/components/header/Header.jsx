import "./Header.css";
import Logo from "../../assets/img/Logo.svg";
import Icone from "../../assets/img/Administracao.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/" className="logo_header">
                    <img src={Logo} alt="Logo do Events" />
                </Link>

                <nav className="nav_header">
                    <Link href="" className="link_header" to="/">Home</Link>
                    <Link href="" className="link_header" to="/CadastroEvento">Eventos</Link>
                    <Link href="" className="link_header" to="/CadastroTpEvento">TpEvento</Link>
                    <Link href="" className="link_header" to="/CadastroTpUsuario">TpUsuarios</Link>
                    <Link href="" className="link_header" to="/Evento">Listagem</Link>
                </nav>

                <nav className="nav_img" style={{ display: props.visibilidade }}>
                    <Link href="" className="link_header" to="/" >{props.user}</Link>
                    <img src={Icone} alt="Icone" style={{ display: props.visibilidade }} />
                </nav>

                <div className="login" style={{ display: props.botao_logar }}>
                    <Link href="" to="/Login" className="logar">Logar</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;