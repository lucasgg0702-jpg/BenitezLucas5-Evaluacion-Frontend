import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/pages/MenuPage.css';

function whatsappLink(telefono, mensaje) {
    return `https://wa.me/549${telefono}?text=${encodeURIComponent(mensaje)}`;
}

const pesos = (n) => '$' + n.toLocaleString('es-AR');

const ControlCantidad = ({ valor, onChange }) => (
    <div className='control-cantidad'>
        <button
            type='button'
            className='control-cantidad-btn'
            onClick={() => valor > 1 && onChange(valor - 1)}
        >−</button>
        <span className='control-cantidad-valor'>{valor}</span>
        <button
            type='button'
            className='control-cantidad-btn'
            onClick={() => onChange(valor + 1)}
        >+</button>
    </div>
);

const ItemMenu = ({ item, onAgregar }) => {
    const [cantidad, setCantidad] = useState(1);

    const agregar = () => {
        onAgregar({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad
        });
        setCantidad(1);
    };

    return (
        <div className='menu'>
            <div className='menu-info'>
                <h3 className='menu-nombre'>{item.nombre}</h3>
                <p className='menu-descripcion'>{item.descripcion}</p>
                <p className='menu-precio'><strong>Precio:</strong> {pesos(item.precio)}</p>
                <div className='menu-carrito'>
                    <ControlCantidad valor={cantidad} onChange={setCantidad} />
                    <button type='button' className='enlace-ordenar' onClick={agregar}>🛒 Agregar</button>
                    <p className='menu-subtotal'>Subtotal: {pesos(cantidad * item.precio)}</p>
                </div>
            </div>
            <div className='menu-separador'></div>
            <div className='menu-imagen'>
                {item.imagen && <img src={item.imagen} alt={`Foto de ${item.nombre}`} />}
            </div>
        </div>
    );
};

const MenuPage = () => {
    const { slug } = useParams();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        setCargando(true);
        setError(false);
        setCarrito([]); // un carrito por local
        axios.get(`http://localhost:3000/api/locales/${slug}/menu`)
            .then(res => setDatos(res.data))
            .catch(() => setError(true))
            .finally(() => setCargando(false));
    }, [slug]);

    if (cargando) {
        return <main className='holder'><p>Cargando menú...</p></main>;
    }

    if (error || !datos) {
        return <main className='holder'><p>No se encontró el menú solicitado.</p></main>;
    }

    const { local, categorias } = datos;

    const agregarAlCarrito = (nuevo) => {
        setCarrito(prev => {
            const existente = prev.find(i => i.id === nuevo.id);
            if (existente) {
                return prev.map(i => i.id === nuevo.id ? { ...i, cantidad: i.cantidad + nuevo.cantidad } : i);
            }
            return [...prev, nuevo];
        });
    };

    const quitarDelCarrito = (id) => {
        setCarrito(prev => prev.filter(i => i.id !== id));
    };

    const enviarPedido = () => {
        if (carrito.length === 0) return;
        if (!local.telefono) {
            alert('Este local no tiene un número de WhatsApp configurado.');
            return;
        }
        let mensaje = 'Hola, vengo desde Come en Alvear y quisiera hacer el siguiente pedido:\n\n';
        carrito.forEach(i => {
            mensaje += `- ${i.nombre} x${i.cantidad}\n`;
        });
        window.open(whatsappLink(local.telefono, mensaje), '_blank');
    };

    const irAlResumen = () => {
        document.getElementById('carrito-resumen')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const totalItems = carrito.reduce((suma, i) => suma + i.cantidad, 0);
    const total = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);

    return (
        <main className='holder'>
            <section id='menus'>
                <h1>Menú de {local.nombre}</h1>
                <p className='aviso-menu'>Algunas imágenes de los platos son de carácter ilustrativo y han sido generadas mediante Inteligencia Artificial.</p>
                {local.menu_pdf_url && (
                    <p><a href={local.menu_pdf_url} download className='enlace-descargar'>Descargar menú completo</a></p>
                )}

                {categorias.length > 0 && (
                    <div className='categorias-anclas'>
                        <span>Saltar a:</span>{' '}
                        {categorias.map((categoria, i) => (
                            <span key={categoria.id}>
                                <a href={`#${categoria.slug}`}>{categoria.titulo}</a>
                                {i < categorias.length - 1 && ' | '}
                            </span>
                        ))}
                    </div>
                )}

                {categorias.map((categoria) => (
                    <div key={categoria.id}>
                        <h2 id={categoria.slug}>{categoria.titulo}</h2>
                        {categoria.avisos.map((aviso) => (
                            <p className='aviso-menu' key={aviso}>{aviso}</p>
                        ))}
                        {categoria.items.map((item) => (
                            <ItemMenu key={item.id} item={item} onAgregar={agregarAlCarrito} />
                        ))}
                    </div>
                ))}

                <section id='carrito'>
                    <p className='aviso-menu'>⚠️ Si el precio varía al confirmar el pedido con el local, contactanos desde la <Link to='/contacto'>sección Contacto</Link>.</p>
                    <h2 id='carrito-resumen'>Tu pedido</h2>

                    {carrito.length === 0 ? (
                        <div className='alerta alerta-error'>Todavía no agregaste ningún plato a tu pedido.</div>
                    ) : (
                        <>
                            <div className='carrito-lista'>
                                {carrito.map((item) => (
                                    <div className='carrito-item' key={item.id}>
                                        <span className='carrito-item-nombre'>{item.nombre} x{item.cantidad}</span>
                                        <div className='carrito-item-derecha'>
                                            <span className='carrito-item-subtotal'>{pesos(item.precio * item.cantidad)}</span>
                                            <button
                                                type='button'
                                                className='carrito-item-quitar'
                                                onClick={() => quitarDelCarrito(item.id)}
                                            >✕</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className='carrito-total-texto'>Total: {pesos(total)}</p>
                            <button type='button' className='enlace-ordenar' onClick={enviarPedido}>📱 Enviar pedido por WhatsApp</button>
                        </>
                    )}
                </section>
            </section>

            <button type='button' className='boton-carrito-flotante' onClick={irAlResumen}>
                🛒 <span>{totalItems}</span>
            </button>
        </main>
    );
}

export default MenuPage;