import React, {ChangeEvent, useEffect, useState} from 'react';
import {Grid, Box, Button, TextField, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { login } from "../../services/Service";
import './Login.css';
import UserLogin from '../../models/UserLogin';


function Login() {

    let navigate = useNavigate();

    const [token, setToken] = useLocalStorage("token");

    const [userLogin, setUserLogin] = useState<UserLogin> (
    {

        id: 0,
        usuario: "",
        senha: "",
        token: "",
  
    }
  );

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
 }
    useEffect(() => {
    if (token != "") {
      navigate("/home");
    }
  }, [token]);

   async function logar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login("/usuarios/logar", userLogin, setToken);
      alert("Usuário logado com sucesso!");
    } catch (error) {
      alert("Dados de usuario incorretos!");
    }
  }


    return (
       <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid alignItems="center" xs={6}>
        <Box paddingX={20}>
          <form onSubmit={logar}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos1"
            >
              Entrar
            </Typography>
            <TextField
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              value={userLogin.usuario}
              label="Usuário (e-mail)"
              name="usuario"
              fullWidth
            />
            <TextField
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              value={userLogin.senha}
              label="Senha"
              name="senha"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
                <Button type="submit" variant="contained" color="primary">
                  Entrar
                </Button>
            </Box>
          </form>

          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Box>
            <Link to="/cadastrar">
              <Typography
                variant="subtitle1"
                align="center"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} className="imagem"></Grid>
    </Grid>
    );

}

export default Login;