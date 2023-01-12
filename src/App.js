import logo from './logo.svg';
import './App.scss';
import Header from './componets/Header/Header';
import { Link } from "react-router-dom";
const App = () => {

  return (
    <div className='app-container'>
      <Header />
      <div>
        <button><Link to="/user">go to user page</Link> </button>
        <button><Link to="/admin">go to admin page</Link> </button>
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
