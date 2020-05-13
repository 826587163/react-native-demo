import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BottomNavigator from './js/page/root/rootPage';
import HomeChild from './js/page/home/module/homeChild';

const AppStack = createStackNavigator(
  {
    BottomNavigatorHome: {
      screen: BottomNavigator,
      navigationOptions: ({navigation}) => {
        //console.log(navigation);

        return {
          headerTitle: '1',
        };
        // headerShow: true,
        // headerTitleAlign: 'center',
        // title: navigation.state.routeName,
      },
    },
    HomeChild: {
      screen: HomeChild,
      navigationOptions: ({navigation}) => {
        console.log(navigation);

        return {
          title: '子页面',
        };
        // headerShow: true,
        // headerTitleAlign: 'center',
        // title: navigation.state.routeName,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(AppStack);
