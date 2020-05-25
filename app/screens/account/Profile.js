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
import Profile from './Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const WIDTH = Dimensions.get('window').width;

class AccountSettings extends Component {
  state = {
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    pnumber: '',
    username: '',
    disableTouch: false,
    token: '',
    showEditProfile: false,
    profilePic: {},
    photo: '',
  };

  updateDetails = async () => {
    if (this.state.pnumber.length == 11) {
      this.setState({
        loading: true,
        disableTouch: true,
      });
      const {
        username,
        firstname,
        lastname,
        middlename,
        email,
        pnumber,
      } = this.state;

      Keyboard.dismiss();
      await axios({
        method: 'put',
        url: `https://dozie.com.ng/api/v1/users/${this.state.id}/`,
        data: {
          username: username,
          first_name: firstname,
          last_name: lastname,
          middle_name: middlename,
          phone: pnumber,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${this.state.token}`,
        },
      })
        .then(res => {
          console.log(res.data);
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
          console.log(err);
          this.setState({
            loading: false,
            disableTouch: false,
            loading: false,
            visible: true,
            msg: 'Can not update your profile at the moment,please try again',
            type: 'w',
          });
        });
    } else {
      alert('Input a valid phone number');
    }
  };

  async componentDidMount() {
    await this.getUserProfile();
  }

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

  _retrieveData = async () => {
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
        console.log('There was an error retrieving the data' + error);
      });

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
        console.log('There was an error retrieving the data' + error);
      });

    await AsyncStorage.getItem('username')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          username: valueJson,
        });
        // console.log(
        //   'username Data retrieved successfully',
        //   this.state.username,
        // );
      })
      .catch(error => {
        console.log('There was an error retrieving the data' + error);
      });
  };

  updatePicture = () => {
    const options = {
      title: 'Select Photo',
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({
          profilePic: response,
        });

        console.log('profile pic', this.state.profilePic);
        this.uploadPicture();
      }
    });
  };

  uploadPicture = async () => {
    const {username, profilePic} = this.state;

    let formData = new FormData();

    formData.append('username', username);
    formData.append('avatar', {
      uri: profilePic.uri,
      name: profilePic.fileName,
      type: profilePic.type,
      path: profilePic.path,
    });

    await axios
      .put(`https://dozie.com.ng/api/v1/users/${this.state.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${this.state.token}`,
        },
      })
      .then(res => {
        this.setState({
          photo: res.data.avatar,
        });
        console.log(res.data);
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
        console.log(err);
        this.setState({
          loading: false,
          disableTouch: false,
          loading: false,
          visible: true,
          msg: 'Can not upload the picture at the moment,please try again',
          type: 'w',
        });
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
    const {state} = this.props.navigation;
    const {navigation} = this.props;
    const {
      firstname,
      lastname,
      middlename,
      email,
      pnumber,
      loading,
      visible,
      msg,
      type,
      showEditProfile,
      profilePic,
      photo,
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
                  Profile{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      showEditProfile: !this.state.showEditProfile,
                    })
                  }>
                  <AntDesign size={20} color={value.mode.text} name="edit" />
                </TouchableOpacity>
              </View>
              {showEditProfile ? (
                <View>
                  <KeyboardAvoidingView>
                    <View style={styles.root}>
                      <View style={{alignItems: 'center'}}>
                        {profilePic == {} ? (
                          <Image
                            style={{height: 120, width: 120, borderRadius: 60}}
                            source={{uri: photo}}
                          />
                        ) : (
                          <Image
                            style={{height: 120, width: 120, borderRadius: 60}}
                            source={require('../../assets/images/header.png')}
                          />
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={this.updatePicture}
                        style={{alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: value.mode.text,
                            fontWeight: 'bold',
                          }}>
                          Update Picture
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <View style={{marginVertical: 10}}>
                        <Text
                          style={[styles.bioData, {color: value.mode.text}]}>
                          Update Details{' '}
                        </Text>
                      </View>

                      <View>
                        <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                          First Name
                        </Text>
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={{color: value.mode.text}}
                            autoCorrect={false}
                            value={firstname}
                            onChangeText={firstname =>
                              this.setState({firstname})
                            }
                          />
                        </View>

                        <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                          Middle Name
                        </Text>
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={{color: value.mode.text}}
                            autoCorrect={false}
                            value={middlename}
                            onChangeText={middlename =>
                              this.setState({middlename})
                            }
                          />
                        </View>

                        <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                          Last Name
                        </Text>
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={{color: value.mode.text}}
                            autoCorrect={false}
                            value={lastname}
                            onChangeText={lastname => this.setState({lastname})}
                          />
                        </View>

                        <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                          Phone Number
                        </Text>
                        <View style={styles.inputContainer}>
                          <TextInput
                            keyboardType={'number-pad'}
                            style={{color: value.mode.text}}
                            autoCorrect={false}
                            value={pnumber}
                            onChangeText={pnumber => this.setState({pnumber})}
                          />
                        </View>
                      </View>
                    </View>
                  </KeyboardAvoidingView>

                  <TouchableOpacity
                    onPress={() => this.updateDetails()}
                    disabled={this.state.disableTouch}
                    style={[
                      styles.loginBtn,
                      this.state.loading
                        ? {backgroundColor: 'lightgray'}
                        : null,
                    ]}>
                    <Text style={[styles.loginTxt]}>Update Details</Text>
                  </TouchableOpacity>
                  {loading ? <Loader /> : null}
                </View>
              ) : (
                <Profile userdata={state.params.data} />
              )}
              <View style={{height: 80}} />

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
    marginVertical: 18,
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
  editTxt: {
    color: colors.whitesmoke,
  },
});

export default AccountSettings;
