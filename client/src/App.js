import { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/Header'
import Statistics from './components/Statistics'
import Workouts from './components/Workouts'
import LandingPage from'./components/LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import Footer from './components/Footer'


function App() {
	const [userState, setUserState] = useState({
		token : localStorage.getItem('token'),
	})
	
	const logIn = () => {
		setUserState({...userState, token: localStorage.getItem('token')})
	}

	const logOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user_id')
		localStorage.removeItem('isAuth')
		setUserState({...userState, token: localStorage.getItem('token')})
	}

	const verifyAuth = () => {
		const ls_token = localStorage.getItem('token');

		if (!ls_token) {
			return false;
		}
		return true;
	}


	const AuthRoute = ({ component: Component, ...rest }) => (
		<Route {...rest} render={props => (
			verifyAuth() ? (
				<Component {...props} />
			) : (
					<Redirect to={{ pathname: '/login' }} />
				)
		)} />
	)


	return (
		<>
			<BrowserRouter>
				<Header logOut={() => logOut()} logIn={() => logIn()}/>
					<Switch>

						<Route exact path="/" render={() => (
							localStorage.getItem("token") !== null ? <Redirect to="/workouts" /> : <LandingPage />
						)} />

						<Route exact path="/login" render={() => (
							localStorage.getItem("token") !== null ? <Redirect to="/workouts" /> : <Login logIn = { logIn } />
						)} />

						<Route exact path="/signup" render={() => (
							localStorage.getItem("token") !== null ? <Redirect to="/workouts" /> : <Register />
						)} />
						
						<AuthRoute exact path="/workouts" component={Workouts} />

						<AuthRoute exact path="/statistics" component={Statistics} />

						<Redirect to="/" />

					</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);

}

export default App;
