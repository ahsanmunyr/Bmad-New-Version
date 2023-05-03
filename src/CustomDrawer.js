import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import AppText from './Components/AppText';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from './Store/Actions';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import IconComp from './Components/IconComp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const DrawerContent = ({
  props,
  userReducer,
  SignOut,
  navigation,
  userLogin,
  showDrawerConnectionsBadge,
  connectionsReducer,
}) => {
  const [hasNewRequests, setHasNewRequests] = useState(false);
  // const [invitations, setInvitations] = useState([]);
  // const [hasNewMessages, setHasNewMessages] = useState(false);
  useEffect(() => {
    if (connectionsReducer?.showConnectionsBadge) {
      setHasNewRequests(true);
    }
  }, [connectionsReducer?.showConnectionsBadge]);

 
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Image
              resizeMode="contain"
              source={require('./Assets/Images/brand.png')}
              style={{
                width: 180,
                height: 200,
              }}
            />
          </View>

          <Drawer.Section
            style={[styles.drawerSection, {position: 'relative'}]}>
            {hasNewRequests && (
              <View
                style={{
                  position: 'absolute',
                  bottom: height * 0.035,
                  right: width * 0.2,
                }}>
                <IconComp
                  type="FontAwesome"
                  iconName="circle"
                  passedStyle={{color: 'white', fontSize: width * 0.04}}
                />
              </View>
            )}
            <DrawerItem
              icon={({color, size}) => (
                <Feather name="home" color="white" size={30} />
              )}
              labelStyle={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: hp('2%'),
              }}
              label="Home"
              onPress={() =>
                navigation.navigate('HOME', {
                  screen: 'home',
                  initial: false,
                })
              }
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="user-o" color="white" size={30} />
              )}
              labelStyle={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: hp('2%'),
              }}
              label=" Profile"
              // onPress={() => navigation.navigate('MyProfile')}
              onPress={() =>
                navigation.navigate('Drinks', {
                  screen: 'MyProfile',
                  initial: false,
                })
              }
            /> */}

            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  color="white"
                  size={30}
                />
              )}
              labelStyle={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: hp('2%'),
              }}
              label="Messages"
              onPress={() => navigation.navigate('message')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcons
                  name="connect-without-contact"
                  color="white"
                  size={30}
                />
              )}
              labelStyle={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: hp('2%'),
              }}
              label="Connections"
              onPress={() => {
                showDrawerConnectionsBadge(false);
                setHasNewRequests(false);
                navigation.navigate('connections', {
                  screen: 'connections',
                  initial: false,
                });
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="card-outline" color="white" size={30} />
              )}
              labelStyle={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: hp('2%'),
              }}
              label="Credit Cards"
              onPress={() => navigation.navigate('cards')}
            /> */}
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Feather
                name="settings"
                color='white'
                size={30}
                />
              )}
              labelStyle={{fontFamily: 'Poppins-Regular', color: 'white', fontSize: hp('2%')}}
              label="Settings"
              onPress={() => navigation.navigate('message')}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialIcons name="logout" color="white" size={30} />
          )}
          labelStyle={{
            fontFamily: 'Poppins-Regular',
            color: 'white',
            fontSize: hp('2%'),
          }}
          onPress={() => SignOut(userReducer?.data?.user_id?.toString())}
          label="Sign Out"
        />
      </Drawer.Section>
    </View>
  );
};
function mapStateToProps({userReducer, userLogin,connectionsReducer}) {
  return {userReducer, userLogin,connectionsReducer};
}
export default connect(mapStateToProps, actions)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomDrawerSection: {
    marginBottom: 30,
  },
});
