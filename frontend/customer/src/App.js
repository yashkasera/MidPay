import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './util/firebaseConfig'

function App() {
  initializeApp(firebaseConfig);
  return (
    <Router >
      <Routes />
    </Router>
  );
}

export default App;
