import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Header from '../Header/Header'

function Copyright(props) {
  return (
    <Typography variant="body2" color="secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        App.Laboratorio 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//const theme = createTheme();

export default function Login() {
  const [texto,setTexto]=React.useState("UNAHUR-DESARROLLO DE APLICACIONES-CARGA DE PEDIDOS DE LABORATORIO")
  const navigate=useNavigate();
  const re_direccion=(usuario)=>{
    if(usuario==="docente"){
      navigate("/Docente/Pedidos");
    }
    else if(usuario==="laboratorio"){
      navigate("/Laboratorio/Pedidos");
    }else{
      navigate("/");
    }

  }
 
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const usuario=data.get('user');
    re_direccion(usuario);
    console.log({
      usuario: data.get('user'),
      password: data.get('password'),
    });
   
    

  };

  return (
    <ThemeProvider theme={Theme1}>
       <Box sx={{ flexGrow: 1 ,m:2}}>
          <Typography variant="body1" align='center'  >
                   <Header texto={texto} ></Header>
          </Typography>
     </Box>
    
      <Container component="main" maxWidth="xs" backgroundcolor="verdeC" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, }} color="secondary" >
            <LockOutlinedIcon color="primary"/>
          </Avatar> */}
          <Typography component="h1" variant="h5">
            INGRESO
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
           <Grid item xs={6}>   
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              color='secondary'
             >
              Registrase
            </Button>
            </Grid>
          
            <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              styled={{textTransform:'none'}}

            
            >
             Ingresar
            </Button>
            </Grid></Grid>
           
            
            



            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  olvidaste tu password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </ThemeProvider>
    
  );
}