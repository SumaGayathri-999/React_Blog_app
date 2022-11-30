import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import AddEditBlog from './Pages/AddEditBlog';
import Blog from './Pages/Blog';
import NotFound from './Pages/NotFound';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header'


document.body.style.backgroundColor="aliceblue";


function App() {
  return (
    <BrowserRouter>
       <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/addblog' element={<AddEditBlog/>}></Route>
          <Route path='/editblog/:id' element={<AddEditBlog/>}></Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='*' element={<NotFound />}></Route>

        </Routes>
       </div>
    </BrowserRouter>
  );
}

export default App;
