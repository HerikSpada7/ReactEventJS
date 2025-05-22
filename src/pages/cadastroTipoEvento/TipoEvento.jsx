import { useEffect, useState } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";
import api from "../../services/Services";
import Swal from "sweetalert2";

const TipoEvento = () => {
    const [tipoDeEvento, setTipoDeEvento] = useState("")
    const [listaTipoEvento, setListarTipoEvento] = useState([])


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


    async function cadastrarEvento(evt) {
        evt.preventDefault();
        if (tipoDeEvento.trim() != "") {
            try {
                await api.post("TiposEventos", { TituloTipoEvento: tipoDeEvento });
                setTipoDeEvento("");
                alertar("success","Cadastrado com sucesso")
            } catch (error) {
                alertar("error","Erro! Entre em contato com o suporte")
            }
        } else {
            alertar("error","Erro! Campo está vazio!")
        }

    };

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos")
            setListarTipoEvento(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function excluirTipoEvento(idTipoEvento) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Esta ação é irreversivel!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, delete!",
            cancelButtonText: "Não...",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`TiposEventos/${idTipoEvento}`)
                    listarTipoEvento();
                } catch (error) {
                    console.log(error);
                }
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O tipo evento foi deletado com sucesso",
                    icon: "success"
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Seu tipo evento não foi excluido",
                    icon: "error"
                });
            }
        });

    }

    useEffect(() => {
        listarTipoEvento();
    }, [listarTipoEvento])


    return (
        <>
            <Header
                nomeUsuario="Administrador"
                botaozinho="none"
            />
            <Cadastro
                tituloCadastro="Cadastro de Tipo Evento"
                visibilidade="none"
                taveno="none"
                toveno="none"

                funcCadastro={cadastrarEvento}
                valorInput={tipoDeEvento}
                setValorInput={setTipoDeEvento}
            />
            <Listar
                tituloLista="Lista de Tipos Eventos"
                nomezin="Tipo Eventos"
                visible="none"
                edit="Editar"

                tipoLista="TiposEventos"
                deletar={excluirTipoEvento}
                lista={listaTipoEvento}
            />
            <Footer />
        </>
    )
}
export default TipoEvento;