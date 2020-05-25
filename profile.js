import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import {config} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

export default class Profile extends Component {
  state = {
    id: '',
    token: '',
    profile: '',
  };
  _retrieveData = async () => {
    await AsyncStorage.getItem('token')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          token: valueJson,
        });
        // console.log('Token Data retrieved successfully', this.state.token);
      })
      .catch(error => {
        // console.log('There was an error retrieving the data' + error);
      });

    await AsyncStorage.getItem('id')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          id: valueJson,
        });
        // console.log('ID Data retrieved successfully', this.state.id);
      })
      .catch(error => {
        // console.log('There was an error retrieving the ID data' + error);
      });
  };

  async componentDidMount() {
    await this._retrieveData();
    await this.getUserProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.profile !== this.state.profile) {
      this.getUserProfile();
      // console.log('did update in profile', prevState);
    }
  }

  componentWillUnmount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    await axios({
      method: 'get',
      url: `${config.checkProfile}${this.state.id}/`,
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
        // console.log('profile', this.state.profile);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        // console.log(`error is ${err}`);
        // console.log(this.state.token);
      });
  };

  render() {
    const {profile} = this.state;
    const {userdata} = this.props
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <Fragment>
              <View style={styles.root}>
                <View style={{alignItems: 'center'}}>
                  {profile.avatar ? (
                    <Image
                      style={{height: 120, width: 120, borderRadius: 60, marginBottom: 10}}
                      source={{uri: profile.avatar}}
                    />
                  ) : (
                    <Image
                      style={{height: 120, width: 120, borderRadius: 60}}
                      source={require('../../assets/images/header.png')}
                    />
                  )}
                </View>
              </View>

              <View style={styles.profileList}>
                <Feather name="user" size={26} color={colors.baseBorder} />
                <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                  {profile.username}
                </Text>
              </View>
              <View style={styles.profileList}>
                <Ionicons
                  name="ios-person"
                  size={30}
                  color={colors.baseBorder}
                />
                <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                  {profile.first_name}
                </Text>
              </View>

              <View style={styles.profileList}>
                <Material name="person" size={26} color={colors.baseBorder} />
                <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                  {profile.last_name}
                </Text>
              </View>

              <View style={styles.profileList}>
                <Material name="person" size={26} color={colors.baseBorder} />
                <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                  {profile.middle_name}
                </Text>
              </View>

              <View style={styles.profileList}>
                <Material name="email" size={26} color={colors.baseBorder} />
                <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                  {profile.email}
                </Text>
              </View>

              <View style={{}}>
                <View style={styles.profileList}>
                  <Icon name="phone" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    {profile.phone}
                  </Text>
                </View>

                
              </View>
            </Fragment>
            <View style={{height: 20}} />
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    // paddingHorizontal: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
  },
  levelTxt: {
    fontSize: 15,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: '#EF95F1',
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  profileList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.baseBorder,
    marginBottom: 12,
  },
  profileTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 30,
    fontFamily: 'quicksand',
  },
  contactTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'quicksand',
    textAlign: 'center',
  },
});
