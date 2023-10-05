import React from "react";
import styles from "./Faq.module.css";
import SimpleFooter from "../../components/FooterSimple/FooterSimple";

const Faq = () => {
  return (
    <div className={styles.faqContainer}>
      <div style={{ fontSize: "30px" }} className={styles.pageTitle}>
        Preguntas Frecuentes
      </div>
      <div className={styles.accordionContainer}>
        <div className={styles.accordionItem}>
          <div className={styles.accordionHeader}>
            ¿Cuáles son los métodos de pago aceptados?
          </div>
          <div className={styles.accordionBody}>
            Aceptamos diversas formas de pago, como tarjetas de crédito/débito
            (Visa, Mastercard, American Express) y envío de dinero a través de
            Stripe.
          </div>
        </div>
        <div className={styles.accordionItem}>
          <div className={styles.accordionHeader}>
            ¿Cuánto tiempo tarda en llegar mi pedido?
          </div>
          <div className={styles.accordionBody}>
            El tiempo de entrega puede variar según tu ubicación y el método de
            envío seleccionado. Por lo general, intentamos procesar y enviar los
            pedidos en un plazo de 1 a 3 días hábiles. Una vez enviado, el
            tiempo de entrega estimado dependerá del servicio de mensajería y la
            ubicación del destinatario.
          </div>
        </div>
        <div className={styles.accordionItem}>
          <div className={styles.accordionHeader}>
            ¿Tienen una tienda física donde puedo visitarlos?
          </div>
          <div className={styles.accordionBody}>
            Actualmente operamos exclusivamente en línea y no contamos con una
            tienda física. Sin embargo, nuestra tienda en línea está disponible
            las 24 horas del día, los 7 días de la semana para que puedas
            realizar tus compras cómodamente desde cualquier lugar.
          </div>
        </div>
        <div className={styles.accordionItem}>
          <div className={styles.accordionHeader}>
            ¿Qué hago si tengo un problema con mi pedido?
          </div>
          <div className={styles.accordionBody}>
            Si tienes algún problema con tu pedido, como productos dañados o
            faltantes, o cualquier otra consulta, te recomendamos contactar a
            nuestro servicio de atención al cliente lo antes posible. Estaremos
            encantados de ayudarte a resolver cualquier inconveniente.
          </div>
          <SimpleFooter/>
        </div>
      </div>
    </div>
  );
};

export default Faq;
