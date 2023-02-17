import logo from '../images/Mesto.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  //console.log(props.data);
  // let email = props.data;
  // console.log(email);

  function signOut() {
    localStorage.removeItem('jwt');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className='header__container'>
        <p className='header__email'>{props.email}</p>
        <Link to={props.linkTo} className="header__link" onClick={signOut}>{props.linkName}</Link>
      </div>
    </header>
  );
}

export default Header;
