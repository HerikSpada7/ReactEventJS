import { useEffect, useState } from "react";
import api from "../../services/Services";
import Swal from 'sweetalert2'


import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/cadastroUser.svg"

const CadastrarTipoDeUsuario = () => {
    const [tiposUsuarios, setTiposUsuario] = useState("");
    const [listaTipoUsuario, setListaTipoUsuario] = useState([])

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function cadastrarTipoUsuario(e) {
        e.preventDefault();
        if (tiposUsuarios.trim() != "") {

            try {
                await api.post("TipoUsuarios", { tituloTipoUsuario: tiposUsuarios });
                alertar("success", "Cadastro realizado com sucesso!")
                setTiposUsuario("")
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")
        }

    }

    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("TipoUsuarios");


            setListaTipoUsuario(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function removerTipoUsuario(id) {
        try {
            const excluirTipoUsuario = await api.delete(`TipoUsuarios/${id.idTipoUsuario}`)
            setListaTipoUsuario(excluirTipoUsuario.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function editarTipoUsuario(tiposUsuarios) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu Tipo de Usuario",
            input: "text",
            inputLabel: "Novo Tipo Evento",
            inputValue: tiposUsuarios.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoTipoUsuario) {
            try {
                api.put(`TipoUsuarios/${tiposUsuarios.idTipoUsuario}`, { tituloTipoUsuario: novoTipoUsuario })
                Swal.fire(`O Tipo novo é ${novoTipoUsuario}`);
                listaTipoUsuario();
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])
    return (
        <>
            <Header
                user="Administrador"
                botao_logar="none"
            />
            <main>
                <Cadastro
                    titulo_cadastro="Cadastro de Tipo Usuário"
                    campo_placeholder="Titulo"
                    botao="Cadastrar"
                    banner_img={Banner}

                    visibilidade="none"
                    visibilidade_data="none"
                    visibilidade_tp_evento="none"
                    visibilidade_instituicao="none"
                    visibilidade_descricao="none"


                    funcCadastro={cadastrarTipoUsuario}
                    valorInput={tiposUsuarios}
                    setValorInput={setTiposUsuario}
                />

                <Lista
                    titulo_lista="Tipo Usuário"
                    titulo="Titulo"
                    visibilidade="none"

                    tipoLista="tiposUsuarios"
                    lista={listaTipoUsuario}

                    funcDeletar={removerTipoUsuario}
                    funcEditar={editarTipoUsuario}
                    visibilidade2="none"
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastrarTipoDeUsuario;