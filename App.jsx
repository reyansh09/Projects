import React from 'react';
import TabNavigation from './src/navigation/TabNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';




function App(){

  return (
  <Provider store={store}>
<TabNavigation/>
  </Provider>
    
   
  );
}

export default App;