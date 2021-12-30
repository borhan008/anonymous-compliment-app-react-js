import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import SendMsg from './components/sendmessage';
import Header from './components/header';
import { AuthProvider } from './components/userContext/userContext';
import { PrivateRouter } from './components/privateRouter';
import { PublicRouter } from './components/piblicRouter';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>

     <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Routes>
        <Route exact path="/" element={<PrivateRouter />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path=':sendUsername' element={<SendMsg />}  exact/>
          <Route path='/login' element={<PublicRouter/>} exact>
            <Route path='/login' element={<Login/>} exact />
          </Route>
           <Route path='/register' element={<PublicRouter/>} >
              <Route path='/register' element={<Register />} exact />  
            </Route>     
      </Routes>      
    </div>   
    </AuthProvider>

    </BrowserRouter>

  );
}

export default App;
