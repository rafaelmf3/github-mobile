import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';

export default function Application() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#006437"/>
      <Routes />
    </>
  );
}


