import '../../styles/components/layout/Nav.css';
import { NavLink } from "react-router-dom";
const Nav = (props) => {
    return (
        <nav>
            <div className="holder">
                <ul>
                    <li>< NavLink to="/" className={({ isActive }) => isActive ? "activo" : undefined }>Home</NavLink> </li>
                    <li>< NavLink to="/locales" className={({ isActive }) => isActive ? "activo" : undefined }>Locales</NavLink> </li>
                    <li>< NavLink to="/hospedajes" className={({ isActive }) => isActive ? "activo" : undefined }>Hospedajes</NavLink> </li>
                    <li>< NavLink to="/historia" className={({ isActive }) => isActive ? "activo" : undefined }>Acerca de</NavLink> </li>
                    <li>< NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" : undefined }>Contacto</NavLink> </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;