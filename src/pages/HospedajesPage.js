import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/components/pages/HospedajesPage.css';

const HospedajesPage = (props) => {
    const [hospedajes, setHospedajes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/hospedajes')
            .then(res => setHospedajes(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <main className='holder'>
            <section className='hospedajes'>
                <h2>Hospedajes</h2>
                {hospedajes.map(hospedaje => (
                    <div className='hospedaje' key={hospedaje.id}>
                        <div className='hospedaje-info'>
                            <h3 className='hospedaje-nombre'>{hospedaje.nombre}</h3>
                            <p className='hospedaje-direccion'><strong>Dirección:</strong> {hospedaje.direccion}</p>
                            <p className='hospedaje-tipo'><strong>Tipo:</strong> {hospedaje.tipo}</p>
                            <p className='hospedaje-horario'><strong>Horario de ingreso:</strong> {hospedaje.horario_ingreso}</p>
                            <p className='hospedaje-numero'><strong>Contacto:</strong> {hospedaje.telefono}</p>
                            {hospedaje.tags && (
                                <div className='hospedaje-etiquetas'>
                                    {hospedaje.tags.split(',').map((tag, i) => (
                                        <span className='etiqueta-hospedaje' key={i}>{tag.trim()}</span>
                                    ))}
                                </div>
                            )}
                            <div className='hospedaje-acciones'>
                                {hospedaje.mapa_url && (
                                    <a href={hospedaje.mapa_url} target='_blank' rel='noopener noreferrer' className='enlace-mapa'>📍 Cómo llegar</a>
                                )}
                                <a href={`/hospedajes/${hospedaje.slug}`} className='enlace-whatsapp'>Ver Habitaciones</a>
                            </div>
                        </div>
                        <div className='hospedaje-imagen'>
                            {hospedaje.imagen && <img src={hospedaje.imagen} alt={hospedaje.nombre} />}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default HospedajesPage;