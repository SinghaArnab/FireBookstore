import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import  NavbarMain from '../src/Components/Navbar'
import FirebaseDB from './FirebaseContext/ConfigContext';
import AddBooks from './Components/AddBooks';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Bookspage from './Components/Bookspage';
import Bookdetails from './Components/Bookdetails';
import Bookscart from './Components/Bookscart';


function App() {

  return (
    <div className="App">
   <FirebaseDB>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavbarMain/>}>
           <Route index element={<Bookspage/>}/>
           <Route path='/Bookdetails/:BookId' element={<Bookdetails/>}/>
           <Route path='/Singup' element={<Signup/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/AddBooks' element={<AddBooks/>}/>
           <Route path='/BookCart' element={<Bookscart/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
    </FirebaseDB>
    </div>
  );
}

export default App;
