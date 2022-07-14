import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group"
import { withRouter } from 'react-router-dom'

import UsuarioService from "../app/service/usuarioService"
import localStorageService from '../app/service/localStorageService'
import { mensagemErro} from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            localStorageService.adicionarItem('_usuario_logado', response.data)
            this.props.history.push('/home')
        }).catch( erro => {
          mensagemErro(erro.response.data)
        })
    }

    prepararCadastro = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render(){
        return(
            <div className="row">
                <div className=" col-md-6" style={ {position : 'relative',left: '300px'} } >
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                                                <input type="email" 
                                                       value={this.state.email}
                                                       onChange={e => this.setState({email: e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputEmail"
                                                       aria-describedby="emailHelp"
                                                       placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword">
                                                <input type="password"
                                                       value={this.state.senha}
                                                       onChange={e => this.setState({senha: e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputPassword"
                                                       placeholder="Password"/>
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success"> Entrar    </button>
                                            <button onClick={this.prepararCadastro} className="btn btn-danger" > Cadastrar </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( Login )