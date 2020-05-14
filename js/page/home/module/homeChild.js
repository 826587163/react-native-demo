import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {Provider, Toast, Portal} from '@ant-design/react-native';
//导入Video组件
import Video from 'react-native-video';
// 导入 Silder组件
import Slider from '@react-native-community/slider';
// 屏幕方向锁定: 他需要改变 原来Android文件代码，当然适配两端的话，IOS也是需要更改的。
import Orientation from 'react-native-orientation-locker';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
console.log(screenWidth + '   ' + screenHeight + '带有小数');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.changePausedState = this.changePausedState.bind(this);
    this.customerSliderValue = this.customerSliderValue.bind(this);
    this.enterFullScreen = this.enterFullScreen.bind(this);
    this._changePauseSliderFullState = this._changePauseSliderFullState.bind(
      this,
    );
    this._onStartShouldSetResponder = this._onStartShouldSetResponder.bind(
      this,
    );
    this.state = {
      isPaused: true, //是暂停
      duration: 0, //总时长
      currentTime: 0, //当前播放时间
      sliderValue: 0, //进度条的进度

      //用来控制进入全屏的属性
      videoWidth: screenWidth,
      videoHeight: 210,
      isFullScreen: false,
      isVisiblePausedSliderFullScreen: false,
      Loading: false,
      list: [],
    };
  }
  changePausedState() {
    //控制按钮显示播放，要显示进度条5秒钟，之后关闭显示
    this.setState({
      isPaused: this.state.isPaused ? false : true,
      isVisiblePausedSliderFullScreen: true,
    });
    //这个定时调用失去了this指向
    let that = this;
    setTimeout(function () {
      that.setState({
        isVisiblePausedSliderFullScreen: false,
      });
    }, 5000);
  }
  _changePauseSliderFullState() {
    // 单击事件，是否显示 “暂停、进度条、全屏按钮 盒子”
    let flag = this.state.isVisiblePausedSliderFullScreen ? false : true;
    this.setState({
      isVisiblePausedSliderFullScreen: flag,
    });
    //这个定时调用失去了this指向
    let that = this;
    setTimeout(function () {
      that.setState({
        isVisiblePausedSliderFullScreen: false,
      });
    }, 5000);
  }
  //格式化音乐播放的时间为0：00。借助onProgress的定时器调用，更新当前时间
  formatMediaTime(time) {
    let minute = Math.floor(time / 60);
    let second = parseInt(time - minute * 60);
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;
    return minute + ':' + second;
  }
  //加载视频调用，主要是拿到 “总时间”，并格式化
  customerOnload(e) {
    let time = e.duration;
    this.setState({
      duration: time,
    });
  }
  // 获得当前的，播放时间数，但这个数是0.104，需要处理
  customerOnprogress(e) {
    let time = e.currentTime; // 获取播放视频的秒数
    this.setState({
      currentTime: time,
      sliderValue: time,
    });
  }
  // 移动滑块，改变视频播放进度
  customerSliderValue(value) {
    this.player.seek(value);
  }
  enterFullScreen() {
    //1.改变宽高  2.允许进入全屏模式  3.如何配置屏幕旋转,不需要改变进度条盒子的显示和隐藏
    if (this.state.videoWidth == screenWidth) {
      this.setState({
        videoWidth: screenHeight,
        videoHeight: screenWidth,
        isFullScreen: true,
      });
      // 直接设置方向
      Orientation.lockToLandscape();
    } else {
      this.setState({
        videoWidth: screenWidth,
        videoHeight: 210,
        isFullScreen: false,
      });
      Orientation.lockToPortrait();
    }
  }
  _onStartShouldSetResponder(e) {
    console.log(e);
  }
  componentDidMount() {
    let vodid = this.props.navigation.state.params.vodid;
    this.getVideoUrl(vodid, 1);
    console.log(vodid);
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      console.log('是竖屏');
    } else {
      console.log('如果是横屏，就将其旋转过来');
      Orientation.lockToPortrait();
    }
  }
  FlagisPaused() {
    this.setState({
      isPaused: this.state.isPaused ? false : true,
    });
  }
  getVideoUrl(vodid, index) {
    Toast.loading('Loading...');
    this.setState({
      Loading: false,
    });
    let url = `https://ios.xiaoxiaoapps.com/vod/reqplay/${vodid}?playindex=${index}`;
    fetch(url)
      .then((res) => res.json())
      .then((responseJson) => {
        let key = Toast.loading('Loading...');
        Portal.remove(key);
        this.setState({
          list: responseJson.data,
          Loading: true,
        });
        console.log(responseJson.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    // 播放按钮组件：是否显示
    let playButtonComponent = (
      <TouchableWithoutFeedback onPress={this.changePausedState}>
        <View style={styles.playBtn}>
          <Ionicons name={'play'} size={50} style={{color: '#fff'}} />
        </View>
      </TouchableWithoutFeedback>
    );
    let pausedBtn = this.state.isPaused ? playButtonComponent : null;
    // 暂停按钮、进度条、全屏按钮 是否显示
    let pausedSliderFullComponent = (
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 8, marginRight: 8}}>
            <TouchableOpacity onPress={() => this.FlagisPaused()}>
              {this.state.isPaused ? (
                <Ionicons name={'play'} size={25} style={{color: '#fff'}} />
              ) : (
                <Ionicons name={'pause'} size={25} style={{color: '#fff'}} />
              )}
            </TouchableOpacity>
          </View>
          {/* 进度条按钮     */}
          <View style={styles.sliderBox}>
            <Text style={{color: '#fff'}}>
              {this.formatMediaTime(this.state.currentTime)}
            </Text>
            <Slider
              style={{width: '80%', height: 40, color: '#fff'}}
              value={this.state.sliderValue}
              maximumValue={this.state.duration}
              thumbTintColor="#fff"
              minimumTrackTintColor="red"
              maximumTrackTintColor="#fff"
              step={1}
              onValueChange={this.customerSliderValue}
            />
            <Text style={{color: '#fff'}}>
              {this.formatMediaTime(this.state.duration)}
            </Text>
          </View>
          {/* 全屏按钮 */}
          <View>
            <TouchableOpacity onPress={this.enterFullScreen}>
              {this.state.isFullScreen ? (
                <Ionicons name={'arrows'} size={25} style={{color: '#fff'}} />
              ) : (
                <Ionicons
                  name={'arrows-alt'}
                  size={25}
                  style={{color: '#fff'}}
                />
                // <Text style={{backgroundColor: '#fff', padding: 5}}>全屏</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
    let pausedSliderFull = this.state.isVisiblePausedSliderFullScreen
      ? pausedSliderFullComponent
      : null;
    return (
      <Provider>
        <View>
          <View>
            {this.state.Loading && (
              <TouchableWithoutFeedback
                onPress={this._changePauseSliderFullState}
                onResponderMove={this._onStartShouldSetResponder}>
                <Video
                  source={{uri: this.state.list.httpurl}}
                  ref={(ref) => {
                    this.player = ref;
                  }}
                  style={{
                    width: this.state.videoWidth,
                    height: this.state.videoHeight,
                    backgroundColor: 'black',
                  }}
                  allowsExternalPlayback={false}
                  paused={this.state.isPaused}
                  resizeMode="stretch"
                  onLoad={(e) => this.customerOnload(e)}
                  onProgress={(e) => this.customerOnprogress(e)}
                  fullscreen={this.state.isFullScreen}
                />
              </TouchableWithoutFeedback>
            )}
            {/* 播放的按钮：点击之后需要消失 */}
            {pausedBtn}
            {/* 暂停按钮，进度条，全屏按钮 */}
            {pausedSliderFull}
          </View>
        </View>
      </Provider>
    );
  }
}
var styles = StyleSheet.create({
  myVideo: {
    width: 340,
    height: 240,
  },
  playBtn: {
    width: 50,
    height: 50,
    //backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    zIndex: 999,
  },
  sliderBox: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  thisWindow: {
    width: '100%',
    height: 400,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 1,
  },
});
