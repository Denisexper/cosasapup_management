import './Header.css';
import logo from '../logos/logo.png'; // Asegurate de tener el logo en esa ruta

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src={logo} alt="Logo de la empresa" className="logo" />
        <h1 className="company-name">COSASAPUP</h1>
      </div>
    </header>
  );
}

export default Header;
