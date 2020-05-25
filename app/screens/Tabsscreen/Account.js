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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../config';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import {withNavigation} from 'react-navigation';

const HEIGHT = Dimensions.get('window').height;

class Account extends Component {
  state = {
    first_name: '',
    last_name: '',
    profile: '',
  };

  logout = () => {
    AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Login');
  };

  render() {
    const {profile} = this.props;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <Fragment>
              <View style={styles.header}>
                <Ionicons
                  // name="ios-arrow-round-back"
                  size={30}
                  color={colors.grey2}
                />
                <Ionicons size={30} color={colors.grey2} />

                <TouchableOpacity onPress={this.logout}>
                  <Text style={[styles.headerTxt, {color: colors.pink}]}>
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{margin: 12, alignItems: 'center'}}>
                {profile.avatar ? (
                  <Image
                    style={{height: 120, width: 120, borderRadius: 60}}
                    source={{uri: profile.avatar}}
                  />
                ) : (
                  <Image
                    style={{height: 120, width: 120, borderRadius: 60}}
                    source={require('../../assets/images/header.png')}
                  />
                )}
              </View>

              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.chooseAmount,
                    {fontSize: 25, color: value.mode.text},
                  ]}>
                  {profile.first_name} {profile.last_name}
                </Text>
                <Text style={styles.levelTxt}> Level {profile.level}</Text>
              </View>

              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AccountSettings', {
                      data: profile
                    })
                  }
                  style={styles.profileList}>
                  <Icon name="user" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    Profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ChangePassword')
                  }
                  style={styles.profileList}>
                  <Icon name="lock" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    Change Password
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Transactions')}
                  style={styles.profileList}>
                  <Icon name="history" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    Transaction History
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('KycDetails')}
                  style={styles.profileList}>
                  <Icon
                    name="sticky-note"
                    size={26}
                    color={colors.baseBorder}
                  />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    KYC Details
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Security')}
              style={styles.profileList}>
              <Material name="security" size={26} color={colors.baseBorder} />
              <Text style={[styles.profileTxt,  {color: value.mode.text}]}>Security Settings</Text>
            </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Feedback')}
                  style={styles.profileList}>
                  <Material
                    name="feedback"
                    size={26}
                    color={colors.baseBorder}
                  />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    Feedback
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Contact')}
                  style={styles.profileList}>
                  <Icon name="phone" size={26} color={colors.baseBorder} />
                  <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                    Contact Us
                  </Text>
                </TouchableOpacity>
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
    paddingHorizontal: 26,
    height: HEIGHT + 30,
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
    marginLeft: 40,
  },
});

export default withNavigation(Account);
