import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../constants/colors';
import DashboardCard from '../../components/cards/DashboardCard';
import WatchList from '../../components/dashboard/WatchList';
import VisitedForums from '../../components/dashboard/VisitedForums';
import TransactionHistory from '../../components/dashboard/TransacctionHistory';
import AsyncStorage from '@react-native-community/async-storage';
import {withTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import axios from 'axios'

class Home extends Component {
  state = {
    profile: '',
    username: '',
  };

  _retrieveData = async () => {
    await AsyncStorage.getItem('username')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          username: valueJson,
        });
        // console.log(
        //   'Username Data retrieved successfully',
        //   this.state.username,
        // );
      })
      .catch(error => {
        console.log('There was an error retrieving the data' + error);
      });
  };

  getUserProfile = async () => {
    await axios({
      method: 'get',
      url: `${config.checkProfile}/${this.state.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          profile: data,
          loading: false,
        });
        console.log('profile', this.state.profile);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        console.log(`error is ${err}`);
        console.log(this.state.token);
        {
          err == 'Network Error' ? this.retrieveForumAgain() : null;
        }
      });
  };

  componentDidMount() {
    this._retrieveData();
    this.getUserProfile();
  }

  render() {
    // const {colors} = this.props.theme;
    const {username, profile} = this.state;
    const {avatar} = this.props
    var today = new Date();
    const curHour = today.getHours();
    // console.log(curHour);

    if (curHour < 12) {
      greeting = 'Good morning,';
    } else if (curHour > 11 && curHour < 18) {
      greeting = 'Good day,';
    } else {
      greeting = 'Good evening,';
    }

    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <View style={styles.header}>
            {avatar ? (
                  <Image
                    style={{height: 50, width: 50, borderRadius: 25}}
                    source={{uri: avatar}}
                  />
                ) : (
                  <Image
                    style={{height: 50, width: 50, borderRadius: 25}}
                    source={require('../../assets/images/header.png')}
                  />
                )}
              <TouchableOpacity onPress={value.changeThemeMode}>
                {value.mode.background =='#50434F'  ? (
                  <Ionicons name="md-sunny" color='white' size={26} />
                ) : (
                  <Feather name="moon" color={colors.grey2} size={26} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.welcomeTxt}>
              <Text style={styles.loveTxt}>Loving your zeal...</Text>

              <Text style={[styles.greetTxt, {color: value.mode.text}]}>
                {greeting} {username}
              </Text>
            </View>
            <View>
              <DashboardCard 
               securities={this.props.securities}
               mysecurities={this.props.mysecurities}
              level={profile.level} />
              <VisitedForums userforums ={this.props.userforums}/>
              <TransactionHistory transaction = {this.props.transaction}  />
            </View>
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: 30,
    padding: 12,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeTxt: {
    marginTop: 40,
    padding: 12,
  },
  loveTxt: {
    color: colors.grey3,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  greetTxt: {
    fontSize: 30,
    color: colors.grey2,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    paddingLeft: 8,
  },
});
