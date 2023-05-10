import { makeStyles } from "@material-ui/core";
import PedidoV1 from "../Docente/PedidoV1";
import { getListaPedidos } from "../../Services/getPedidosService";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Theme1 from '../Theme/Theme1';
import Header from '../Header/Header'
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NoEncontrados from "../Docente/NoEncontrados"
import Filtros from "./Filtros";

const useStyles = makeStyles(() => ({
  marginTop: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center"
  },
}));

function Pedidos() {
  const { marginTop } = useStyles();
  const [listaPedidos, setListaPedidos] = useState([]);
  const [texto, setEncabezado] = useState("Laboratorio");
  const [esAdmin, setEsAdmin] = useState(true)

  const [edicionActiva, setEdicionActiva] = useState(false)

  useEffect(() => {
    let mounted = true;
    const userActual = JSON.parse(localStorage.getItem('usuario'));
    setEsAdmin(userActual.admin)
    getListaPedidos()
      .then(items => {
        if (mounted) {
          setListaPedidos(items)
        }
      })
    return () => mounted = false;
  }, [listaPedidos])

  return (
    <ThemeProvider theme={Theme1}>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Header texto={texto} ></Header>
      </Box>
      <Filtros
      setListaPedidos={setListaPedidos}
      ></Filtros>
      {(listaPedidos.length < 1) ?
        (<Box sx={{ flexGrow: 1, md: 2 }}><NoEncontrados /></Box>)
        : (
          <Box sx={{ flexGrow: 1, md: 2 }}>
            <Grid container direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 8,
                m: 4,
              }}
              alignItems="space-between"
              spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>

              {listaPedidos.map((pedido) => (
                <Grid item xs={3} key={pedido._id}>

                  <PedidoV1 key={pedido._id}
                    pedido={pedido} esAdmin={esAdmin}
                    edicionActiva={edicionActiva} setEdicionActiva={setEdicionActiva} />
                </Grid>
              ))}
            </Grid>
          </Box>)}
    </ThemeProvider>
  );
}

export default Pedidos;