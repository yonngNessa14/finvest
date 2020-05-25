import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Header from '../../components/helpers/Header';
import Loader from '../../components/helpers/Loader';
import {config} from '../../../config';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const WIDTH = Dimensions.get('window').width;

class ChangePassword extends Component {
  state = {
    password: '',
    new_password1: '',
    new_password2: '',
    token: '',
  };

  updateDetails = async () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    const {password, new_password1, new_password2} = this.state;

    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: config.changePassword,
      data: {
        old_password: password,
        new_password1: new_password1,
        new_password2: new_password2,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(res => {
        // console.log(res.data);
        alert('Successfully Updated!');
        this.setState({
          loading: false,
          disableTouch: false,
        });
        setTimeout(() => {
          this.props.navigation.navigate('Account');
        }, 1000);
      })
      .catch(err => {
        // console.log(err);
        this.setState({
          loading: false,
          disableTouch: false,
          loading: false,
          visible: true,
          msg: 'Can not update your password at the moment,please try again',
          type: 'w',
        });
      });
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
        // console.log('ID Data retrieved successfully', this.state.token);
      })
      .catch(error => {
        // console.log('There was an error retrieving the data' + error);
      });
  };

  componentDidMount() {
    this._retrieveData();
  }

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  render() {
    const {navigation} = this.props;
    const {
      password,
      new_password1,
      new_password2,
      loading,
      visible,
      msg,
      type,
    } = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <Network>
            <ScrollView
              contentContainerStyle={{justifyContent: 'space-between'}}
              style={[
                styles.container,
                {backgroundColor: value.mode.background},
              ]}>
              <Header headerName="Change Password" />

              <KeyboardAvoidingView>
                <View style={styles.root}>
                  <View style={{marginTop: 30}}>
                    <Text style={[styles.bioData, {color: value.mode.text}]}>
                      Password
                    </Text>
                  </View>

                  <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                    Current Password
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={{color: value.mode.text}}
                      autoCorrect={false}
                      value={password}
                      onChangeText={password => this.setState({password})}
                    />
                  </View>

                  <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                    New Password
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={{color: value.mode.text}}
                      autoCorrect={false}
                      value={new_password1}
                      onChangeText={new_password1 =>
                        this.setState({new_password1})
                      }
                    />
                  </View>

                  <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                    Confirm Password
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={{color: value.mode.text}}
                      autoCorrect={false}
                      value={new_password2}
                      onChangeText={new_password2 =>
                        this.setState({new_password2})
                      }
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>

              <TouchableOpacity
                onPress={() => this.updateDetails()}
                disabled={this.state.disableTouch}
                style={[
                  styles.loginBtn,
                  this.state.loading ? {backgroundColor: 'lightgray'} : null,
                ]}>
                <Text style={[styles.loginTxt]}>Change Password</Text>
              </TouchableOpacity>
              {loading ? <Loader /> : null}
              <View style={{height: 50}} />
              <Snackbar
                visible={visible}
                handleClose={this.handleClose}
                msg={msg}
                type={type}
              />
            </ScrollView>
          </Network>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    height: '100%',
  },
  root: {
    marginHorizontal: 20,
    flex: 0.8,
    alignItems: 'center',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
    alignItems: 'center',
  },

  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 45,
  },
  loginTxt: {
    color: colors.whitesmoke,
  },
  loginBtn: {
    backgroundColor: colors.baseBorder,
    borderRadius: 6,
    width: '90%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  bioData: {
    fontWeight: 'bold',
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontSize: 18,
  },
  bioTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 18,
  },
});

export default ChangePassword;
