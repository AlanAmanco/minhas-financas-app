import React from "react";

import Login from "../views/login";
import Home from "../views/home";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamento";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer } from '../main/provedorAutenticacao'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'


function RotaAutenticada( { component: Component, isUsuarioAutenticado,...props } ){
    return(
        <Route {...props} render={ ( componentProps ) => {
            if(isUsuarioAutenticado){
                return (<Component {...componentProps} />
                )
            }else{
                <Redirect to={ {pathname : '/login', state : {from: componentProps.location} } } />
            }
        } } />
    )
}

function Rotas(props){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado ={context.isAutenticado} /> ) }
    </AuthConsumer>
)