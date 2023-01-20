import logo from './logo.svg';
import './App.scss';
import MyComponent from './componets/MyComponent';

// const App = () => {

//   return (
//     <div className='app-container'>
//       <MyComponent></MyComponent>
//     </div>
//   )
// }


const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World ngu
        </p>
        <div>Count = {count}</div>
        <button onClick={() => dispatch(increaseCounter())}>Increase</button>
        <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
      </header>
    </div>
  );
}
export default App;
