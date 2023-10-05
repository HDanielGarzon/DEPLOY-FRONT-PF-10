export function getToken() {
  return localStorage.getItem("token");
  
}

export const getUserInfoFromLocalStorage = () => {
  const userInfoJSON = localStorage.getItem("user");

  if (userInfoJSON) {
    try {
      const userInfo = JSON.parse(userInfoJSON);
      return userInfo;
    } catch (error) {
      console.error(
        "Error al analizar la información del usuario desde localStorage:",
        error
      );
    }
  }

  return null; 
};
