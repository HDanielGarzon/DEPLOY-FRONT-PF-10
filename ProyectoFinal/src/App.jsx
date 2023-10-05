import React, { useState } from 'react';
import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail.jsx';
// import Login from './views/Login/Login';
import MyOrders from './views/MyOrders/MyOrders';
import Contact from './views/Contact/Contact';
import About from './views/About/About';
import CardWidget from './components/CardWidget/CardWidget';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
// import Form from './components/FormLogin/Form';
import { CarritoProvider } from './components/Context/CartContext';
import CheckoutForm from './components/Payment/CheckoutForm';
import Swal from 'sweetalert2';
import Login from './views/Login/Login';
import NewPassword from './components/NewPassword/NewPassword';
import Register from './components/RegisterUser/Register';
import LoginGetUser from './views/Login/LoginGetUser';
import { getUserInfoFromLocalStorage } from './helpers/AuthToken';
import NavBarLanding from './components/NavBarLanding/NavBarLanding';
import Faq from './views/OtrasPaginas/FAQ';




function App() {
  const { pathname } = useLocation();

  // Estado local para la cantidad total de compras
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // Función para actualizar la cantidad total
  const actualizarCantidadTotal = (cantidad) => {
    setCantidadTotal(cantidad);
  };

  // Función alert para mostrar las alertas
  const alert = {
    success: (message) => {
      Swal.fire({
        icon: 'success',
        text: message,
      });
    },
  };
  const userInfo = getUserInfoFromLocalStorage();



  return (
    <div className="App">
      <CarritoProvider>
        {
          userInfo === null ? <NavBarLanding/> : <NavBar
          cantidadTotal={cantidadTotal}
          actualizarCantidadTotal={actualizarCantidadTotal}
        />
        }
    
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route
            exact
            path='/products/:id'
            render={(props) => (
              <Detail
              {...props}
              actualizarCantidadTotal={actualizarCantidadTotal}
              cantidadTotal={cantidadTotal}
              alert={alert} 
              />
            )}
            />
          <Route exact path='/orders' component={MyOrders} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/about' component={About} />
          <Route exact path='/checkout' component={Checkout} /> 
          <Route exact path='/login' component={Login} /> 
          <Route exact path='/buy' component={CheckoutForm} /> 
          <Route exact path='/register' component={Register} /> 
          <Route exact path='/profile' component={LoginGetUser} /> 
          <Route exact path='/faq' component={Faq}/> 
          <Route
            exact
            path='/cart'
            render={(props) => (
              <Cart
              {...props}
              actualizarCantidadTotal={actualizarCantidadTotal}
              cantidadTotal={cantidadTotal}
              />
              )}
              />
        </Switch>
        
      </CarritoProvider>
    </div>
  );
}

export default App;

