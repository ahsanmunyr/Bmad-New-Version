import React,{useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import MyTabs from './MyTabs';

const BottomTab = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <MyTabs Navi={navigation} />;
};
const mapStateToProps = ({userReducer}) => {
    return {userReducer};
  };
export default connect(mapStateToProps, null)(BottomTab);
