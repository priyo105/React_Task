import React from 'react';
import type {Node} from 'react';
import {SafeAreaView} from 'react-native';
import Home from './app/Home';
const App: () => Node = () => {
  return (
    <SafeAreaView >
           <Home></Home>
    </SafeAreaView>
  );
};
export default App;
