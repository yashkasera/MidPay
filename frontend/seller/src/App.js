import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './util/config'

function App() {
  initializeApp(firebaseConfig);
  return (
    <div className="App">
      <Router >
        <Routes />
      </Router>
    </div>
  );
}

export default App;
