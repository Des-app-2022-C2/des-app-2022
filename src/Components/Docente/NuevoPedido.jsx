import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';



import { Grid, Box } from '@mui/material';

import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import Header from '../Header/Header'

import Theme1 from '../Theme/Theme1';




import { useNavigate } from 'react-router-dom';
import { postPedido } from '../../Services/postPedidoService'
import { getListaMateriales, getListaEquipos, getListaReactivos } from '../../Services/getService';

import { getCantidadPedidos } from '../../Services/getPedidosService';

import SendIcon from '@mui/icons-material/Send';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import PedidoEquipos from './PedidoEquipos';

import PedidoCabecera from './PedidoCabecera';

import PedidoMaterial from './PedidoMaterial';

import PedidoReactivo from './PedidoReactivo';


//const theme = createTheme();



export default function NuevoPedido() {
  //PRUEBA CODIGO

  const userActual = JSON.parse(localStorage.getItem('usuario'));
  const [pedidoEquipos, setPedidoEquipos] = useState([]);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [equipoElegido, setEquipoElegido] = useState({});
  const [verMasEquip, setverMasEquip] = useState([]);


  const [cantidadPedidos, setCantPedido] = useState([]);
  const [pedidoEncabezado, setEncabezadoPedido] = useState({});
  //const [fechaActual,setFechaActual]=useState(new Date());

  const [pedidoMateriales, setPedidoMateriales] = useState([]);
  const [listaMateriales, setListaMateriales] = useState([]);
  const [materialElegido, setMatElegido] = useState({});
  const [verMasMateriales, setverMasMateriales] = useState([]);

  const [pedidoReactivos, setPedidoReactivos] = useState([]);
  const [listaReactivos, setListaReactivos] = useState([]);
  const [reactivoElegido, setReacElegido] = useState({});
  const [verMasReactivos, setverMasReactivos] = useState([]);

  const [_med_reactivo, setUn_med_reactivo] = useState(" ");
  const [cal_reactivo, setCalReactivo] = useState(" ");
  const [_tip_reactivo, setTipReactivo] = useState(" ");//tipo_concentracion
  const [_disol_reactivo, setDisolReactivo] = useState(" ");
  const [ver_disolvente,set_ver_disolvente] = useState("none");
  const [ver_otro_disolvente,set_otro_disolvente] = useState("none");
  const [visible_off,set_visible_off] = useState("block");
  const [visible_off_otro,set_visible_off_otro] = useState("block");


  //const [_otro_disol_reactivo, setOtroDisolReactivo] = useState("");







  //const otroDisolReactivo = (event) => { setOtroDisolReactivo(event.target.value); };

  const disolReactivo = (event) => {
     const disolvente=event.target.value;
     if (disolvente === "otro") {set_otro_disolvente("block");set_visible_off_otro("none")}
     else {set_otro_disolvente("none");set_visible_off_otro("block")};
     
     setDisolReactivo(disolvente); }

  const tipReactivo = (event) => { 
    const tipo_reactivo=event.target.value;
    if (tipo_reactivo==="puro"){ set_ver_disolvente("none");set_otro_disolvente("none");set_visible_off("block")}
      else{set_ver_disolvente("block") ; set_visible_off("none")   }  ;

    setTipReactivo(tipo_reactivo); }


  const calReactivo = (event) => { setCalReactivo(event.target.value); };


  const med_reactivo = (event) => { setUn_med_reactivo(event.target.value); };

  const navigate = useNavigate();



  const [texto, setEncabezado] = useState("CARGA DE PEDIDO");


  //CARGA ENCABEZADO AL PEDIDO
  const cargaEncabezado = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // hoy = new Date()
    // maniana = hoy.setTime(hoy.getTime() + (1*24*60*60*1000))
    // maniana = new Date(maniana)
    const fecha = new Date();
    const fecha_utilizacion = new Date(`${data.get('fecha_utilizacion')}T${data.get('hora')}:00.000Z`);
    const nro_pedido = cantidadPedidos + 1;
    setEncabezadoPedido({

      "descripcion": (nro_pedido).toString(),
      "fecha_solicitud": fecha,
      "fecha_utilizacion": fecha_utilizacion,
      "numero_laboratorio": parseInt(0, 10),
      "tipo_pedido": "PENDIENTE",
      "alumnos": data.get('cantidad_alumnos'),
      "cantidad_grupos": data.get('cantidad_grupos'),
      "edificio": "Sin asignar",
      "materia": "string",
      "numero_tp": "2",
    },
    );



  };




  //CARGA EQUIPO A LA LISTA
  const cargaEquipo = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dato = {
      "cantidad": parseInt(data.get('cant_equipo'), 10),
      "equipo": equipoElegido._id
    };
    const cargarNuevosEquipos = dato => {
      setPedidoEquipos([...pedidoEquipos, dato]);
    }
    const datoVer = {
      "cantidad": parseInt(data.get('cant_equipo'), 10),
      "equipo": equipoElegido
    };
    const cargarNuevosEquiposVer = dato => {
      setverMasEquip([...verMasEquip, dato]);
    }

    cargarNuevosEquiposVer(datoVer)

    cargarNuevosEquipos(dato)



  };
  const eliminarEquipo = (event) => {

    const cargar_Nuevos_EquiposVer = verMasEquip.filter(eq => eq.equipo._id !== event._id)
    setverMasEquip(cargar_Nuevos_EquiposVer);



    const cargar_Nuevos_Equipos = pedidoEquipos.filter(eq => eq.equipo !== event._id)
    setPedidoEquipos(cargar_Nuevos_Equipos);

    
  }

  const set_IdEquip = (event, value) => { setEquipoElegido(value); };




  // CARGA MATERIAL A LA LISTA
  const cargaMaterial = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dato = {
      "cantidad": parseInt(data.get('cant_material'), 10),
      "material": materialElegido._id
    };
    const cargarNuevosMateriales = dato => {
      setPedidoMateriales([...pedidoMateriales, dato]);
    }

    const datoVer = {
      "cantidad": parseInt(data.get('cant_material'), 10),
      "material": materialElegido
    };
    const cargarNuevosMaterialesVer = dato => {
      setverMasMateriales([...verMasMateriales, dato]);
    }

    cargarNuevosMaterialesVer(datoVer)

    cargarNuevosMateriales(dato)



  };


  // ELIMINAR MATERIAL DE LA LISTA

  const eliminarMaterial = (event) => {
   
    const pedido_MaterialesVer = verMasMateriales.filter
      (mate => mate.material._id !== event._id);
    setverMasMateriales(pedido_MaterialesVer);

    const pedido_Materiales = pedidoMateriales.filter
      (mate => mate.material !== event._id);
    setPedidoMateriales(pedido_Materiales);
    
  }


  const set_IdMat = (event, value) => { setMatElegido(value); };


  // CARGA REACTIVOS A LA LISTA



  


  const cargaReactivos = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get('cant_reactivo'));
    var med_conc=data.get('med_concent');
    if (med_conc===""){ med_conc=" " }  ;
    // console.log(data.get('med_concent'));
    // console.log(data.get('_otro_disol_reactivo'))
    const dato = {
      "cantidad": parseInt(data.get('cant_reactivo'), 10),
      "un_medida": _med_reactivo,
      "calidad": cal_reactivo,
      "concentracion_tipo": _tip_reactivo,
      "concentracion_medida": med_conc,
      "disolvente": _disol_reactivo,
      "otro_disolvente_descripcion": data.get('_otro_disol_reactivo'),
      "reactivo": reactivoElegido._id
    };

    const cargarNuevosReactivos = dato => {
      setPedidoReactivos([...pedidoReactivos, dato]);
    }
    const datoVer = {
      "cantidad": parseInt(data.get('cant_reactivo'), 10),
      "un_medida": _med_reactivo,
      "calidad": cal_reactivo,
      "concentracion_tipo": _tip_reactivo,
      "concentracion_medida": data.get('med_concent'),
      "disolvente": _disol_reactivo,
      "otro_disolvente_descripcion": data.get('_otro_disol_reactivo'),
      "reactivo": reactivoElegido
    };
    const cargarNuevosReactivosVer = dato => {
      setverMasReactivos([...verMasReactivos, dato]);
    }
    cargarNuevosReactivosVer(datoVer)
    cargarNuevosReactivos(dato)
     data.reset()
  };

  const eliminarReactivo = (value) => {
    const cargar_reactivos_ver = verMasReactivos.filter(reactivo => reactivo.reactivo._id !== value._id)
    setverMasReactivos(cargar_reactivos_ver);
    const cargar_reactivos = pedidoReactivos.filter(reactivo => reactivo.reactivo !== value._id)
    setPedidoReactivos(cargar_reactivos);
  }
  const set_IdReactivo = (event, value) => { setReacElegido(value); console.log("hand", reactivoElegido) };






  const handleSubmit = () => {
    const pedido = {
      "docente": {
        "nombre": userActual.nombre,
        "apellido": userActual.apellido,
        "dni": userActual.dni,
        "matricula": userActual.matricula
      },
      "descripcion": pedidoEncabezado.descripcion,
      "fecha_solicitud": pedidoEncabezado.fecha_solicitud,
      "fecha_utilizacion": pedidoEncabezado.fecha_utilizacion,
      "numero_laboratorio": pedidoEncabezado.numero_laboratorio,
      "tipo_pedido": pedidoEncabezado.tipo_pedido,
      "cantidad_grupos": pedidoEncabezado.cantidad_grupos,
      "alumnos": pedidoEncabezado.alumnos,
      "edificio": pedidoEncabezado.edificio,
      "materia": pedidoEncabezado.materia,
      "numero_tp": pedidoEncabezado.numero_tp,
      "lista_equipos": pedidoEquipos,
      "lista_reactivos": pedidoReactivos,
      "lista_materiales": pedidoMateriales

    };

    postPedido(pedido);
    navigate('/Docente/Pedidos');






  };
  useEffect(() => {
    let mounted = true;
    getListaEquipos().then(items => { if (mounted) { setListaEquipos(items) } });
    getListaMateriales().then(items => { if (mounted) { setListaMateriales(items) } });
    getListaReactivos().then(items => { if (mounted) { setListaReactivos(items) } });
    getCantidadPedidos().then(items => { if (mounted) { setCantPedido(items) } });

    return () => mounted = false;
  }, [])

  return (
    <ThemeProvider theme={Theme1}>
      <Box sx={{ flexGrow: 1, m: 2 }}>

        <Header texto={texto} ></Header>

      </Box>
      {/* COMIENZA EL CONTENEDOR DE LA PAGINA    */}
      <Container component="main" color="primary">

        {/* COMIENZA EL CONTENEDOR DEL BLOQUE SUPERIOR    */}
        {/* <Box component="form" onSubmit={handleSubmit} noValidate>      */}
        <Box>
          <Box sx={{ flexGrow: 1, md: 2 }}>

            <PedidoCabecera
              cargaEncabezado={cargaEncabezado}
              cantidadPedidos={cantidadPedidos}

            />


            {/* COMIENZA CONTENEDOR DE EQUIPOS */}




            <PedidoEquipos

              cargaEquipo={cargaEquipo}
              listaEquipos={listaEquipos}
              set_IdEquip={set_IdEquip}
              pedidoEquipos={pedidoEquipos}
              equipoElegido={equipoElegido}
              verMasEquip={verMasEquip}
              eliminarEquipo={eliminarEquipo}

            />



            {/* COMIENZA CONTENEDOR DE MATERIALES */}

            <PedidoMaterial
              //key={id}
              cargaMaterial={cargaMaterial}
              listaMateriales={listaMateriales}
              set_IdMat={set_IdMat}
              pedidoMateriales={pedidoMateriales}
              materialElegido={materialElegido}
              verMasMateriales={verMasMateriales}
              eliminarMaterial={eliminarMaterial}
            />

            <PedidoReactivo
              cargaReactivos={cargaReactivos}
              listaReactivos={listaReactivos}
              set_IdReactivo={set_IdReactivo}
              reactivoElegido={reactivoElegido}
              cal_reactivo={cal_reactivo}
              calReactivo={calReactivo}

              _tip_reactivo={_tip_reactivo}
              tipReactivo={tipReactivo}

              _disol_reactivo={_disol_reactivo}
              disolReactivo={disolReactivo}

              //_otro_disol_reactivo = {_otro_disol_reactivo}
              // otroDisolReactivo = {otroDisolReactivo}

              _med_reactivo={_med_reactivo}
              med_reactivo={med_reactivo}

              verMasReactivos={verMasReactivos}
              eliminarReactivo={eliminarReactivo}
              
              ver_disolvente={ver_disolvente}
              ver_otro_disolvente={ver_otro_disolvente}
              visible_off={visible_off}
              visible_off_otro={visible_off_otro}
            />

          </Box>


          {/* EMPIEZAN BOTONES */}
          <Grid container justifyContent="flex-end" spacing={2}
          >
            <Grid item xs={2} >

              <Button fullWidth
                color="error"
                style={{ borderRadius: 8 }}
                margin="normal"
                variant="contained"
                startIcon={<ReplyAllIcon />}
                onClick={() => {
                  navigate('/Docente/Pedidos')


                }}



                sx={{ mt: 3, mb: 2, height: 50 }}>  CANCELAR</Button>

            </Grid>
            <Grid item xs={2} >

              <Button fullWidth
                style={{ borderRadius: 8 }}
                margin="normal"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmit}


                sx={{ mt: 3, mb: 2, height: 50 }}> CONFIRMAR PEDIDO</Button>

            </Grid>
          </Grid>





        </Box>


      </Container>
    </ThemeProvider>
  );
}