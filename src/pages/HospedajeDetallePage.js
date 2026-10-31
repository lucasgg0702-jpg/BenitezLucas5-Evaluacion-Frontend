import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/pages/HospedajeDetallePage.css';

function whatsappLink(telefono, mensaje) {
    return `https://wa.me/549${telefono}?text=${encodeURIComponent(mensaje)}`;
}

const HabitacionItem = ({ habitacion, telefono }) => {
    const [noches, setNoches] = useState(1);
    const [resultado, setResultado] = useState('');

    const calcularTotalEstadia = () => {
        const cantidadNoches = parseInt(noches, 10);
        if (isNaN(cantidadNoches) || cantidadNoches < 1) {
            setResultado('Mínimo 1 noche.');
            return;
        }
        const precioTotal = habitacion.precio * cantidadNoches;
        setResultado('Total: $' + precioTotal.toLocaleString('es-AR'));
    };

    const mensajeReserva = `Hola, vengo desde Come en Alvear y quisiera reservar: ${habitacion.numero}.`;

    return (
        <div className='habitacion' id={`habitacion-${habitacion.id}`} data-capacidad={habitacion.capacidad}>
            <div className='habitacion-info'>
                <h3 className='habitacion-numero'>{habitacion.numero}</h3>
                <p className='habitacion-capacidad'><strong>Capacidad:</strong> {habitacion.capacidad} {habitacion.capacidad === 1 ? 'Persona' : 'Personas'}</p>
                <p className='habitacion-precio'><strong>Precio por noche:</strong> ${habitacion.precio.toLocaleString('es-AR')}</p>
                <p className='habitacion-comodidades'><strong>Comodidades:</strong> {habitacion.comodidades}</p>
                <div className='cotizador'>
                    <label htmlFor={`noches-h${habitacion.id}`}>Noches:</label>
                    <input
                        type='number'
                        id={`noches-h${habitacion.id}`}
                        value={noches}
                        min='1'
                        onChange={(e) => setNoches(e.target.value)}
                    />
                    <button className='btn-calcular' onClick={calcularTotalEstadia}>Calcular Total</button>
                    <span className='resultado-precio'>{resultado}</span>
                </div>
                <div className='habitacion-acciones'>
                    <a href={whatsappLink(telefono, mensajeReserva)} target='_blank' rel='noopener noreferrer' className='enlace-reserva'>📱 Reservar</a>
                </div>
            </div>
            <div className='habitacion-galeria'>
                {habitacion.imagen && <img src={habitacion.imagen} alt={`Foto de ${habitacion.numero}`} />}
            </div>
        </div>
    );
}

const HospedajeDetallePage = () => {
    const { slug } = useParams();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        setCargando(true);
        setError(false);
        axios.get(`http://localhost:3000/api/hospedajes/${slug}/habitaciones`)
            .then(res => setDatos(res.data))
            .catch(() => setError(true))
            .finally(() => setCargando(false));
    }, [slug]);

    if (cargando) {
        return <main className='holder'><p>Cargando habitaciones...</p></main>;
    }

    if (error || !datos) {
        return <main className='holder'><p>No se encontró el hospedaje solicitado.</p></main>;
    }

    const { hospedaje, habitaciones } = datos;

    const visibles = habitaciones.filter((h) => {
        if (filtro === 'todas') return true;
        if (filtro === 'baja') return h.capacidad <= 2;
        return h.capacidad >= 3;
    });

    return (
        <main className='holder'>
            <section id='habitaciones'>
                <h1>Habitaciones de {hospedaje.nombre}</h1>
                <div className='filtros-contenedor'>
                    <span>Filtrar por tipo:</span>
                    <button className='btn-filtro' onClick={() => setFiltro('todas')}>Todas</button>
                    <button className='btn-filtro' onClick={() => setFiltro('baja')}>1 - 2 Personas</button>
                    <button className='btn-filtro' onClick={() => setFiltro('alta')}>3+ Personas</button>
                </div>

                {habitaciones.length > 0 && (
                    <div className='categorias-anclas'>
                        <span>Ir a Habitación:</span>{' '}
                        {habitaciones.map((h, i) => (
                            <span key={h.id}>
                                <a href={`#habitacion-${h.id}`}>{i + 1}</a>
                                {i < habitaciones.length - 1 && ' | '}
                            </span>
                        ))}
                    </div>
                )}

                {visibles.map((habitacion) => (
                    <HabitacionItem habitacion={habitacion} telefono={hospedaje.telefono} key={habitacion.id} />
                ))}
            </section>
        </main>
    );
}

export default HospedajeDetallePage;