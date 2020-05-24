import React, {Component} from 'react';
import { Grid } from '@ant-design/react-native'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
class NestedTvRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {}
  render() {
    //const {navigation} = this.props;
    return (
      <View>
        <Text style={{height: 30, margin: 10}}>
          <Ionicons
            name={'bookmark-o'}
            size={26}
            style={{color: '#2395F1', marginRight: 20}}
          />
          <Text style={{fontSize: 24}}>电视剧推荐</Text>
        </Text>
      <ScrollView  horizontal={true}>
      <View style={{flexDirection: 'row',flex:1,justifyContent:'space-between'}}>
          {this.props.nested.map((v,i) => {
            return (
              
              <TouchableOpacity
                key={v.vodid}
                style={{width: 100, height: 150,margin:5,}}
                onPress={() => {
                  this.openMovie(v.title, v.vodid);
                }}>
                <Image source={{uri: v.coverpic}} style={{width: 100, height: 120}} />
              <Text style={{textAlign:'center'}}>{v.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
        
      </View>
    );
  }
  getList() {}
  openMovie(title, vodid) {
    console.log(this.props);
    this.props.onClickVideo(title, vodid);
    console.log('1111s');
    //console.log(title);
  }
}
const styles = StyleSheet.create({

});
export default NestedTvRows;
