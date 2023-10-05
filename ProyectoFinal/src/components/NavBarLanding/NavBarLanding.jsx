import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import LogoNav from '../../assets/LogoDivano.jpg';


const NavBarLanding = () => {
  

  return (
    <div className={style.mainContainer}>
      <nav className={style.navbar}>
        <div>
        <div className={style.logo}>
          <Link to="/">
            <img src={LogoNav} alt="logo" />
          </Link>
        </div>
          <div className={style.divLink}>
            <Link className={style.container} to="/home">
              Products
            </Link>
            <div className={style.divLink}>
              <Link className={style.container} to="/contact">
                Contact
              </Link>
            </div>
            <div className={style.divLink}>
              <Link className={style.container} to="/about">
                About
              </Link>
            </div>
            <div className={style.divLink}>
              <Link className={style.container} to="/register">
                Register
              </Link>
            </div>
            <div className={style.divLink}>
              <Link className={style.container} to="/login">
                Login
              </Link>
            </div>
          </div>
        
        </div>
      </nav>
    </div>
  );
};

export default NavBarLanding;