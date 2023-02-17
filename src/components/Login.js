import React from "react";
import * as mestoAuth from '../utils/mestoAuth'
import '../components/styles/Login.css'
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      console.log('было нажатие на сабмит');
      return;
    }
    else {
      console.log('нажатие + else');

      mestoAuth.authorize(formValue.password, formValue.email)
        .then((data) => {
          if (data.token) {
            setFormValue({ email: '', password: '' });
            props.handleLogin();
            navigate('/', { replace: true });
            console.log('был найден data.jwt');
          }
        })
        .catch(err => console.log(err));
    }

  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2 className="login__header">Вход</h2>
        <input name="email" className="login__input" type="text" minLength="2" maxLength="40" placeholder="Email"
          onChange={handleChange} value={formValue.email} />
        {/* <span className="error input-name-error"></span> */}

        <input name="password" className="login__input" type="password" placeholder="Пароль"
          onChange={handleChange} value={formValue.password} />
        {/* <span class="error input-link-error"></span> */}

        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;