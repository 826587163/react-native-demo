import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity,TextInput, Slider} from 'react-native'
import HomePage from './HomePage'

class WelcomePage extends Component {
  constructor(props, context) {
      super(props);
      this.state={
          name:'马骏牛逼',
          user:''
      }
  }
  
    render() { 
        return ( 
            <View>
               <TextInput placeholder='请输入' style={styles.input} onChangeText={this.handleUser}></TextInput>
               <TouchableOpacity onPress={()=>this.submitClick(this.state.user)} style={{backgroundColor:'red',width:70}}>
                   <Text style={{fontSize:30}}>提交</Text>
               </TouchableOpacity>
                {/* <HomePage name={this.state.name} itemClick={()=>{this.uodateState()}}></HomePage> */}
                {/* <Image style={{width: 320, height:180}} source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}/> */}
            </View>
         );
    }
    submitClick(user){
        alert(user)
    }
    handleUser = (text) =>{
        this.setState({
            user:text
        })
        console.log(this.state.user)
    }
    uodateState(){
        console.log('1111')
        const name = this.state.name =='马骏牛逼'?"马骏是真牛逼":"马骏不是太牛逼"
        this.setState({
            name:name
        })

    }
}
const styles = StyleSheet.create({
    viewdis:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    textStyle:{
        
        fontSize:30,
        color:'red',
        margin:20
    },
    input:{
        borderStyle:"solid",
        borderWidth:1,
        borderColor:'#999',
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto'
    }
})
 
export default WelcomePage;
