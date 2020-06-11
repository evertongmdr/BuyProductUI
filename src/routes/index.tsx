import React, { useContext, useEffect } from "react";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import {useAuth} from "../contexts/auth";//import AuthContext from "../contexts/auth"; transformando em hooks

const Routes: React.FC = (props:any) => {
  const { signed } = useAuth(); //useContext(AuthContext); transfromando em hooks

  useEffect(()=>{
    /* Quando ele fazer o login vai para página inicial.
       MELHORA: Talves essa Lógica pode ser escrida em outro local, deixando 
       solução mais elegante.
       Talves na página SignIn porem, lá quando o usuário é logado não temos mais acesso e controle do estado por lá
       isso se da ao uso do contexto de Auth
    */
    if(signed)
    props.history.push('/order');
  },[signed]);

  return signed ? <AppRoutes />
   : <AuthRoutes />;
};

export default Routes;
