import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <p>Correo Electrónico: info@divano.com</p>
          <p>Teléfono: +1 123-456-7890</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Preguntas Frecuentes</h3>
          <ul>
            <li><Link  style={{fontSize: '18px'}} to="/faq">¿Preguntas Frecuentes?</Link></li>
            {/* <li><Link to="/envios">Envíos y Entregas</Link></li>
            <li><Link to="/devoluciones">Devoluciones</Link></li> */}
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Nosotros</h3>
          <p>¿Quienes Somos?</p>
          <p>Somos DIVANO, tu tienda de muebles de vanguardia</p>
          <p >Te invitamos a visitar nuestro <Link style={{fontSize: '18px'}} to='/about' className={styles.aboutLink}>About</Link></p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} DIVANO - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
