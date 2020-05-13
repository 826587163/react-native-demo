import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class HomeChild extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Button
          title="返回home"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text>我是子页面</Text>
      </View>
    );
  }
}

export default HomeChild;
