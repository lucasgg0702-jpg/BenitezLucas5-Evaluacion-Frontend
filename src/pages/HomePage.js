import '../styles/components/pages/HomePage.css';

const HomePage = (props) => {
    return (
        <main className='holder'>
            <div>
                <img src='/img/home/Iglesia_Alvear.jpg' alt='Iglesia de Alvear' />
            </div>
            <div className='columnas'>
                <section className='bienvenidos'>
                    <h2>Bienvenidos a Come en Alvear</h2>
                    <p>La plataforma difital definitiva para 
                        descubrir los sabores de nuestro pueblo. Acá vas a encontrar una 
                        guía completa con los mejores restaurantes, cafeterías, bares y 
                        rotiserías de Alvear, Corrientes. Nuestro objetivo es conectar a los 
                        apasionados de la buena comida con los comercios locales, ofreciendo 
                        menús actualizados, ubicaciones y recomendaciones para disfrutar de 
                        una experiencia gastronómica única. ¡Recorré el pueblo a través de 
                        sus platos!
                    </p>
                </section>
                <section className='testimonios'>
                    <h2>Testimonios</h2>
                    <div className='testimonio'>
                        <span className='cita'>¡Excelente guía para elegir dónde cenar los fines de semana!</span>
                        <span className='autor'>Carlos Montegro - Vecino de Alvear</span>
                    </div>
                </section>
            </div>
        </main>

    );
}

export default HomePage;