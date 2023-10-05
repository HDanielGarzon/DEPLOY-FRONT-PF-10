import {
  GET_ALL_FURNITURES,
  GET_FURNITURES_BY_NAME,
  FURNITURES_SORT_BY_NAME,
  FILTER_BY_PRICE,
  LOGIN_SUCCESS,
  SORT_BY_PRICE,
  LOGIN_GET_USER,
  LOGOUT,
  PREV,
  NEXT,
  GO_TO_FIRST_PAGE,
  GO_TO_LAST_PAGE,
  CREAR_ORDEN,
  CREATE_EMAIL,
} from "./actions/ActionsTypes";

const initialState = {
  allFurnitures: [],
  allCategory: [],
  furnituresByName: [],
  temporal: [],
  selectFurnitures: null,
  selectDbFurnitures: null,
  numPage: 1,
  cantPage: 6,
  minPrice: "",
  maxPrice: "",
  orders: [],
  token: null,
  email: "",
  user: {},
};

export default function reducer(state = initialState, { type, payload }) {
  // console.log("Reducer type:", type); // Agregado para depuración
  // console.log("Reducer payload:", payload); // Agregado para depuración

  switch (type) {
    case GET_ALL_FURNITURES:
      return {
        ...state,
        allFurnitures: payload,
        temporal: payload,
      };
    case GET_FURNITURES_BY_NAME:
      return {
        ...state,
        furnituresByName: payload,
      };
    case FURNITURES_SORT_BY_NAME:
      const sortedFurnituresByName = [...state.allFurnitures];
      sortedFurnituresByName.sort((a, b) => {
        if (payload === "A") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return {
        ...state,
        allFurnitures: sortedFurnituresByName,
      };

    case FILTER_BY_PRICE:
      const { minPrice, maxPrice } = payload;
      const filteredFurnituresByPrice = state.temporal.filter((furniture) => {
        const price = parseFloat(furniture.price);
        return (
          (isNaN(minPrice) || price >= minPrice) &&
          (isNaN(maxPrice) || price <= maxPrice)
        );
      });
      return {
        ...state,
        allFurnitures: filteredFurnituresByPrice,
        minPrice, // Actualiza el estado del precio mínimo
        maxPrice, // Actualiza el estado del precio máximo
      };

    case SORT_BY_PRICE:
      const sortedFurnituresByPrice = [...state.allFurnitures];
      sortedFurnituresByPrice.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (payload === "ASC") {
          return priceA - priceB;
        } else if (payload === "DESC") {
          return priceB - priceA;
        }
      });
      return {
        ...state,
        allFurnitures: sortedFurnituresByPrice,
      };

    case CREAR_ORDEN:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case PREV:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case NEXT:
      return {
        ...state,
        numPage: state.numPage + 1,
      };

    case GO_TO_FIRST_PAGE:
      return {
        ...state,
        numPage: 1, // Cambia el número de página a 1 para ir a la primera página
      };

    case GO_TO_LAST_PAGE:
      return {
        ...state,
        numPage: state.cantPage, // Cambia el número de página a la última página
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
      };

    case CREATE_EMAIL:
      return {
        ...state,
        email: payload,
      };

    case LOGIN_GET_USER:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: {}, 
      };

    default:
      return { ...state };
  }
}
