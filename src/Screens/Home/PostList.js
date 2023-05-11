import React, {useEffect, useState, useRef} from 'react';
import {TouchableOpacity, View, Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Avatar from '../../Components/Avatar';
import * as actions from '../../Store/Actions/index';
import AppText from '../../Components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItems';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from './Preview';
import {imageUrl} from '../../Config/Apis.json';
import moment from 'moment';
import {connect} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
//  heart heart-o FontAwesome
// const Img = [
//   {image: require('./../../Assets/Images/post1.png')},
//   {image: require('./../../Assets/Images/place2.png')},
//   {image: require('./../../Assets/Images/place3.png')},
// ];
const PostList = ({
  Name,
  Description,
  ProfileImg,
  UploadTime,
  TotalLike,
  Comment,
  Img,
  item,
  Navigation,
  likePost,
  userReducer,
  _onPressHeart,
}) => {

  const IMAGES = item?.post_url?.map(ele => `${imageUrl}/${ele}`);

  const route = useRoute();
  const routeName = route?.name;
// console.log(IMAGES,"IMAGES",route?.name); 
  // const isIos =
  return (
    <View style={styles.postContainer}>
      {/* Post Info View */}
      <View style={styles.postInfoOuterView}>
        <View style={styles.postInfoInnerView}>
          <Avatar
            size="medium"
            source={
              ProfileImg
                ? {
                    uri: `${imageUrl}/${ProfileImg}`,
                  }
                : require('../../Assets/Images/placeholderImage.png')
            }
          />

          {/* Username Time And Like Comment View  */}
          <View style={styles.nameDateIconsView}>
            <View style={styles.nameAndDateView}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.9%')}
                color="black"
                Label={Name}
              />
              
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.5%')}
                color="black"
                Label={moment(UploadTime).fromNow()}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingRight: 5}}>
                  <TouchableOpacity onPress={() => _onPressHeart(item)} activeOpacity={0.9}>
                    {item?.is_like === 1 ? (
                      <Icon name="heart" size={18} color="#B01125" />
                    ) : (
                      <Icon name="heart-o" size={18} color="#B01125" />
                    )}
                  </TouchableOpacity>
                </View>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.5%')}
                  color="black"
                  Label={TotalLike}
                />
              </View>
              <TouchableOpacity
                style={{flexDirection: 'row', left: 5}}
                activeOpacity={0.9}
                onPress={() => {
                  if (routeName === 'post') {
                    return;
                  }
                  Navigation.navigate('mainpost', {
                    name: Name,
                    description: Description,
                    profileImg: ProfileImg,
                    uploadTime: UploadTime,
                    totalLike: TotalLike,
                    comment: Comment,
                    img: Img,
                    item: item,
                  });
                }}>
                <View style={{paddingRight: 5}}>
                  <Icon1 name="message-outline" size={18} color="#B01125" />
                </View>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.5%')}
                  color="black"
                  Label={Comment}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Post Description View */}
        <TouchableOpacity
          onPress={() => {
            if (routeName === 'post') {
              return;
            }
            Navigation.navigate('mainpost', {
              name: Name,
              description: Description,
              profileImg: ProfileImg,
              uploadTime: UploadTime,
              totalLike: TotalLike,
              comment: Comment,
              img: Img,
              item: item,
            });
          }}>
          <View style={styles.descriptionView}>
            <AppText
              nol={12}
              textAlign="left"
              family="Poppins-Regular"
              size={hp('1.9%')}
              color="black"
              Label={
                Description?.length > 100
                  ? `${Description?.substring(0, 100)}...`
                  : Description
              }
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Photos Slider  */}
      {/* {console.log(IMAGES, "000")} */}
      <View style={styles.photosView}>
      <View style={{height: 30}} />
        <FlatListSlider
          data={IMAGES}
          width={275}
          autoscroll={false}
          contentContainerStyle={{paddingHorizontal: 16}}
          component={<Preview />}
          // indicatorActiveWidth={30}
          loop={false}
          separatorWidth={10}
          // contentContainerStyle={{paddingHorizontal: 0}}
          animation={true}
        />
        <View style={{height: 10}} />
        <View
          style={{
            width: width * 0.95,
            height: 0.4,
            backgroundColor: 'silver',
            top: -3,
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};

const styles = StyleSheet.create({
  postInfoOuterView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  descriptionView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameDateIconsView: {
    flexDirection: 'row',
    padding: 4,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 5,
    width: width * 0.78,
    // backgroundColor: 'red',
  },
  postContainer: {
    // height: height*0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: width * 0.008,
    // padding: 4,
    paddingVertical: height * 0.035,
    width: width * 0.95,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  photosView: {
    justifyContent: 'center',
    flexDirection: 'column',
    top: height * 0.022,
    width: width,
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.32,
    // marginVertical: 10,
    // marginBottom: 10,
    // backgroundColor:'red',
  },
  nameAndDateView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  postInfoInnerView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // backgroundColor: 'green',
    width: width * 0.93,
  },
});
export default connect(mapStateToProps, actions)(PostList);
