import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroUsuario extends React.Component{

    state = {
        nome:  '',
        email: '',
        senha: '',
        repitaSenha: ''
    }

    cadastar = () => {
        console.log(this.state)
    }

    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className=" col-lg-12">
                        <div className="bs-componet">
                            <FormGroup label="Nome: *" htmlForm="inputNome">
                                <input type="text"
                                        id="inputNome"
                                        className="form-control"
                                        name="nome"
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlForm="inputEmail">
                                <input type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        name="email"
                                        onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlForm="inputSenha">
                                <input type="password"
                                        id="inputSenha"
                                        className="form-control"
                                        name="senha"
                                        onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlForm="inputRepitaSenha">
                                <input type="password"
                                        id="inputRepitaSenha"
                                        className="form-control"
                                        name="senha"
                                        onChange={e => this.setState({repitaSenha: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.cadastar} type="button" className="btn btn-success">Salvar</button>
                            <button type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default CadastroUsuario