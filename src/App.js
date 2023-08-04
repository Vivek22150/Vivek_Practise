
import './App.css';
// import Home from './components/Home';
import Add from './components/Add';
// import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {incNumber,decNumber} from './actions/index';
import Shop from './components/Shop';
import TextForm from './components/TextForm';


function App() {
  const myState = useSelector((state) => state.changeTheNUmber);
  const dispatch = useDispatch();
  return (
    // <div className="App">
    //  <Router>
    //   <Routes>
    //     <Route path='/' element={<Home/>}> </Route>
    //     <Route path='/create' element={<Add/>}></Route>
    //   </Routes>
    //  </Router>
    // </div>

    // <>
    // <div className="container">
    //   <h1>Increment/Decrement counter</h1>
    //   <div className="quantity">
    //     <a className="quantity__minus" title="Decrement" onClick={()=>dispatch(decNumber())}> <span> - </span></a>
    //     <input name="quantity" type="text" className="quantity__input" value={myState} />
    //     <a className="quantity_plus" title="Increment" onClick={()=>dispatch(incNumber())}> <span> + </span></a>
    //   </div>
    // </div>
    // </>
    <>
      {/* Redux Example
<Add/>
    <div className='App'>
     <Shop/>
    </div> */}

      {/* Props Example
     <TextForm title="TextUtils"/> */}

     
    </>
  );
}

export default App;
