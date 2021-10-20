import Routes from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {initializeApp} from 'firebase/app';
import firebaseConfig from './util/config'
import {getAuth} from "firebase/auth";

function App() {
    initializeApp(firebaseConfig);
    getAuth().onIdTokenChanged(async function (user) {
        user && sessionStorage.setItem("idToken", (await user.getIdTokenResult()).token);
    });
    return (
        <div className="App">
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;
