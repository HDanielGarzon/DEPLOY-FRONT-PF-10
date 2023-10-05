import axios from "axios";
import {
  GET_ALL_FURNITURES,
  GET_FURNITURES_BY_NAME,
  FURNITURES_SORT_BY_NAME,
  FILTER_BY_PRICE,
  SORT_BY_PRICE,
  LOGIN_SUCCESS,
  LOGIN_GET_USER,
  LOGOUT,
  PREV,
  NEXT,
  GO_TO_FIRST_PAGE,
  GO_TO_LAST_PAGE,
  CREAR_ORDEN,
  CREATE_EMAIL,

} from "./ActionsTypes";
import { getUserInfoFromLocalStorage } from "../../../helpers/AuthToken";

//ACTIONS CREATORS
//http://localhost:5000/products

export const getAllFurnitures = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://backend-henry-pf.onrender.com/product");

      // Ordenar los datos por id de menor a mayor
      const sortedData = response.data.sort((a, b) => a.id - b.id);

      dispatch({ type: GET_ALL_FURNITURES, payload: sortedData });
    } catch (error) {
      console.error("Error al intentar renderizar los muebles", error.message);
    }
  };
};

export function getFurnituresByName(name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://backend-henry-pf.onrender.com/product?name=${name}`
      );
      dispatch({ type: GET_FURNITURES_BY_NAME, payload: response.data });
    } catch (error) {
      console.error(
        "Error al intentar renderizar los muebles por name",
        error.message
      );
    }
  };
}
export const furnituresSortName = (order) => {
  return {
    type: FURNITURES_SORT_BY_NAME,
    payload: order,
  };
};

export function filterByPrice(minPrice, maxPrice) {
  return {
    type: FILTER_BY_PRICE,
    payload: { minPrice, maxPrice },
  };
}

export const furnituresSortPrice = (order) => {
  return {
    type: SORT_BY_PRICE,
    payload: order,
  };
};

export function prev() {
  return {
    type: PREV,
  };
}
export function next() {
  return {
    type: NEXT,
  };
}

// Actions.jsx
export const goToFirstPage = () => ({
  type: GO_TO_FIRST_PAGE,
});

export const goToLastPage = () => ({
  type: GO_TO_LAST_PAGE,
});


export function crearOrden(orden) {
  return async (dispatch) => {
    try {
      console.log("actions:::", orden);
      const URL = "https://backend-henry-pf.onrender.com/order/create";
      await axios.post(URL, orden);

      dispatch({ type: CREAR_ORDEN, payload: orden });
    } catch (error) {
      console.error("No se pudo crear el producto", error.message);
    }
  };
}


export const loginSuccess = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "https://backend-henry-pf.onrender.com/auth/login",
        form
      );
      const { tokenSession,data } = response.data;
      console.log("data", response.data);
      localStorage.setItem("token", tokenSession);
      localStorage.setItem("user", JSON.stringify({data}));
      dispatch({ type: LOGIN_SUCCESS, payload: tokenSession });
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };
};
export const loginGetUser = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("https://backend-henry-pf.onrender.com/user/auth", {
        headers: {
          Authorization: token,
        },
      });
      const user = response.data;
      getUserInfoFromLocalStorage()
      dispatch({ type: LOGIN_GET_USER, payload:user });
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return {
    type: LOGOUT,
  };
};

export function setState(email,estado){
  return async (dispatch) =>{
    try {
      const URL = `https://backend-henry-pf.onrender.com/order/update?email=${email}&estado=${estado}`
      await axios.put(URL)
    } catch (error) {
      console.log("no se pudo actualizar");
    }
  }
}

export function createEmail (email){
  return {
    type:CREATE_EMAIL,
    payload:email
  }
}

