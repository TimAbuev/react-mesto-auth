import logo from '../images/Mesto.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {/* <Link to="/sign-up" className="header__link">Регистрация</Link>
      <Link to="/sign-in" className="header__link">Войти</Link> */}

      <Link to={props.linkTo} className="header__link">{props.linkName}</Link>
      
    </header>
  );
}

export default Header;
