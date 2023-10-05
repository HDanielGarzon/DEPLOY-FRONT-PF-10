import { NavLink } from "react-router-dom";
import style from "./NotFound.module.css";



const NotFound = () => {
    return(
        <div className={style.bigDiv}>
            <div className={style.container}>
          <h1>Error 404: Page Not Found</h1>
        </div>
          <NavLink to="/"><button>Landing Page</button></NavLink>
        </div>
    )
}

export default NotFound;