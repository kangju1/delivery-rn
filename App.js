import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import {Root} from 'native-base';
import Router from './src/settings/router';

if(process.env.NODE_ENV === 'production') {
  console.log = ()=>{}
}

export default class App extends Component {

  render() {
    return (
        <Root>
          <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
          <Router/>
        </Root>
    );
  }
}
