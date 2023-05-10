const axios = require('axios');

export function getListaPedidos() {
    return fetch('http://localhost:3000/api/pedido/getAll')
        .then(data => data.json())
}

export async function getCantidadPedidos() {
    const response = await fetch('http://localhost:3000/api/pedido/getAll');
    const data = await response.json();
    const cantidad = Object.keys(data).length;

    return cantidad

}


export function getPedidosPorDni(dni) {
    return fetch('http://localhost:3000/api/pedido/getAllByDni/' + dni)
        .then(data => data.json())
}

export function axiosGetPedido(fecha_utilizacion, tipo_pedido, fecha_inicio, fecha_fin, edificio) {
    console.log("funcion", tipo_pedido);
    const params =
    {
        tipo_pedido: tipo_pedido,
        fecha_utilizacion: fecha_utilizacion,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        edificio: edificio
    }


    return fetch('http://localhost:3000/api/pedido/',
        {
            params: {
                tipo_pedido: tipo_pedido,
                fecha_utilizacion: fecha_utilizacion,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
                edificio: edificio
            }
        })

        .then(data => data.json())
}

// export async function axiosGetPedido(fecha_utilizacion, tipo_pedido, fecha_inicio, fecha_fin, edificio)  {
//     try {
//         console.log("funcion",tipo_pedido);
//         const response = await axios({
//             method: 'get',
//             params: {
//                 tipo_pedido:tipo_pedido,
//                    fecha_utilizacion: fecha_utilizacion,
//                    fecha_inicio:fecha_inicio,
//                    fecha_fin: fecha_fin,
//                    edificio:edificio},
//             url: `http://localhost:3000/api/pedido/'`,
//             responseType: 'json'
//         });
//         return response.data.pedidos;
//     } catch (error) {
//         console.log(error);
//     }
// };

