import React, {Component} from 'react';
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
class listHot extends Component {
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
          <Text style={{fontSize: 24}}>热门影视</Text>
        </Text>
        <View>
          {this.props.hotList.map((v) => {
            return (
              <TouchableOpacity
                key={v.vodid}
                style={{width: 50, height: 80}}
                onPress={() => {
                  this.openMovie(v.title, v.vodid);
                }}>
                <Image source={{uri: v.pic}} style={{width: 50, height: 80}} />
              </TouchableOpacity>
            );
          })}
          {/* <FlatList
            data={this.props.hotList}
            renderItem={({item}) => (
              
            )}
            keyExtractor={(item, index) => item.vodid}></FlatList> */}
        </View>
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
const styles = StyleSheet.create({});
export default listHot;
