import React from 'react'
//导入底部导航栏组件
import {createBottomTabNavigator } from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/FontAwesome'
//导入底部导航栏3个相关页面
import HomePage from '../home/home'
import ClassifyPage from '../classify/classify'
import MePage from '../me/me'

//定义底部导航栏
const BottomNavigator = createBottomTabNavigator({
    Home:{
        screen:HomePage,
        navigationOptions:{
            title:'首页',
            tabBarLabel:'首页',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={'id-card'}
                  size={26}
                  style={{ color: tintColor }}
                />
              ),
        }
    },
    Cate:{
        screen:ClassifyPage,
        navigationOptions:{
            title:'分类',
            tabBarLabel:'分类',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={'bars'}
                  size={26}
                  style={{ color: tintColor }}
                />
              ),
        }
    },
    Me:{
        screen:MePage,
        navigationOptions:{
            title:'我的',
            tabBarLabel:'我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={'user-circle-o'}
                  size={26}
                  style={{ color: tintColor }}
                />
              ),
        }
    }

})

export default BottomNavigator