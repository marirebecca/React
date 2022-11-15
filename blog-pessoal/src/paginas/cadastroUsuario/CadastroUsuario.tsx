import React, { ChangeEvent, useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './CadastroUsuario.css';
import { cadastroUsuario } from '../../services/Service';
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from '../../models/UserLogin';



function CadastroUsuario() {
    let navigate = useNavigate();

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<UserLogin>(
        {
            id: 0,
            usuario: "",
            senha: "",
        })

    const [userResult, setUserResult] = useState<UserLogin>(
        {
            id: 0,
            usuario: "",
            senha: "",
        })

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha === user.senha && user.senha.length >= 8){
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                alert("Usuário cadastrado com sucesso!");
            } catch (error) {
                alert ("Falha interna ao cadastrar!");
            }
        } else{
            alert("As senhas não conferem. Favor verificar novamente!");
            setUser({... user, senha: " "}); 
            setConfirmarSenha(" ");
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={20} >
                    <form onSubmit={cadastrar}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastre-se</Typography>
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='usuario' label='Usuário (e-mail)' variant='outlined' name='usuario' margin='normal' fullWidth required placeholder='digite um e-mail valido' />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' placeholder='Digite pelo menos 8 caracteres' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>)=> confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'></Box>
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>

                </Box>

            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;