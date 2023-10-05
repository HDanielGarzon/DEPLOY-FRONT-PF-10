import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import reducer from './Reducer.jsx';



// Esta linea es para conectar con la extension del navegador => REDUX DEVTOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancer(applyMiddleware(thunk))
	// Esta linea permite hacer peticiones asíncronas a un server:
);

export default store;