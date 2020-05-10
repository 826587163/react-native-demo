import React, { Component } from 'react';
import {Text,View,StyleSheet,Alert} from 'react-native'

class homePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:props.name
         }
    }
    render() { 
      
        return ( 
            <View>
                <Text style={styels.font} onPress={this.props.itemClick}>{this.props.name}</Text>
            </View>
         );
    }
    
}
 const styels = StyleSheet.create({
     font:{
         fontSize:30
     }
 })
export default homePage;