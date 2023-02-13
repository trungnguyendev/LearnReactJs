import logo from './logo.svg';
import './App.scss';
import Header from './componets/Header/Header';
import { Outlet, Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
const App = () => {

  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>

      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>

    </div>
  )

}


// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello World ngu
//         </p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//       </header>
//     </div>
//   );
// }
export default App;
