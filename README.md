# Come en Alvear — Frontend

Frontend de **Come en Alvear**, la guía gastronómica y de hospedajes de Alvear (Corrientes). Es una aplicación de una sola página (SPA) hecha en React que muestra los locales con sus menús y los hospedajes con sus habitaciones, y que consume la API del [backend](https://github.com/TU-USUARIO/come-en-alvear-back).

> Visión general del proyecto completo (frontend + backend): [come-en-alvear](https://github.com/TU-USUARIO/come-en-alvear)

## Funcionalidades

- **Locales**: listado con etiquetas, horario, contacto, información de delivery y link "Cómo llegar".
- **Menú por local**: categorías con navegación por anclas y carrito de pedido (cantidades, subtotal y total). El pedido se envía por WhatsApp al local. Cada local tiene su propio carrito, que se vacía al cambiar de menú.
- **Hospedajes**: listado y detalle de cada hospedaje con sus habitaciones, filtro por capacidad (1–2 o 3+ personas), cotizador de noches y reserva por WhatsApp.
- **Contacto**: formulario controlado con validación; el mensaje llega por mail a través del backend.
- **Inicio** y página institucional (historia / acerca de).

## Tecnologías

- React
- React Router (rutas y parámetros dinámicos `:slug`)
- Axios
- CSS propio por componente (paleta bordó `#7b1d1d` y dorado `#c9952a`, tipografías Playfair Display y Lato)
- Create React App (`react-scripts`)

## Requisitos

- Node.js 18 o superior
- El [backend](https://github.com/TU-USUARIO/come-en-alvear-back) en funcionamiento (por defecto en `http://localhost:3000`)

## Instalación y ejecución

```bash
npm install
npm start
```

El backend usa el puerto 3000, así que React va a proponer levantar el frontend en el **3001**: aceptá la sugerencia. Sin el backend corriendo, las páginas que piden datos quedan vacías o muestran un mensaje de error.

### Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `build/` |
| `npm test` | Ejecuta los tests |

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/locales` | Listado de locales |
| `/menu/:slug` | Menú de un local (por ejemplo `/menu/good-food`) |
| `/hospedajes` | Listado de hospedajes |
| `/hospedajes/:slug` | Detalle de un hospedaje con sus habitaciones |
| `/historia` | Historia / acerca de |
| `/contacto` | Formulario de contacto |

El `slug` es el que se carga en el panel de administración del backend: una sola página sirve para todos los locales y hospedajes.

## Conexión con el backend

| Página | Endpoint |
| --- | --- |
| `LocalesPage` | `GET /api/locales` |
| `HospedajesPage` | `GET /api/hospedajes` |
| `MenuPage` | `GET /api/locales/:slug/menu` |
| `HospedajeDetallePage` | `GET /api/hospedajes/:slug/habitaciones` |
| `ContactoPage` | `POST /api/contacto` |

Hoy la URL base (`http://localhost:3000`) está escrita directamente en cada uno de esos componentes. Antes de publicar el sitio hay que centralizarla en una variable de entorno (en Create React App, `REACT_APP_API_URL`) y apuntarla al backend desplegado. Las variables del frontend quedan visibles en el navegador, así que ahí va solamente la URL, nunca credenciales.

## Estructura del proyecto

```
src/
├── App.js                      # Router + Header/Nav/Footer envolviendo las rutas
├── components/layout/          # Header, Nav, Footer
├── pages/                      # una página por ruta
│   ├── HomePage.js
│   ├── LocalesPage.js
│   ├── MenuPage.js             # menú genérico + carrito
│   ├── HospedajesPage.js
│   ├── HospedajeDetallePage.js # habitaciones, filtro y cotizador
│   ├── HistoriaPage.js
│   └── ContactoPage.js
└── styles/components/          # un .css por componente (layout/ y pages/)
public/                         # logo e imágenes estáticas
```

## Cómo se muestran los datos

- **Precios**: la API los entrega como número y el frontend les da formato con `toLocaleString('es-AR')`.
- **Teléfonos**: se guardan como 10 dígitos. El formato visible es `+54 XXXX XX-XXXX` y el link de WhatsApp se arma como `https://wa.me/549<teléfono>`.
- **Mensajes de WhatsApp y textos `alt` de las imágenes**: se generan a partir del nombre del plato o de la habitación.
- **Imágenes**: llegan como URL de Cloudinary desde la API; si un registro no tiene imagen, simplemente no se muestra.
- **Menú y habitaciones**: muestran "Cargando…" mientras esperan la respuesta y un mensaje de error si el `slug` no existe o la API no responde.
