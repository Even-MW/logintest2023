import { render } from 'preact';
import test from '/test.svg';
import './style.css';
import { useEffect, useState } from 'preact/hooks';
import Register from './register';
import Login from './login';

export function App() {
	const [showRegister, setShowRegister] = useState(false);
	const [justRegisteredState, setJustRegisteredState] = useState(false);
	const justRegistered = JSON.parse(localStorage.getItem('justRegistered'))

	useEffect(() => {
		if (justRegistered) {
			setJustRegisteredState(true)
		}
		const localState = localStorage.getItem('state')

		if (localState) {
			if (localState === "active") {
				setShowRegister(true)
			} else {
				setShowRegister(false)
			}
		}

		setTimeout(() => {
			localStorage.removeItem('justRegistered')
			setJustRegisteredState(false)
		}, 5000)
	}, [setJustRegisteredState, justRegistered])

	function handleRegister() {
		if (showRegister) {
			localStorage.removeItem('state')
		} else {
			localStorage.setItem('state', 'active')
		}
		setShowRegister(!showRegister)
	}

	return (
		<div>
			<a href="https://playwright.dev/" target="_blank">
				<img src={test} style={{ fill: 'white' }} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>Tester brukerhåndtering med Jest & Playwright</h1>
			{justRegisteredState && (<div className="banner">Registrering fullført, logg inn under!</div>)}
			<section>
				{showRegister ? (
					<Register setShowRegister={handleRegister} />
				) : (
					<Login setShowRegister={handleRegister} />
				)
				}
			</section >
		</div >
	);
}

render(<App />, document.getElementById('app'));
