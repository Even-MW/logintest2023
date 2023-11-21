import { useState } from "preact/hooks";
import { isValidEmail, isLongEnoughPassword, isValidPassword, checkPasswordStrength } from './functions';
import { MdErrorOutline, MdOutlineCheck } from "react-icons/md";

export interface IRegisterProps {
    setShowRegister: () => void;
}

export default function Register({ setShowRegister }: IRegisterProps) {
    const [registerState, setRegisterState] = useState({
        email: '',
        password: '',
        verifypassword: ''
    });
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [validWhileWriting, setValidWhileWriting] = useState(true);
    const [validPasswordWhileWriting, setValidPasswordWhileWriting] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState<'low' | 'medium' | 'high'>('low');

    const register = (event) => {
        event.preventDefault();
        const emailInput = event.target.elements.email;
        const passwordInput = event.target.elements.password;
        const passwordverifyInput = event.target.elements.verifypassword;

        const emailValid = isValidEmail(emailInput.value)
        const passwordValid = isValidPassword(passwordInput.value)
        const passwordsMatch = passwordInput.value === passwordverifyInput.value

        if (!passwordsMatch) {
            setPasswordMatch(false)
        }

        if (!emailValid) {
            setValidEmail(false)
        }

        if (!passwordValid) {
            setValidPassword(false)
        }

        if (emailValid && passwordValid && passwordsMatch) {
            console.log('Register successful');
            localStorage.setItem('justRegistered', 'true')
            setValidEmail(true)
            setValidPassword(true)
            setPasswordMatch(true)
            const user = {
                email: emailInput.value,
                password: passwordInput.value
            }

            if (localStorage.getItem('users')) {
                const users = JSON.parse(localStorage.getItem('users'))
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users))
            } else {
                const users = [user]
                localStorage.setItem('users', JSON.stringify(users))
            }



            setShowRegister()
        }
    }

    const onRegisterInput = (event) => {
        const { value, name } = event.target

        if (name === 'email') {
            const valid = isValidEmail(value)
            setValidWhileWriting(valid)
        }

        if (name === 'password') {
            const valid = isValidPassword(value)
            setValidPasswordWhileWriting(valid)
            setPasswordStrength(checkPasswordStrength(value))
        }

        setRegisterState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(passwordStrength)

    return (
        <form onSubmit={register}>
            <div>
                <label>
                    <span>Din epost</span>
                    {registerState.email.length > 0 && (
                        <>
                            {!validEmail && <span className="invalid">Ugyldig epost, prøv igjen.</span>}
                            {!validWhileWriting ? <MdErrorOutline /> : <MdOutlineCheck />}
                        </>
                    )}
                    {!validEmail && <span className="invalid">Ugyldig epost, prøv igjen.</span>}
                </label>
                <input type="email" name="email" value={registerState.email} onInput={onRegisterInput} pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/" required />
            </div>
            <div>
                <label>
                    <span>Skriv passord</span>
                    {!validPassword && <span className="invalid">Passordet du har valgt er ikke gyldig</span>}
                    {registerState.password.length > 0 && (
                        <>
                            {!validPasswordWhileWriting ? <MdErrorOutline /> : <MdOutlineCheck />}
                        </>
                    )}
                </label>

                <input type="password" name="password" value={registerState.password} onInput={onRegisterInput} required />
                {registerState.password.length > 0 && (
                    <div className="password-strength__bar">
                        <div className={`password-strength__bar ${passwordStrength === 'low' ? 'password-strength__bar--low' : ''} ${passwordStrength === 'medium' ? 'password-strength__bar--medium' : ''} ${passwordStrength === 'high' ? 'password-strength__bar--strong' : ''}`}></div>
                        <div className={`password-strength__bar ${passwordStrength === 'low' ? 'password-strength__bar--default' : ''} ${passwordStrength === 'medium' ? 'password-strength__bar--medium' : ''} ${passwordStrength === 'high' ? 'password-strength__bar--strong' : ''}`}></div>
                        <div className={`password-strength__bar ${passwordStrength === 'low' ? 'password-strength__bar--default' : ''} ${passwordStrength === 'medium' ? 'password-strength__bar--default' : ''} ${passwordStrength === 'high' ? 'password-strength__bar--strong' : ''}`}></div>
                    </div>
                )}

            </div>
            <div>
                <label>
                    <span>Gjenta passord</span>
                    {!passwordMatch && <span className="invalid">Passordet stemmer ikke med det over</span>}
                </label>
                <input type="verifypassword" name="verifypassword" value={registerState.verifypassword} onInput={onRegisterInput} required />
            </div>
            <div>
                <button type="submit">Registrer meg</button>
                <button type="submit" class="simple-button" onClick={() => setShowRegister()}>Avbryt</button>
            </div>
        </form>
    );
}
