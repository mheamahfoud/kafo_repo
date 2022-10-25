import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSnackbar } from 'notistack';
import Login from './Login';
import './App.scss'
const mode = 'login';
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import  logoKafo  from '../kafo_icon.svg'
import { CSidebar, CAvatar,CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { LoginAuth } from '../api/auth';
const LoginComponent = ({ ...props }) => {
    const { t } = useTranslation();
    const [mode, setMode] = useState(props.mode)
    const [email, setEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    const [passWord, setPassword] = useState(null)
    const toggleMode = () => {
        //var newMode = this.state.mode === 'login' ? 'signup' : 'login';
        // this.setState({ mode: newMode });
    }
    const { enqueueSnackbar } = useSnackbar();
    const login = () => {
        LoginAuth(userName, passWord, 'false').then((result) => {
            if (result.success) {
                localStorage.setItem("token", JSON.stringify(result.data.token));
                localStorage.setItem("user", JSON.stringify(result.data.user));
                window.location.href = '/';
            }
            else {
                enqueueSnackbar(result.error_description, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                });
            }
        })
    }

    return (
        <div>
            <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header" style={{ textAlign: 'center' }}>
                    <CAvatar src={logoKafo} size="md" height={35} />
                    {<h1>{mode === 'login' ? 'Login' : 'Sign up'}</h1>}
                      
                </header>

                <div className="form-block__input-wrapper">
                    <div className="form-group form-group--login">
                        <input required={true} className="form-group__input" type="text" id="email" placeholder='userName' label="User Name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                        <input  required={true} className="form-group__input" type="password" id="password" placeholder='Password' label="password"  value={passWord} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                   
                </div>
                <button className="button button--primary full-width" onClick={login}>Login</button>

            </section>
        </div>
    )

}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form >
                <div className="form-block__input-wrapper">
                    <div className="form-group form-group--login">
                        <input className="form-group__input" type="text" id="username" label="user name" disabled={mode === 'signup'} value={userName} onChange={(e) => { alert(JSON.stringify(e)) }} />
                        <input className="form-group__input" type="password" id="password" label="password" disabled={mode === 'signup'} />
                    </div>
                    <div className="form-group form-group--signup">
                        <Input type="text" id="fullname" label="full name" disabled={mode === 'login'} />
                        <Input type="email" id="email" label="email" disabled={mode === 'login'} />
                        <Input type="password" id="createpassword" label="password" disabled={mode === 'login'} />
                        <Input type="password" id="repeatpassword" label="repeat password" disabled={mode === 'login'} />
                    </div>
                </div>
                <button className="button button--primary full-width" type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
            </form>
        )
    }
}

const Input = ({ id, type, label, disabled, onChange, value }) => (
    <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} onChange={onChange} value={value} />
);

const App = () => (
    <SnackbarProvider maxSnack={1} preventDuplicate>
        <div className={`app app--is-${mode}`}>
            <LoginComponent
                mode={mode}

            />
        </div>
    </SnackbarProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));

/*
  <div className="form-block__toggle-block">
                          {/* /* <CAvatar src={logoKafo} size="sm" height={25}   />
                            <span>{this.state.mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={this.toggleMode.bind(this)} />
                            <label htmlFor="form-toggler"></label>
                        </div> */ 