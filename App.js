import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import BottomNavigator from './js/page/root/rootPage'

const AppStack = createStackNavigator({
      BottomNavigator:{
        screen:BottomNavigator,
        navigationOption:{
          headerShow:false
        }
      },
      
    },
    {
      mode:'modal',
      headerMode:'none'
    }
)
const TabNavigatorConfigs = {
  swipeEnabled:true
}
export default createAppContainer(AppStack,TabNavigatorConfigs)