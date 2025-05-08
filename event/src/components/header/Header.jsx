import "./Header.css";
import Logo from "../../assets/img/logo.svg"
import Porta from "../../assets/img/Vector.png"
const Header = () => {
    return(
        <header>
            <link rel="stylesheet" href="https://use.typekit.net/pam4ubo.css"></link>

            <div className="layout_grid header-header">
            <img src={Logo} alt=""/>
            <nav className="nav_header">
                <a href="" className="link-header">Home</a>
                <a href="" className="link-header">Eventos</a>
                <a href="" className="link-header">Usuários</a>
                <a href="" className="link-header">Contatos</a>
            </nav>
            <nav className="navas_header">
                <a href="" className="link-header">Administrador</a>
                <img src={Porta} alt=""/>
            </nav>
            </div>
        </header>
    )
}
export default Header;