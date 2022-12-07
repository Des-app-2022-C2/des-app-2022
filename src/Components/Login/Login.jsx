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
import{getUsuario} from '../../Services/getUsuarioService';
import { fontWeight } from '@mui/system';

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
  const [isHidden, setIsHidden] = React.useState(true);
  const navigate=useNavigate();

  const re_direccion=(usuario)=>{
    if(usuario=== false){
      navigate("/Docente/Pedidos");
    }
    else if(usuario=== true){
      navigate("/Laboratorio/Pedidos");
    }else{
      navigate("/");
    }

  }
 
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const datos = getUsuario(data.get('user'), data.get('password'));

    Promise.resolve(datos)
    .then(value=>{
      re_direccion(value.data[0].admin);
    })
    .catch(error => {
      setIsHidden(false)
    })

  };

  return (
    <ThemeProvider theme={Theme1}>
       <Box sx={{ flexGrow: 1 ,m:2}}>
          <Typography variant="body1" align='center' color='primary.main' >
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
            <p hidden={isHidden} style={{color: "red", fontWeight: 700}}>Por favor revise el usuario y/o la contraseña </p>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
           <Grid item xs={12} sm={6}>   
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              color='primary'
             >
              Registrase
            </Button>
            </Grid>
          
            <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
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