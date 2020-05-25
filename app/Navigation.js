import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {colors} from './constants/colors';

// AUTh SCREENS
import Welcome from './screens/Auth/Welcome';
import Signup from './screens/Auth/Signup';
import Login from './screens/Auth/Login';
import Forgot from './screens/Auth/Forgot';
import Verify from './screens/Auth/Verify';
import Resend from './screens/Auth/Resend';
import Otp from './screens/Auth/Otp';
import AuthLoading from './screens/AuthLoading';

//Tab screens
import Home from './screens/Tabsscreen/Home';
import Account from './screens/Tabsscreen/Account';
import Forums from './screens/Tabsscreen/Forums';
import Securities from './screens/Tabsscreen/Securities';
import Stock from './screens/Tabsscreen/Stock';
import Footer from './screens/Tabsscreen/Footer';

//Stock screens
import StockDetails from '../app/screens/stock/StockDetails';
import BuyStock from '../app/screens/stock/BuyStock';
import SellStock from '../app/screens/stock/SellStock';

//Securities screens
import SecurityDetails from '../app/screens/securities/SecurityDetails';
import BuySecurities from '../app/screens/securities/BuySecurities';
import SecPaymentPage from '../app/screens/securities/SecPaymentPage';
import ChooseSecPayment from '../app/screens/securities/ChooseSecPayment';
import SecBankTeller from '../app/screens/securities/SecBankTeller';
import PaidSecurity from '../app/screens/securities/PaidSecurity';
import MySecurity from '../app/screens/securities/MySecurities';

//Forums screens
import JoinForum from './screens/forum/JoinForum';
import ValidateCode from './screens/forum/ValidateCode';
import ChoosePayment from './screens/forum/ChoosePayment';
import BankTeller from './screens/forum/BankTeller';
import JoinOpenForum from './screens/forum/JoinOpenForum';
import PaymentPage from './screens/forum/PaymentPage';

// import SellStock from './screens/stock/SellStock';

import ChatPage from './screens/chat/ChatPage';
import ChatDetails from './screens/chat/ChatDetails';
import SingleChatPage from './screens/chat/SingleChatPage';
import PersonalChats from './screens/chat/PersonalChats';

//Accounts Screens
import AccountSettings from './screens/account/AccountSettings';
import Transactions from './screens/account/Transactions';
import KycDetails from './screens/account/KycDetails';
import Refer from './screens/account/Refer';
import Security from './screens/account/Security';
import Feedback from './screens/account/Feedback';
import Contact from './screens/account/Contact';
import ChangePassword from './screens/account/ChangePassword';

import Icons from 'react-native-vector-icons/Feather';

// import SecurityDetails from './screens/securities/SecurityDetails'

const customColor = {
  background: 'lightgray',
  color: 'gray',
};

const ForumScreens = createStackNavigator(
  {
    JoinForum,
    JoinOpenForum,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const SecurityScreens = createStackNavigator(
  {
    SecurityDetails,
    BuySecurities,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const StockScreens = createStackNavigator(
  {
    StockDetails,
    BuyStock,
    SellStock,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

// const AccountScreens = createStackNavigator(
//   {

//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     },
//   },
// );

const AppTab = createBottomTabNavigator(
  {
    Footer,
    Home,
    Stock,
    Securities,
    Forums,
    Account,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Icons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Stock') {
          iconName = `bar-chart-2`;
        } else if (routeName === 'Securities') {
          iconName = `trending-up`;
        } else if (routeName === 'Forums') {
          iconName = `message-square`;
        } else if (routeName === 'Account') {
          iconName = `user`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: customColor.background,
      },
      activeTintColor: colors.baseColor,
      inactiveTintColor: 'gray',
    },
  },
);

const AppStack = createStackNavigator(
  {
    Home: Footer,
    StockScreens,
    SecurityScreens,
    ForumScreens,
    JoinForum,
    JoinOpenForum,
    ChoosePayment,
    ValidateCode,
    BankTeller,
    ChatPage,
    SingleChatPage,
    ChatDetails,
    AccountSettings,
    Transactions,
    KycDetails,
    Refer,
    Security,
    Feedback,
    Contact,
    PaymentPage,
    ChooseSecPayment,
    ChangePassword,
    SecPaymentPage,
    SecBankTeller,
    Securities,
    PaidSecurity,
    MySecurity,
    PersonalChats
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Welcome,
    Login,
    Signup,
    Forgot,
    Verify,
    Resend,
    Otp,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
