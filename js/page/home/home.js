import React, {Component} from 'react';
import {View, Text, Button, StyleSheet,ScrollView} from 'react-native';
import HeaderSwiper from './components/swiper';
import ListHot from './components/listHot';
import NestedRows from './components/recommend';
import NestedTvRows from './components/teleplayList';
import DeviceStorage from '../storage/DeviceStorage';
import {
  Provider,
  Toast,
  Portal,
  WhiteSpace,
  WingBlank,
  portal,
} from '@ant-design/react-native';
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isHeaderShow: false,
    };
  }
  componentDidMount() {
    this.getList();
  }
  render() {
    const {navigation} = this.props;
    return (
      <Provider>
        <ScrollView>
        
          {this.state.isHeaderShow ? (
            <View>
              <HeaderSwiper swiperList={this.state.list.sprows} />
              <ListHot
                hotList={this.state.list.sliderows}
                onClickVideo={(title, vodid) => {
                  this.openVideo(title, vodid);
                }}
              />
              <NestedRows onClickVideo={(title, vodid) => {
                  this.openVideo(title, vodid);
                }} nested={this.state.list.nestedrows[0].vodrows}/>
                <NestedTvRows onClickVideo={(title, vodid) => {
                  this.openVideo(title, vodid);
                }} nested={this.state.list.nestedrows[1].vodrows}/>
            </View>
          ) : (
            <Text></Text>
          )}

          {/* <Button
          title="跳转到Page1"
          onPress={() => {
            navigation.navigate('HomeChild');
          }}
        /> */}
          
          <View></View>

        </ScrollView>
       
      </Provider>
    );
  }
  openVideo(title, vodid) {
    console.log(title, vodid);
    const {navigation} = this.props;
    navigation.navigate('HomeChild', {title: title, vodid: vodid});
  }
  getList() {
    this.setState({
      isHeaderShow: false,
    });

    DeviceStorage.get('data').then((res) => {
      if (res == null || res == '') {
        Toast.loading('Loading...'); //使用Provider包裹return的返回值，才能调用toast
        fetch('https://www.leleapps.com')
          .then((res) => res.json())
          .then((responseJson) => {
            let key = Toast.loading('Loading...');
            Portal.remove(key);
            DeviceStorage.save('data', responseJson.data);
            this.setState({
              list: responseJson.data,
              isHeaderShow: true,
            });
            console.log(responseJson.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        Portal.remove(Toast.loading('Loading...'));
        this.setState({
          list: res,
          isHeaderShow: true,
        });
      }
      console.log(res);
    });
    let that = this;
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
});

export default home;
