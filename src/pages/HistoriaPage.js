import '../styles/components/pages/HistoriaPage.css';

const HistoriaPage = (props) => {
    return (
        <main className='holder'>
            <div className='columnas'>
                <div className='desarrollador'>
                    <div className='perfil-foto'>
                        <img src='/img/historia/nosotros1.jpg' alt='Lucas Yoel Benitez' />
                    </div>
                    <h3>Lucas Yoel Benitez</h3>
                    <h4>Estudiante de la Tecnicatura Superior en Desarrollo de Software</h4>
                    <p>¡Hola! Soy el desarrollador detrás de Come en Alvear. Llevo adelante
                        este proyecto impulsado por mi camino en el mundo de la programación
                        y el diseño web, buscando aplicar herramientas técnicas modernas para
                        crear soluciones reales, prácticas y eficientes que tengan un impacto
                        directo en el día a día de nuestra localidad.
                    </p>
                </div>
                <div className='historia-proyecto'>
                    <h2>Historia del Proyecto</h2>
                    <h3>Nacimiento del proyecto</h3>
                    <p>Este sitio nació como proyecto escolar como parte de mi formación
                        en desarrollo web, pero con una motivación que va más allá del
                        aula: quería crear algo útil para mi localidad. Alvear merece tener
                        su espacio digital donde vecinos y visitantes puedan encontrar
                        información actualizada sobre sus locales gastronómicos.
                    </p>
                    <h3>Futuro del proyecto</h3>
                    <h4>Lanzamiento oficial</h4>
                    <p>Este proyecto aún está en desarrollo, pero el objetivo final es
                        claro: lanzar la plataforma de manera oficial como el sitio de
                        referencia gastronómica de Alvear. La idea es que cualquier
                        persona, ya sea vecino o visitante, pueda consultarla antes de
                        salir y encontrar exactamente lo que busca, con información actualizada
                        sobre locales, menús, horarios y opciones de delivery. Además, contamos
                        con una sección de hospedajes pensada para quienes visiten la localidad,
                        para que puedan planificar su estadía en un solo lugar.
                    </p>
                    <h4>Aplicación móvil</h4>
                    <p>A futuro, se tiene planeado expandirla a una aplicación móvil, para
                        que la experiencia sea aún más accesible y cómoda. Desde el celular
                        cualquier persona podría explorar los locales, ver los menús con
                        fotos y precios, consultar opciones de alojamiento y contactar
                        directamente al local para hacer su pedido.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default HistoriaPage;