import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Dimensions,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ImagePicker,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import { showMessage, hideMessage } from 'react-native-flash-message';
import ImagePickerMultiple from 'react-native-image-crop-picker';
import AppText from '../../Components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import TagInput from 'react-native-tags-input';
import * as actions from '../../Store/Actions';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../src/screens/drawer/constant';

const { width, height } = Dimensions.get('window');

const NewPostScreen = ({
  navigation,
  userReducer,
  getFeedData,
  getNotifications,
  postAction,
}) => {
  const isIOS = Platform.OS === 'ios';

  useEffect(() => {
    CheckPermission();
  }, []);

  const CheckPermission = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(response => {
        // console.log(response)
      });
    }
  };

  const [filePath, setFilePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, onChangeCaption] = useState('');
  const [tags, onChangeArrays] = useState({
    tag: '',
    tagsArray: [],
  });

  const SelectMultipleImage = () => {
    ImagePickerMultiple.openPicker({
      multiple: true,
      width: 300,
      height: 400,
      selectionLimit: 3,
      mediaType: 'photo',
      // cropping: true,
      includeBase64: true,
    })

      .then(response => {
        var ImageArray = [];
        for (var i = 0; i < response.length; i++) {
          // console.log(response[i].size, 'SIZE');
          let showImage = {
            uri: 'data:image/jpeg;base64,' + response[i].data,
            path: response[i].path,
            type: response[i].mime,
          };
          ImageArray.push(showImage);
        }
        setFilePath(ImageArray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateTagState = tag => {
    onChangeArrays(tag);
  };

  const newPost = async () => {

    if (caption.length > 0) {
      if (caption && filePath) {
        setLoading(true);
        await postAction(
          // tags,
          caption,
          filePath,
          userReducer?.data?.user_id,
          navigation,
          clearAllStates,
          _onPostFailed,
        );
      } else {
        showMessage({
          message: 'Please select the image',
          // description: '',
          danger: 'error',
        });
      }
    } else {
      showMessage({
        message: 'Description require',
        // description: '',
        danger: 'error',
      });
    }
    // getNotifications(7)
  };

  const clearAllStates = () => {
    setLoading(false);
    getFeedData(userReducer?.data?.user_id);
    setFilePath(null);
    onChangeCaption('');
    onChangeArrays({
      tag: '',
      tagsArray: [],
    });
    navigation.navigate('HOME');
  };

  const _onPostFailed = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagesSection}>
        <View style={styles.addPicView}>
          <AppText
            nol={1}
            textAlign="left"
            family="Poppins-Regular"
            size={hp('3.5%')}
            color="black"
            Label={'Add Pictures'}
          />
        </View>
        <View
          style={{
            // margin: 10,
            height: '100%',
          }}>
          <ScrollView
            bouncesZoom
            scrollToOverflowEnabled
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            scrollEnabled
            style={{
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={SelectMultipleImage}
              // onPress={launchCamera}

              style={{
                backgroundColor: 'white',
                borderRadius: 3,

                zIndex: 199,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                height: responsiveHeight(25.5),
                width: responsiveWidth(40),
                justifyContent: 'center',
                alignContent: 'center',
                margin: responsiveScreenFontSize(1.5),
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'row',
                  paddingLeft: 42,
                  paddingRight: 42,
                }}>
                <Icon name="camera" size={28} color="#B01125" />
                <Icon1
                  name="plus"
                  size={12}
                  style={{
                    top: -10,
                  }}
                  color="#B01125"
                />
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              {filePath != null
                ? filePath.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignContent: 'center',
                        // padding: 12,
                        // backgroundColor:'red',
                        paddingHorizontal: 10,
                        height: responsiveHeight(31),
                        // width: responsiveWidth(50),
                        // borderWidth: 1, borderColor:'grey'
                      }}>
                      <TouchableOpacity
                        key={index}
                        style={{
                          zIndex: 99,
                        }}
                        onPress={() => {
                          let val = filePath.filter((x, i) => i !== index);
                          setFilePath(val);

                          // alert('asd')
                        }}>
                        <View
                          key={index}
                          style={{
                            height: 30,
                            width: 30,
                            backgroundColor: colors.themeblue,
                            borderRadius: responsiveScreenFontSize(50),
                            position: 'absolute',
                            left: -5,
                            zIndex: 99,
                            top: -10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Entypo
                            name="cross"
                            size={responsiveScreenFontSize(3)}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                      <Image
                        resizeMode='cover'
                        key={index}
                        source={item}
                        style={{
                          height: responsiveHeight(25.5),
                          width: responsiveWidth(40),
                          marginHorizontal: 3,
                          // top: 8,

                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: '#e8e8e8',
                          borderRadius: 3,
                        }}
                      />
                    </View>
                  );
                })
                : null}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.postDescribeContainer}>
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 20,
            }}>
            <AppText
              nol={2}
              textAlign="left"
              family="Poppins-SemiBold"
              size={responsiveScreenFontSize(1.8)}
              color="white"
              Label={'Write a short description about your post:'}
            />
            <TextInput
              placeholder="Your text here..."
              value={caption}
              placeholderTextColor="white"
              keyboardType="default"
              onChange={event => onChangeCaption(event.nativeEvent.text)}
              onSubmitEditing={event => onChangeCaption(event.nativeEvent.text)}
              multiline={true}
              maxLength={250}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.textFieldStyle}
            />
            {/* <View style={{marginTop: 25}}>
              <TagInput
                updateState={updateTagState}
                tags={tags}
                placeholder="Tags"
                labelStyle={{color: '#B01125'}}
                leftElement={
                  <Icon2 name={'add-circle-outline'} size={20} color="grey" />
                }
                leftElementContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                containerStyle={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
                inputContainerStyle={styles.tagInputContainerStyle}
                inputStyle={{color: 'black', fontSize: hp('1.5%')}}
                // onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
                // onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
                autoCorrect={false}
                tagStyle={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
                tagTextStyle={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  fontSize: hp('1.5%'),
                }}
                keysForTag={', '}
              />
            </View> */}
            {!loading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 50,
                }}>
                <TouchableOpacity
                  onPress={newPost}
                  style={styles.touchableOpacity}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="black"
                    Label={'Post'}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <LottieView
                style={{
                  position: 'absolute',
                  top: isIOS ? height * 0.035 : height * 0.05,
                  left: isIOS ? width * 0.1 : width * 0.15,
                  // backgroundColor:'white',
                  width: width * 0.4,
                  height: height * 0.3,
                }}
                source={require('../../Assets/Lottie/white-loader.json')}
                autoPlay
                loop
              />
            )}
            <View style={{ height: 100 }}></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

function mapStateToProps({ userReducer }) {
  return { userReducer };
}

export default connect(mapStateToProps, actions)(NewPostScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  addPicView: {
    width: '100%',
    left: width * 0.03,
    height: 60,
    // backgroundColor:'red',
    justifyContent: 'flex-end',
    marginTop: height * 0.08,
  },
  imagesSection: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: width * 0.4,
    height: hp('6%'),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2'),
    textAlign: 'center',
  },
  postDescribeContainer: {
    backgroundColor: '#B01125',
    borderTopRightRadius: 20,
    width: '100%',
    height: height * 0.46,
    bottom: 0,
    position: 'absolute',
  },
  textFieldStyle: {
    width: width * 0.9,
    backgroundColor: '#D19F9F',
    borderRadius: 6,
    top: 10,
    padding: width * 0.02,
    color: 'white',
    height: responsiveHeight(20),
    fontSize: width * 0.04,
  },
  tagInputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.04,
    width: '25%',
  },
});
