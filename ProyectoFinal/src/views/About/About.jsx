import React from 'react';
import styles from './About.module.css'; 
import FooterSimple from '../../components/FooterSimple/FooterSimple';
import perfil01 from './assets/perfil01.jpeg'
import perfil02 from './assets/perfil02.jpg'


export default function About() {
    return (
        <section className={styles['about-container']}>
            <div className={styles.about}>
                <h1>🌟 ¡BIENVENIDOS A DIVANO! 🌟</h1>
                <p>
                "<strong>Divano</strong> es tu ecommerce de <strong>muebles en línea</strong>. Somos un equipo de cuatro apasionados programadores en pleno aprendizaje y desarrollo en el prestigioso bootcamp de Full Stack Developer de <strong>Henry</strong>. Nuestra misión es proporcionarte una <strong>experiencia de compra de muebles en linea excepcional</strong>. Hemos diseñado nuestro sitio web para que puedas buscar y renovar tus muebles favoritos de <strong>forma rápida y sencilla</strong>. Además, garantizamos la máxima seguridad de tus datos personales y de pago, para que puedas comprar con total confianza."
                </p>
            </div>
            <h1 className={styles['tech-title']}>Used technologies:</h1>
            <div className={styles['tech-container']}>
                <div className={styles.javascript}>
                    <img className={styles['img-javascript']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="" />
                    <h1 className={styles['text-javascript']}>Javascript</h1>
                </div>
                <div className={styles.html}>
                    <img className={styles['img-html']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="" />
                    <h1 className={styles['text-html']}>HTML</h1>
                </div>
                <div className={styles.css}>
                    <img className={styles['img-css']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="" />
                    <h1 className={styles['text-css']}>CSS</h1>
                </div>
                <div className={styles.react}>
                    <img className={styles['img-react']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="" />
                    <h1 className={styles['text-react']}>React</h1>
                </div>
                <div className={styles.redux}>
                    <img className={styles['img-redux']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="" />
                    <h1 className={styles['text-redux']}>Redux</h1>
                </div>
                <div className={styles.express}>
                    <img className={styles['img-express']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="" />
                    <h1 className={styles['text-express']}>Express</h1>
                </div>
                <div className={styles.PostgreSQL}>
                    <img className={styles['img-PostgreSQL']} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="" />
                    <h1 className={styles['text-PostgreSQL']}>PostgreSQL</h1>
                </div>
                <div className={styles.Vite}>
                    <img className={styles['img-Vite']} src="https://logospng.org/wp-content/uploads/vite-js-logo.png" alt="" />
                    <h1 className={styles['text-Vite']}>Vite</h1>
                </div>
            </div>
            <div className={styles['team-section']}>
                <h1 className={styles['tech-title']}>Nuestro equipo de desarrollo:</h1>
                <div className={styles['team-members']}>

                <div className={styles['team-members']}>
                    <div className={styles['team-member']}>
                        <img className={styles.foto} src={perfil01} alt="Miembro del Equipo 1" />
                        <h3>Cristian Veliz</h3>
                        <a href="https://www.linkedin.com/in/cristian-veliz-3aa54126a/">LinkedIn</a>
                    </div>
                    <div className={styles['team-member']}>
                        <img className={styles.foto} src={perfil02} alt="Miembro del Equipo 2" />
                        <h3>Lautaro Nieva</h3>
                        <a href="https://www.linkedin.com/in/lautaro-nieva/">LinkedIn</a>
                    </div>
                    <div className={styles['team-member']}>
                        <img className={styles.foto} src={perfil02} alt="Miembro del Equipo 2" />
                        <h3>Juan Aldama</h3>
                        <a href="https://www.linkedin.com/in/daniel-garz%C3%B3n-3b5700217/">LinkedIn</a>
                    </div>
                    <div className={styles['team-member']}>
                        <img className={styles.foto} src={perfil02} alt="Miembro del Equipo 2" />
                        <h3>Daniel Garzón</h3>
                        <a href="https://www.linkedin.com/in/daniel-garz%C3%B3n-3b5700217/">LinkedIn</a>
                    </div>
                    
                </div>
                </div>
            </div>
            <FooterSimple />
        </section>
    );
}

