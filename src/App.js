import React, { useState } from 'react';
import Numbers from './Numbers';
import './App.css';
import context from './context';
// import Pickcountry from './pickCountry';
import Graphss from './graphs';

function App() {
  const country = useState('global')

  return (
    <context.Provider value={country}>
      <div className="App">
        <h2>Covid-19 Tacker</h2>
        {/* <Pickcountry /> */}
        <Numbers />
        <Graphss />
      </div>
    </context.Provider>
  );
}

export default App;
