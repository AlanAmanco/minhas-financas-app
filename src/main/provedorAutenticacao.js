import React from "react";

import Authservice from '../app/service/authService'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer

const AuthProvider = AuthContext.Provider

class ProvedorAutenticado extends React.Component{

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSesao = (usuario) =>{
        Authservice.logar(usuario)
        this.setState({isAutenticado: true, usuarioAutenticado: usuario})
    }

    encerrarSesao = () => {
        Authservice.removerUsuarioAutenticado()
        this.setState({ isAutenticado: false, usuarioAutenticado: null })

    }

        render(){
            const contexto = {
                usuarioAutenticado: this.state.usuarioAutenticado,
                isAutenticado: this.state.isAutenticado,
                iniciarSesao: this.iniciarSesao,
                encerrarSesao: this.encerrarSesao
            }

            return(
                <AuthProvider value={contexto}>
                    {this.props.children}
                </AuthProvider>
            )
        }
}

export default ProvedorAutenticado;