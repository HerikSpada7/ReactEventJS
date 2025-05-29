import { useState, useEffect } from "react";
import api from "../../services/Services";

//Importar o seu SweetAlert
import Swal from 'sweetalert2';

import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Imagem from "../../assets/img/CadastroTipoUsuario.svg"
import Lista from "../../components/lista/Lista";

const CadastroTipoUsuario = () => {
    const [listaTipoUsuario, setListaTipoUsuario] = useState([])
    const [tiposUsuarios, setTiposUsuario] = useState("");


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

        if (tiposUsuarios.trim() !== "") {
            try {
                await api.post("tipoUsuarios", { tituloTipoUsuario: tiposUsuarios });

                alertar("success", "Cadastro realizado com sucesso");
                setTiposUsuario("");
                listarTipoUsuario();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!");
            }
        } else {
            alertar("warning", "Preencha o campo!");
        }
    }

    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("TipoUsuarios");
            setListaTipoUsuario(resposta.data);
        } catch (error) {
            console.log(console.error);
        }
    }

    async function deletarTipoUsuario(id) {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`tipoUsuarios/${id.idTipoUsuario}`);
                alertar("success", "Tipo usuario excluido!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao excluir!");
        })
    }

    async function editarTipoUsuario(tiposUsuarios) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu Tipo Usuario",
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Tipo Usuario",
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
                await api.put(`tiposUsuarios/${tiposUsuarios.idTipoUsuario}`,
                    { tituloTipoUsuario: novoTipoUsuario });
                alertar("success", "Tipo Evento Modificado!")
            } catch (error) {

            }
            Swal.fire(`Seu novo Tipo Evento: ${novoTipoUsuario}`);
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
                    banner_img={Imagem}

                    visibilidade="none"
                    visibili_data="none"
                    visibili_tipo_evento="none"
                    visibili_instituicao="none"
                    visibili_descricao="none"


                    funcCadastro={cadastrarTipoUsuario}
                    setValorInput={setTiposUsuario}
                />

                <Lista
                    titulo_lista="Tipo Usuário"
                    titulo="Titulo"
                    lista={listaTipoUsuario}
                    visibilidade="none"
                    visibilidade2="none"

                    tipoLista="TipoUsuarios"
                    
                    funcDeletar={deletarTipoUsuario}
                    funcEditar={editarTipoUsuario}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroTipoUsuario;