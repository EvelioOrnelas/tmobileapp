import React, { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/Navbar'
import Overview from './routes/overview'
import Devices from './routes/devices'
import Statistics from './routes/statistics'
//import useToken from './components/useToken'
//import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [/*isShowLogin, */setIsShowLogin] = useState(false);
  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin)
  }

  // const { token, setToken } = useToken();
  // if(!token) {
  //   return <NavBar setToken={setToken} />
  // }
  return (        
    <div >
      <NavBar handleLoginClick={handleLoginClick}/>           
      <Router>   
        <Routes>        
          <Route exact path='/' element={<Overview/>}/>
          <Route exact path='/overview' element={<Overview/>}/>
          <Route exact path='/devices' element={<Devices/>}/>
          <Route exact path='/statistics' element={<Statistics/>}/>
        </Routes>
      </Router>
      {/* <Footer/> */}
    </div>
);
}

export default App;