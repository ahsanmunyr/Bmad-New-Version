import React, {useEffect, useState, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Avatar from '../../Components/Avatar';
import AppText from '../../Components/AppText';
import moment from 'moment';
import Comment from './Comments';
import {imageUrl} from '../../Config/Apis.json';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MainPost = ({
  getAllCommentsOfPost,
  userReducer,
  commentOnPost,
  postsReducer,
  navigation,
  route,
}) => {
  const [commentText, setCommentText] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const postId = route?.params?.item?.post_id;
  const [isCommenting, setIsCommenting] = useState(false);
  const userId = userReducer?.data?.user_id;
  const [postComments, setPostComments] = useState([]);
  const isIOS = Platform.OS === 'ios';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getAllCommentsOfPost(postId).then(() => {
        setPostComments(postsReducer?.postComments);
      });
      setRefreshing(false);
    });
  }, []);

  const _onPressComment = async () => {
    if (commentText.length > 0) {
      const apiData = {
        user_id: userId,
        post_id: postId,
        comment: commentText,
      };
      setIsCommenting(true);
      await commentOnPost(apiData, onSuccess);
    } else {
      showMessage({
        message: 'Please enter comment.',
        danger: 'error',
      });
    }
  };

  const onSuccess = () => {
    setIsCommenting(false);
    setCommentText('');
    getAllCommentsOfPost(postId).then(() => {
      setPostComments(postsReducer?.postComments);
    });
  };

  useEffect(() => {
    getAllCommentsOfPost(postId).then(() => {
      setPostComments(postsReducer?.postComments);
    });
  }, []);

  useEffect(() => {
    setPostComments(postsReducer?.postComments);
  }, [postsReducer?.postComments]);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // ListHeaderComponentStyle={{width: width,}}
        ListHeaderComponent={
          <>
            <View style={styles.outerInfoView}>
              <View style={styles.innerInfoView}>
                <Avatar
                  size="medium"
                  source={
                    route?.params?.profileImg
                      ? {
                          uri: `${imageUrl}/${route?.params?.profileImg}`,
                        }
                      : require('../../Assets/Images/maroon-dp.png')
                  }
                />
                <View style={styles.textView}>
                  <View style={styles.innerTextView}>
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp('1.9%')}
                      color="black"
                      Label={route.params.name}
                    />
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp('1.5%')}
                      color="black"
                      Label={moment(route.params.uploadTime).fromNow()}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.descripView}>
                <AppText
                  nol={12}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.9%')}
                  color="black"
                  Label={route.params.description}
                />
              </View>
            </View>

            <View style={styles.shadowContainerForIos}>
              <View style={styles.commentBoxContainer}>
                <Avatar
                  size="small"
                  source={
                    route?.params?.profileImg
                      ? {
                          uri: `${imageUrl}/${route?.params?.profileImg}`,
                        }
                      : require('../../Assets/Images/maroon-dp2.jpeg')
                  }
                />
                <TouchableWithoutFeedback>
                  <TextInput
                    placeholder="Add a comment"
                    numberOfLines={5}
                    placeholderTextColor="grey"
                    multiline={true}
                    onChangeText={e => {
                      setCommentText(e);
                    }}
                    textAlignVertical="top"
                    value={commentText}
                    style={styles.textInputStyles}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            {isCommenting ? (
              // <LottieView
              //   style={{
              //     width: width * 0.2,
              //     height: height * 0.1,
              //     marginLeft: width * 0.38,
              //   }}
              //   source={require('../../Assets/Lottie/red-loader.json')}
              //   autoPlay
              //   loop
              // />

              <View
                style={[
                  styles.commentBtn,
                  isCommenting && isIOS && {width: width * 0.35},
                ]}>
                <AppText
                  nol={1}
                  family="Poppins-SemiBold"
                  size={hp('1.7%')}
                  color="white"
                  Label={'Commenting...'}
                />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.commentBtn}
                onPress={_onPressComment}>
                <AppText
                  nol={1}
                  family="Poppins-SemiBold"
                  size={hp('1.7%')}
                  color="white"
                  Label={'Comment'}
                />
              </TouchableOpacity>
            )}
          </>
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: height * 0.14}}
        data={postComments}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <Comment
              item={item}
              img={item?.user?.user_image}
              name={item?.user?.user_name}
              time={moment(item?.created_at).fromNow()}
              message={item?.comment}
            />
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = ({userReducer, postsReducer}) => {
  return {userReducer, postsReducer};
};

export default connect(mapStateToProps, actions)(MainPost);

const styles = StyleSheet.create({
  descripView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: height * 0.015,
    width: width * 0.9,
  },
  mainContainer: {
    // height: hp('100%'),
    backgroundColor: '#F7F3F2',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between',
    alignContent: 'center',
    left: 5,
    width: '94%',
  },
  innerTextView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  commentBoxContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: 10,
    minHeight: height * 0.12,
    zIndex: 4,
    padding: 10,
    elevation: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },
  shadowContainerForIos: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 7,
    // backgroundColor:'red'
    width: width * 0.9,
    marginHorizontal: width * 0.05,
  },
  textInputStyles: {
    marginLeft: width * 0.03,
    width: '85%',
    borderRadius: 6,
    top: -3,
    color: 'grey',
    fontSize: hp('1.9%'),
    minHeight: height * 0.07,
    height:height * 0.1
  },
  commentBtn: {
    borderRadius: width * 0.03,
    padding: 10,
    justifyContent: 'center',
    width: width * 0.3,
    alignItems: 'center',
    backgroundColor: '#B01125',
    alignSelf: 'flex-end',
    // marginRight: width * 0.01,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    marginRight:width * 0.05,
  },
  outerInfoView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: width * 0.9,
    paddingHorizontal: width * 0.05,

  },
  innerInfoView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: height * 0.01,
  },
});
