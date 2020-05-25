import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {config} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Contact extends Component {
  state = {
    profile: [],
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
    await this.getAppDetails();
  }

  getAppDetails = async () => {
    await axios({
      method: 'get',
      url: config.contactUs,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          profile: data[0],
          loading: false,
        });
        // console.log('profile', this.state.profile[0]);
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
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <Fragment>
              <View style={[styles.container]}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack(null)}>
                    <Ionicons
                      name="ios-arrow-round-back"
                      size={30}
                      color={value.mode.text}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.headerTxt, {color: value.mode.text}]}>
                    {' '}
                    Contact Us{' '}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        showEditProfile: !this.state.showEditProfile,
                      })
                    }
                  />
                </View>
              </View>

              <View style={{marginVertical: 40}}>
                <Text style={[styles.contactTxt, {color: value.mode.text}]}>
                  You can reach us on our various channels below.
                </Text>
              </View>

              <View style={{marginTop: 20}}>
                {/* <View style={styles.profileList}>
                  <Icon name="phone" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    {profile.contact_phone}
                  </Text>
                </View> */}

                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${profile.contact_phone}`) }
                  style={styles.profileList}>
                   <Icon name="phone" size={26} color={colors.baseBorder} />
                    <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    {profile.contact_phone}
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity 
                  onPress={() => Linking.openURL(`mailto:${profile.contact_email}?subject="Hello Admin"&body=Description`) }                
                style={styles.profileList}>
                  <Material name="email" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    {profile.contact_email}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Linking.openURL(profile.facebook)}
                  style={styles.profileList}>
                  <Icon
                    name="facebook-official"
                    size={26}
                    color={colors.baseBorder}
                  />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    facebook.com/finvest
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Linking.openURL(profile.twitter)}
                  style={styles.profileList}>
                  <Icon name="twitter" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    twitter.com/finvest
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Linking.openURL(profile.instagram)}
                  style={styles.profileList}>
                  <Icon name="instagram" size={26} color={colors.baseBorder} />

                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    instagram.com/finvest
                  </Text>
                </TouchableOpacity>

                <View style={styles.profileList}>
                  <Material
                    name="location-on"
                    size={26}
                    color={colors.baseBorder}
                  />
                  <Text style={[[styles.profileTxt, {color: value.mode.text}]]}>
                    {profile.contact_addr}
                  </Text>
                </View>
              </View>
            </Fragment>
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    // paddingHorizontal: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
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
    padding: 13,
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
