import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import { MakeProfile } from './MakeProfile';
import Home from './Home';
import SearchUser from './SearchUser';
import Direct from './Direct';
import CurrentUser from './CurrentUser';
import Explore from './Explore';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/profile' element={<MakeProfile />} />
          {(localStorage.getItem('loginEmail') != '' && localStorage.getItem('loginEmail')) &&
            <><Route exact path='/direct' element={<Direct />} />
              <Route exact path='/explore' element={<Explore />} />
              <Route exact path={localStorage.getItem("currUsername")} element={<SearchUser />} />
              <Route exact path={'/userprofile'} element={<CurrentUser />} />
            </>
          }
        </Routes>
      </Router>

    </main>
  );
}

export default App;
