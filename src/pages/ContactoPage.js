import { useState } from 'react';
import axios from 'axios';
import '../styles/components/pages/ContactoPage.css';

const valoresIniciales = { nombre: '', email: '', telefono: '', mensaje: '' };

const ContactoPage = (props) => {
    const [form, setForm] = useState(valoresIniciales);
    const [alerta, setAlerta] = useState({ texto: '', clase: 'd-none' });
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, email, telefono, mensaje } = form;

        if (nombre.trim() === '' || email.trim() === '' || telefono.trim() === '' || mensaje.trim() === '') {
            setAlerta({
                texto: '⚠️ Por favor, completá todos los campos antes de enviar el formulario.',
                clase: 'alerta alerta-error',
            });
            return;
        }

        setEnviando(true);
        try {
            await axios.post('http://localhost:3000/api/contacto', form);
            setAlerta({
                texto: `¡Gracias ${nombre}! Tu mensaje fue recibido. Nos comunicaremos con vos a ${email} a la brevedad.`,
                clase: 'alerta alerta-exito',
            });
            setForm(valoresIniciales);
        } catch (error) {
            setAlerta({
                texto: '⚠️ Hubo un error al enviar el mensaje. Intentá de nuevo más tarde.',
                clase: 'alerta alerta-error',
            });
        }
        setEnviando(false);
    };

    const handleReset = () => {
        setForm(valoresIniciales);
        setAlerta({ texto: '', clase: 'd-none' });
    };

    return (
        <main className='holder'>
            <div className='contacto'>
                <h2>Contacto</h2>
                <p className='contacto-descripcion'>¿Sos dueño de un local y/o hospedaje, y
                    querés aparecer en el catálogo? ¿Tenés alguna sugerencia o consulta?
                    Completá el formulario y nos ponemos en contacto a la brevedad.
                </p>
                <div id='alerta-contacto' className={alerta.clase}>{alerta.texto}</div>
                <form id='form-contacto' className='formulario' onSubmit={handleSubmit} onReset={handleReset}>
                    <p>
                        <label htmlFor='nombre'>Nombre</label>
                        <input type='text' id='nombre' name='nombre' placeholder='Nombre completo' value={form.nombre} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Correo electrónico' value={form.email} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor='telefono'>Teléfono</label>
                        <input type='text' id='telefono' name='telefono' placeholder='Número de teléfono' value={form.telefono} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor='mensaje'>Mensaje</label>
                        <textarea id='mensaje' name='mensaje' placeholder='Escribí tu mensaje acá' value={form.mensaje} onChange={handleChange}></textarea>
                    </p>
                    <p className='acciones'>
                        <input type='reset' value='Borrar' />
                        <input type='submit' value='Enviar' disabled={enviando} />
                    </p>
                </form>
            </div>
        </main>
    );
}

export default ContactoPage;