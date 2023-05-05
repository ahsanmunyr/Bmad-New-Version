// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Image, Dimensions} from 'react-native';
// import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
// import {Drawer} from 'react-native-paper';
// import AppText from './Components/AppText';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {AuthContext} from './AuthContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as actions from './Store/Actions';
// import {Badge} from 'react-native-elements';
// import {connect} from 'react-redux';
// import IconComp from './Components/IconComp';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const {width, height} = Dimensions.get('window');

// const DrawerContent = ({
//   props,
//   userReducer,
//   SignOut,
//   navigation,
//   userLogin,
//   showDrawerConnectionsBadge,
//   connectionsReducer,
// }) => {
//   const [hasNewRequests, setHasNewRequests] = useState(false);
//   // const [invitations, setInvitations] = useState([]);
//   // const [hasNewMessages, setHasNewMessages] = useState(false);
//   useEffect(() => {
//     if (connectionsReducer?.showConnectionsBadge) {
//       setHasNewRequests(true);
//     }
//   }, [connectionsReducer?.showConnectionsBadge]);

//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView {...props}>
//         <View style={styles.drawerContent}>
//           <View style={styles.userInfoSection}>
//             <Image
//               resizeMode="contain"
//               source={require('./Assets/Images/brand.png')}
//               style={{
//                 width: 180,
//                 height: 200,
//               }}
//             />
//           </View>

//           <Drawer.Section
//             style={[styles.drawerSection, {position: 'relative'}]}>
//             {hasNewRequests && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: height * 0.035,
//                   right: width * 0.2,
//                 }}>
//                 <IconComp
//                   type="FontAwesome"
//                   iconName="circle"
//                   passedStyle={{color: 'white', fontSize: width * 0.04}}
//                 />
//               </View>
//             )}
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Feather name="home" color="white" size={30} />
//               )}
//               labelStyle={{
//                 fontFamily: 'Poppins-Regular',
//                 color: 'white',
//                 fontSize: hp('2%'),
//               }}
//               label="Home"
//               onPress={() =>
//                 navigation.navigate('HOME', {
//                   screen: 'home',
//                   initial: false,
//                 })
//               }
//             />
//             {/* <DrawerItem
//               icon={({color, size}) => (
//                 <FontAwesome name="user-o" color="white" size={30} />
//               )}
//               labelStyle={{
//                 fontFamily: 'Poppins-Regular',
//                 color: 'white',
//                 fontSize: hp('2%'),
//               }}
//               label=" Profile"
//               // onPress={() => navigation.navigate('MyProfile')}
//               onPress={() =>
//                 navigation.navigate('Drinks', {
//                   screen: 'MyProfile',
//                   initial: false,
//                 })
//               }
//             /> */}

//             <DrawerItem
//               icon={({color, size}) => (
//                 <MaterialCommunityIcons
//                   name="message-processing-outline"
//                   color="white"
//                   size={30}
//                 />
//               )}
//               labelStyle={{
//                 fontFamily: 'Poppins-Regular',
//                 color: 'white',
//                 fontSize: hp('2%'),
//               }}
//               label="Messages"
//               onPress={() => navigation.navigate('message')}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <MaterialIcons
//                   name="connect-without-contact"
//                   color="white"
//                   size={30}
//                 />
//               )}
//               labelStyle={{
//                 fontFamily: 'Poppins-Regular',
//                 color: 'white',
//                 fontSize: hp('2%'),
//               }}
//               label="Connections"
//               onPress={() => {
//                 showDrawerConnectionsBadge(false);
//                 setHasNewRequests(false);
//                 navigation.navigate('connections', {
//                   screen: 'connections',
//                   initial: false,
//                 });
//               }}
//             />
//             {/* <DrawerItem
//               icon={({color, size}) => (
//                 <Ionicons name="card-outline" color="white" size={30} />
//               )}
//               labelStyle={{
//                 fontFamily: 'Poppins-Regular',
//                 color: 'white',
//                 fontSize: hp('2%'),
//               }}
//               label="Credit Cards"
//               onPress={() => navigation.navigate('cards')}
//             /> */}
//             {/* <DrawerItem
//               icon={({ color, size }) => (
//                 <Feather
//                 name="settings"
//                 color='white'
//                 size={30}
//                 />
//               )}
//               labelStyle={{fontFamily: 'Poppins-Regular', color: 'white', fontSize: hp('2%')}}
//               label="Settings"
//               onPress={() => navigation.navigate('message')}
//             /> */}
//           </Drawer.Section>
//         </View>
//       </DrawerContentScrollView>
//       <Drawer.Section style={styles.bottomDrawerSection}>
//         <DrawerItem
//           icon={({color, size}) => (
//             <MaterialIcons name="logout" color="white" size={30} />
//           )}
//           labelStyle={{
//             fontFamily: 'Poppins-Regular',
//             color: 'white',
//             fontSize: hp('2%'),
//           }}
//           onPress={() => SignOut(userReducer?.data?.user_id?.toString())}
//           label="Sign Out"
//         />
//       </Drawer.Section>
//     </View>
//   );
// };
// function mapStateToProps({userReducer, userLogin,connectionsReducer}) {
//   return {userReducer, userLogin,connectionsReducer};
// }
// export default connect(mapStateToProps, actions)(DrawerContent);

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   bottomDrawerSection: {
//     marginBottom: 30,
//   },
// });
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {useReducer, useRef} from 'react';
import {useDrawerProgress} from '@react-navigation/drawer';
// import colors from './src/constants/Colors';
import {colors, constant } from './src/screens/drawer/constant';
import Icon, {Icons} from './src/components/Icons';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import DrawerItemList from './src/screens/drawer/drawer2/DrawerItemList';

const CustomDrawer = props => {
  const {state, descriptors, navigation} = props;
  const scrollRef = useRef(null);

  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    return {
      transform: [{translateX}],
    };
  });

  const viewStyles2 = type =>
    useAnimatedStyle(() => {
      const val = type === 'top' ? -100 : 140;
      const translateY = interpolate(drawerProgress.value, [0, 1], [val, 0]);
      const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
      return {
        transform: [{translateY}],
        opacity,
      };
    });

  return (
    <View style={styles.container}>
      {/* header */}
      <StatusBar barStyle={'light-content'} backgroundColor={colors.sceneBg} />
      <Animated.View
        style={[styles.row, styles.view, styles.marginTop, viewStyles2('top')]}>
        <View style={styles.iconContainer}>
          <Icon name="logo-electron" type={Icons.Ionicons} size={30} />
        </View>
        <Text style={styles.headerTitle}>Hello there👋</Text>
      </Animated.View>
      {/* Drawer List Item */}
      <Animated.ScrollView
        ref={scrollRef}
        {...props}
        showsVerticalScrollIndicator={false}
        style={[styles.marginVertical, viewStyles]}>
        <DrawerItemList {...props} styles={styles} />
      </Animated.ScrollView>
      {/* footer */}
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.row,
            styles.view,
            styles.marginBottom,
            viewStyles2('bottom'),
          ]}>
          <Image
            style={styles.profile}
            source={require('./src/assets/images/avatar.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerTitle}>Kelsey Van</Text>
            <Text style={styles.text}>Software Engineer</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    // backgroundColor: colors.white,
    borderRadius: constant.borderRadius,
    marginHorizontal: constant.SPACING / 2,
    padding: constant.SPACING / 1.5,
  },
  marginTop: {
    marginTop: 50
  },
  marginBottom: {
    marginBottom: constant.SPACING / 2,
  },
  marginVertical: {
    marginVertical: constant.SPACING / 2,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: constant.SPACING / 2,
    justifyContent: 'space-between',
    borderRadius: constant.borderRadius,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: constant.textFontSize,
    color: colors.white,
    paddingHorizontal: constant.SPACING,
  },
  notificationBadge: {
    paddingVertical: constant.SPACING / 5,
    paddingHorizontal: constant.SPACING / 2,
    borderRadius: constant.borderRadius / 2,
  },
  iconContainer: {
    padding: constant.SPACING / 2.4,
    borderRadius: constant.borderRadius,
    margin: constant.SPACING / 2,
    backgroundColor: colors.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.darkGray,
    marginVertical: constant.SPACING / 2,
  },
  headerTitle: {
    fontSize: constant.titleFontSize,
    color: colors.white,
  },
  profile: {
    marginVertical: constant.SPACING / 2,
    marginRight: constant.SPACING,
    marginLeft: constant.SPACING / 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.light,
  },
  profileText: {
    color: colors.white,
  },
});
