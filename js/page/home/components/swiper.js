import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {Carousel} from '@ant-design/react-native';
class HeaderSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {}
  render() {
    //const {navigation} = this.props;
    let arr = this.props.swiperList;
    return (
      <View>
        {/* <Text>值为----{JSON.stringify(this.props.swiperList)}</Text> */}
        {this.props.swiperList.length && (
          <Carousel autoplay infinite autoplayInterval={1500}>
            {this.props.swiperList.map((v) => {
              return (
                //<Text>{v.coverpic}</Text>
                <Image
                  key={v.spid}
                  source={{uri: v.coverpic}}
                  style={{width: '100%', height: 200}}
                />
              );
              //<Text style={{color: 'red', fontSize: 20}}>{v}</Text>;
            })}
          </Carousel>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
  },
});
export default HeaderSwiper;
