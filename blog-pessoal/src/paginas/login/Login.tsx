import React from 'react';
import {Grid, Box, Button, TextField, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
import './Login.css';


function Login() {

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form>
                        <Typography variant='h3' gutterBottom color ='textPrimary' component='h3' 
                        align='center' style={{fontWeight: 'bold'}}>Entrar</Typography>
                        <TextField id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth/>
                        <TextField id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth/>

                        <Box marginTop={2} textAlign='center'>
                            <Link to='/home' className='text-decorator-none'>
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                            </Link>
                        </Box>

                    </form>
                </Box>
            </Grid>

            <Grid xs={6}>

            </Grid>
        </Grid>
    );

}

export default Login;