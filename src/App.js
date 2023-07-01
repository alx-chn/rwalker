import React, {useState} from 'react';
import RandomWalk from './components/RandomWalk';
import EnquiryForm from './components/EnquiryForm';

function App() {
  const [symbol, setSymbol] = useState('');
  return (
    <div>
      {/* it's a component */}
      <EnquiryForm symbol = {symbol} setSymbol = {setSymbol}/> 
      <RandomWalk symbol = {symbol}/>
    </div>
  );
}

// import React, { useState } from 'react';


// function App() {
//   const [count, setCount] = useState(0); this is the prop

//   return (
//     <div>
//       <ComponentA count={count} /> pass the prop, count in A ==  prop of App
//       <ComponentB count={count} setCount={setCount} />
//     </div>
//   );
// }


// function ComponentA(props) {
//   return (
//     <div>
//       <h2>Component A</h2>
//       <p>Count: {props.count}</p>
//     </div>
//   );
// }

// function ComponentB(props) {
//   const handleClick = () => {
//     props.setCount(props.count + 1);
//   };

//   return (
//     <div>
//       <h2>Component B</h2>
//       <p>Count: {props.count}</p>
//       <button onClick={handleClick}>Increment</button>
//     </div>
//   );
// }


export default App;