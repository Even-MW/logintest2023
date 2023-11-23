import { isValidEmail, isLongEnoughPassword, isValidPassword, logoutUser } from './functions';
import { useState } from 'preact/hooks';
import { MdErrorOutline, MdOutlineCheck } from "react-icons/md";

export interface ILoginProps {
    setShowRegister: () => void;
}

export default function Login({ setShowRegister }: ILoginProps) {
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validWhileWriting, setValidWhileWriting] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInUser: any = JSON.parse(localStorage.getItem('loggedInUser'))

    if (loggedInUser) {
        setLoggedIn(true)
    }

    const login = (event) => {
        event.preventDefault();
        const emailInput = event.target.elements.email;
        const passwordInput = event.target.elements.password;

        const emailValid = isValidEmail(emailInput.value)
        const passwordValid = isLongEnoughPassword(passwordInput.value)

        if (!emailValid) {
            setValidEmail(false)
        }

        if (!passwordValid) {
            setValidPassword(false)
        }

        if (emailValid && passwordValid) {
            setValidEmail(true)
            setValidPassword(true)

            const users: any = JSON.parse(localStorage.getItem('users'))
            const user = users.find(user => user.email === emailInput.value)

            if (!user) {
                setValidPassword(false)
                setValidEmail(false)
                return
            }

            if (emailInput.value === user.email && passwordInput.value === user.password) {
                setLoggedIn(true)
                localStorage.setItem('loggedInUser', JSON.stringify(user))
            } else {
                setValidPassword(false)
            }
        }
    }

    const onLoginInput = (event) => {
        const { value, name } = event.target

        if (name === 'email') {
            const valid = isValidEmail(value)
            setValidWhileWriting(valid)
        }

        setLoginState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const logout = () => {
        setLoggedIn(false)
        logoutUser()
    }

    if (loggedIn) {
        return (
            <div>
                <h2 data-testid="loggedInUser">Logget inn med, {loggedInUser?.email}</h2>
                <button onClick={logout}>Logg ut</button>
            </div>
        )
    }


    return (
        <form onSubmit={login}>
            <div>
                <label>
                    <span>Epost</span>
                    {loginState.email.length > 0 && (
                        <>
                            {!validEmail && <div className="invalid" role="alert">Feil passord eller epost</div>}
                            {!validWhileWriting ? <MdErrorOutline /> : <MdOutlineCheck />}
                        </>
                    )}
                </label>
                <input type="email" name="email" value={loginState.email} onInput={onLoginInput} required />
            </div>
            <div>
                <label>
                    <span>Passord</span>
                    {!validPassword && <span className="invalid">Feil passord eller epost</span>}
                </label>
                <input type="password" name="password" value={loginState.password} onInput={onLoginInput} required />
            </div>
            <div>
                <button type="submit">Logg inn</button>
                <button type="submit" class="simple-button" onClick={() => setShowRegister()}>Registrer</button>
            </div>
        </form >
    );
}
