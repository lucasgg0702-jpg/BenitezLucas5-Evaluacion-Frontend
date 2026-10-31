import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/components/pages/LocalesPage.css'

const LocalesPage = (props) => {
    const [locales, setLocales] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/locales')
            .then(res => setLocales(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <main className='holder'>
            <section className='locales'>
                <h2>Locales</h2>
                {locales.map(local => (
                    <div className='local' key={local.id}>
                        <div className='local-info'>
                            <h3 className='local-nombre'>{local.nombre}</h3>
                            <p className='local-direccion'><strong>Dirección:</strong> {local.direccion}</p>
                            <p className='local-horario'><strong>Horario:</strong> {local.horario}</p>
                            <p className='local-numero'><strong>Contacto:</strong> {local.telefono}</p>
                        </div>
                        {local.tags && (
                            <div className='local-etiquetas'>
                                {local.tags.split(',').map((tag, i) => (
                                    <span className='etiqueta-gastronomica' key={i}>{tag.trim()}</span>
                                ))}
                            </div>
                        )}
                        <p className='local-delivery'>
                            <strong>Delivery:</strong>{' '}
                            {local.delivery_precio
                                ? <span className='delivery-disponible'>Disponible - ${local.delivery_precio}</span>
                                : <span>No disponible</span>}
                        </p>
                        <div className='local-acciones'>
                            {local.mapa_url && (
                                <a href={local.mapa_url} target='_blank' rel='noopener noreferrer' className='enlace-mapa'>📍 Cómo llegar</a>
                            )}
                            <a href={`/menu/${local.slug}`} className='enlace-menu'>Ver Menú</a>
                        </div>
                        <div className='local-imagen'>
                            {local.imagen && <img src={local.imagen} alt={local.nombre} />}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default LocalesPage;