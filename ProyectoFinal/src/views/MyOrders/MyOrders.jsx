import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './MyOrders.module.css'; 
import { useSelector } from 'react-redux';
import pedidos from './assets/pedidos.gif'
import FooterSimple from '../../components/FooterSimple/FooterSimple'
import { Link } from "react-router-dom";

function MyOrders() {
  const email = useSelector((state) => state.email);
  const [ordersFromDB, setOrdersFromDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    // Función para obtener órdenes de la base de datos
    const fetchOrdersFromDB = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://backend-henry-pf.onrender.com/order/get/${email}`);
        const orders = response.data;
        setOrdersFromDB(orders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes de la base de datos:', error);
        setIsLoading(false);
      }
    };

    // Llama a la función cuando el email en Redux cambia
    fetchOrdersFromDB();
  }, [email]); 

  return (
    <div className={style.centrar}>
      <h1 className={style.title}>📦 Your orders are as follows: 📦</h1>
      {isLoading ? (
        <p>Cargando órdenes...</p>
      ) : ordersFromDB.length > 0 ? (
        // Mostrar las órdenes desde la base de datos
        <div className={style.allOrders}>
          {ordersFromDB.map((order) => (
            <div key={order.ordenId} className={style.finalizar}>
              <br />
              <p><strong>Numero de Orden: </strong> {order.ordenId}</p>
              <p><strong>Fecha de Orden: </strong> {order.orderDate}</p>
              <p><strong>Nombre de Titular: </strong>{`${order.nombre} ${order.apellido}`}</p>
              <p><strong>Monto Total: </strong>U$S {order.total}</p>

              <p><strong>Estatus de Orden: </strong> {order.status === "pendiente" ? (<span> {order.status} <Link to="/buy"><button>Pagar</button></Link></span>) : (order.status)}</p>

              {order.Products.map((product) => (
                <div key={product.id} className={style.product}>
                  <p><strong>Nombre de Producto: </strong>{product.name}</p>
                  <p><strong>Categoría de Producto: </strong>{product.category}</p>
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
      ) : (
        <div className={style.sinOrdenes}>
          <p> ❌¡Aun No tienes órdenes creadas!❌</p>
          <img className={style.gif} src={pedidos} alt="orders" />
        </div>
      )}
      <FooterSimple />
    </div>
  );
}

export default MyOrders;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import style from './MyOrders.module.css'; 
// import { useSelector } from 'react-redux';
// import pedidos from './assets/pedidos.gif';
// import FooterSimple from '../../components/FooterSimple/FooterSimple';
// import { Link } from "react-router-dom";

// function MyOrders() {
//   const email = useSelector((state) => state.email);
//   const [ordersFromDB, setOrdersFromDB] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const actualizarEstadoOrden = async (ordenId) => {
//     try {
//       await axios.get(`https://backend-henry-pf.onrender.com/order/update-orden?ordenId=${ordenId}&estado=completado`);

//       const updatedOrders = ordersFromDB.map(order => {
//         if (order.ordenId === ordenId) {
//           return { ...order, status: "completado" };
//         }
//         return order;
//       });
//       setOrdersFromDB(updatedOrders);
//     } catch (error) {
//       console.error('Error al actualizar el estado de la orden:', error);
//     }
//   };

//   useEffect(() => { 
//     const fetchOrdersFromDB = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`https://backend-henry-pf.onrender.com/order/get/${email}`);
//         const orders = response.data;
//         setOrdersFromDB(orders);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error al obtener las órdenes de la base de datos:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchOrdersFromDB();
//   }, [email]); 

//   return (
//     <div className={style.centrar}>
//       <h1 className={style.title}>📦 Tus órdenes son las siguientes: 📦</h1>
//       {isLoading ? (
//         <p>Cargando órdenes...</p>
//       ) : ordersFromDB.length > 0 ? (
//         <div className={style.allOrders}>
//           {ordersFromDB.map((order) => (
//             <div key={order.ordenId} className={style.finalizar}>
//               <br />
//               <p><strong>Numero de Orden: </strong> {order.ordenId}</p>
//               <p><strong>Fecha de Orden: </strong> {order.orderDate}</p>
//               <p><strong>Nombre de Titular: </strong>{`${order.nombre} ${order.apellido}`}</p>
//               <p><strong>Monto Total: </strong>U$S {order.total}</p>

//               <p><strong>Estatus de Orden: </strong> {order.status === "pendiente" ? (<span> {order.status} <Link to="/buy"><button onClick={() => actualizarEstadoOrden(order.ordenId)}>Pagar</button></Link></span>) : (order.status)}</p>

//               {order.Products.map((product) => (
//                 <div key={product.id} className={style.product}>
//                   <p><strong>Nombre de Producto: </strong>{product.name}</p>
//                   <p><strong>Categoría de Producto: </strong>{product.category}</p>
//                 </div>
//               ))}
//               <br />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className={style.sinOrdenes}>
//           <p> ❌¡Aun No tienes órdenes creadas!❌</p>
//           <img className={style.gif} src={pedidos} alt="orders" />
//         </div>
//       )}
//       <FooterSimple />
//     </div>
//   );
// }

// export default MyOrders;
























































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import style from './MyOrders.module.css'; 
// import { useSelector } from 'react-redux';
// import pedidos from './assets/pedidos.gif'
// import FooterSimple from '../../components/FooterSimple/FooterSimple'
// import { Link} from "react-router-dom";


// function MyOrders() {
//   const email = useSelector((state) => state.email);
//   const [ordersFromDB, setOrdersFromDB] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

  
//   useEffect(() => { 
//     // Función para obtener órdenes de la base de datos
//     const fetchOrdersFromDB = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`https://backend-henry-pf.onrender.com/order/get/${email}`);
//         const orders = response.data;
//         localStorage.setItem('orders', JSON.stringify(orders));
//         setOrdersFromDB(orders);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error al obtener las órdenes de la base de datos:', error);
//         setIsLoading(false);
//       }
//     };

//     // Llama a la función cuando el email en Redux cambia
//     fetchOrdersFromDB();
//   }, [email]); 

//   return (
//     <div className={style.centrar}>
//       <h1 className={style.title}>📦 Tus órdenes son las siguientes: 📦</h1>
//       {isLoading ? (
//         <p>Cargando órdenes...</p>
//       ) : ordersFromDB.length > 0 ? (
//         // Mostrar las órdenes desde localStorage o la base de datos
//         <div className={style.allOrders}>
//           {ordersFromDB.map((order) => (
//             <div key={order.ordenId} className={style.finalizar}>
//               <br />
//               <p><strong>Numero de Orden: </strong> {order.ordenId}</p>
//               <p><strong>Fecha de Orden: </strong> {order.orderDate}</p>
//               <p><strong>Nombre de Titular: </strong>{`${order.nombre} ${order.apellido}`}</p>
//               <p><strong>Monto Total: </strong>U$S {order.total}</p>
//               <p><strong>Estatus de Orden: </strong> {order.status === "pendiente" ? (  <span> {order.status} <button>Pagar</button></span>) : (order.status )}</p>
//               {order.Products.map((product) => (
//                 <div key={product.id} className={style.product}>
//                   <p><strong>Nombre de Producto: </strong>{product.name}</p>
//                   <p><strong>Categoría de Producto: </strong>{product.category}</p>
//                 </div>
//               ))}
//               <br />
//             </div>
//           ))}
//         </div>
//       ) : (
//          <div className={style.sinOrdenes}>
//            <p> ❌¡Aun No tienes órdenes creadas!❌</p>
//             <img className={style.gif} src={pedidos} alt="orders" />
//           </div>
        
//         )}
//         <FooterSimple/>
//     </div>
//   );
// }

// export default MyOrders;








/*
  useEffect(() => {
    // Se obtienen las órdenes almacenadas en localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders'));

    if (storedOrders) {
      setOrdersFromDB(storedOrders);
      setIsLoading(false);
    } else {
      // Si no hay órdenes almacenadas en localStorage, se obtienen las órdenes de la base de datos
      const fetchOrdersFromDB = async () => {
        try {
          const response = await axios.get(`https://backend-henry-pf.onrender.com/order/get/${email}`);
          const orders = response.data;

          // Almacena las órdenes en localStorage para futuras visitas
          localStorage.setItem('orders', JSON.stringify(orders));

          setOrdersFromDB(orders);
          setIsLoading(false);
        } catch (error) {
          console.error('Error al obtener las órdenes de la base de datos:', error);
          setIsLoading(false);
        }
      };

      fetchOrdersFromDB();
    }
  }, [email]);



*/


















// import React, { useState, useEffect } from 'react';
// import './MyOrders.module.css';
// import { useSelector } from "react-redux";
// import axios from "axios";

// function MyOrders() {
//   const email = useSelector((state) => state.email);
//   const [orders, setOrders] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`https://backend-henry-pf.onrender.com/order/get/${email}`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error al obtener las órdenes:', error);
//       }
//     };

//     fetchOrders();
//   }, [email]);

//   return (
//     <div>
//       <h1>Mis Órdenes son:</h1>
//       {orders ? (
//         orders.map((order) => (
//           <div key={order.ordenId}>
//             <p>Orden ID: {order.ordenId}</p>
//             <p>Nombre: {order.nombre}</p>
//             <p>Total: {order.total}</p>
//             {order.Products.map((product) => (
//               <div key={product.id}>
//                 <p>Nombre del Producto: {product.name}</p>
//                 <p>Categoría: {product.category}</p>
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>Cargando órdenes...</p>
//       )}
//     </div>
//   );
// }

// export default MyOrders;













































// import React, { useState, useEffect } from 'react';
// import './MyOrders.module.css';
// import { useSelector } from "react-redux";
// import axios from "axios";

// function MyOrders() {
//   const email = useSelector((state) => state.email);
//   const [orders, setOrders] = useState(null); // Inicializar con null para indicar que los datos no están cargados aún

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`https://backend-henry-pf.onrender.com/order/get/${email}`);
//         setOrders(response.data); // Guardar los datos en el estado
//       } catch (error) {
//         console.error('Error al obtener las órdenes:', error);
//       }
//     };

//     fetchOrders();
//   }, [email]);
//   console.log(orders);

//   return (
//     <div>
//       <h1>Mis Ordenes son :</h1>
//       {/* Verificar si orders está definido antes de intentar acceder a sus propiedades */}
//       {orders ? (
//         <div>
//           <p>{orders.ordenId}</p>
//           <p>{orders.status}</p>
//         </div>
//       ) : (
//         <p>Cargando órdenes...</p>
//       )}
//     </div>
//   );
// }



// export default MyOrders;

















// import './MyOrders.module.css';
// import { useSelector } from "react-redux";
// function MyOrders() {
//   const email = useSelector((state)=>state.email)
//    // const URL=`https://backend-henry-pf.onrender.com/order/get/${email}`
//   // const {data} =  axios(URL)
//   return (
//     <div>
//       <h1>Mis Ordenes son :</h1>
//     </div>
//   );
// }

// export default MyOrders;


/*
import './MyOrders.module.css';
import { useSelector } from "react-redux";
import axios from "axios";

async function MyOrders() {
  const email = useSelector((state)=>state.email)

  // const URL=`https://backend-henry-pf.onrender.com/order/get/${email}`
  // const {data} = await axios(URL)


  // const objeto ={
  //   estado: data.status
  // }
 
  return (
    <div>
      <h1>Mis Ordenes son :</h1>
      <p>hola</p>
    </div>
  );
}

export default MyOrders;



*/