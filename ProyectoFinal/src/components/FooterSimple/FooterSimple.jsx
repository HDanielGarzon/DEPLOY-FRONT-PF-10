import React from 'react';
import styles from './FooterSimple.module.css';

const SimpleFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} DIVANO - Todos los derechos reservados</p>
        <p>Correo Electrónico: info@divano.com</p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
