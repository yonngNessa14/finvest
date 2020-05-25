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
} from 'react-native';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {config} from '../../../config';
import Header from '../../components/helpers/Header';
import Loader from '../../components/helpers/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;

class KycDetails extends Component {
  state = {
    id: '',
    bvn: '',
    address: '',
    state: '',
    username: '',
    status: '',
    data: '',
  };

  resolveBVN = async () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    await axios({
      method: 'get',
      url: `https://api.paystack.co/bank/resolve_bvn/${this.state.bvn}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer sk_live_dc7745495bf8d8ba983b4740162e592e532cdc73`,
      },
    })
      .then(res => {
        console.log(res);
        this.updateKyc();
        this.setState({
          firstName: res.data.first_name,
          lastName: res.data.last_name
        })
      })
      .catch(err => {
        console.log(err);
        
        this.setState({
          loading: false,
          disableTouch: false,

          visible: true,
          msg: 'Invalid BVN, please check and try again',
          type: 'w',
        });
      });
  };

  updateKyc = async () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    const {bvn, state, address, username, firstName, lastName, id} = this.state;

    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: `https://dozie.com.ng/api/v1/users/${id}/update_kyc/`,
      data: {
        name: firstName + lastName,
        bvn: bvn,
        address: address,
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
          this.props.navigation.navigate("Home");
        }, 1000);
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          loading: false,
          disableTouch: false,
          loading: false,
          visible: true,
          msg: 'Can not update your profile at the moment,please try again',
          type: 'w',
        });
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

  checkKycStatus = async () => {
    const {id} = this.state;
    await axios({
      method: 'get',
      url: `https://dozie.com.ng/api/v1/users/${id}/get_kyc/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(res => {
        this.setState({
          status: res.data.kyc_status,
          data: res.data,
        });
        console.log('check kyc', res.data);
      })
      .catch(err => {
        console.log(err);
        console.log(this.state.id);
        console.log(this.state.token);

        this.setState({
          loading: false,
          disableTouch: false,
          loading: false,
          visible: true,
          // msg: 'Can not update your profile at the moment,please try again',
          type: 'w',
        });
      });
  };
  componentDidMount = async () => {
    await this._retrieveData();
    await this.checkKycStatus();
  };

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
      bvn,
      address,
      status,
      loading,
      visible,
      msg,
      type,
      data,
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
              <Header headerName="KYC Details" />
              {status == 'pending' ? (
                <View style={{marginTop: 20}}>
                  <View style={styles.profileList}>
                    <MaterialCommunityIcons
                      name="bank"
                      size={26}
                      color={colors.baseBorder}
                    />
                    <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                      {data.bvn}
                    </Text>
                  </View>

                  <View style={styles.profileList}>
                    <Material
                      name="location-on"
                      size={26}
                      color={colors.baseBorder}
                    />
                    <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                      {data.address}
                    </Text>
                  </View>
                </View>
              ) : status == 'approved' ? (
                <View style={{marginTop: 20}}>
                  <View style={styles.profileList}>
                    <MaterialCommunityIcons
                      name="bank"
                      size={26}
                      color={colors.baseBorder}
                    />
                    <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                      {data.bvn}
                    </Text>
                  </View>

                  <View style={styles.profileList}>
                    <Material
                      name="location-on"
                      size={26}
                      color={colors.baseBorder}
                    />
                    <Text style={[styles.profileTxt, {color: value.mode.text}]}>
                      {data.address}
                    </Text>
                  </View>
                </View>
              ) : (
                <KeyboardAvoidingView>
                  <View style={styles.root} />
                  <View>
                    <View style={{marginVertical: 10}}>
                      <Text style={[styles.bioData, {color: value.mode.text}]}>
                        KYC Information
                      </Text>
                    </View>

                    <View>
                      <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                        BVN
                      </Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                        keyboardType={'numeric'}
                          style={{color: value.mode.text, width: '100%'}}
                          autoCorrect={false}
                          value={bvn}
                          onChangeText={bvn => this.setState({bvn})}
                        />
                      </View>

                      <Text style={[styles.bioTxt, {color: value.mode.text}]}>
                        Residential Address
                      </Text>
                      <View style={styles.inputLarge}>
                        <TextInput
                          style={{color: value.mode.text, width: '100%'}}
                          autoCorrect={false}
                          value={address}
                          onChangeText={address => this.setState({address})}
                        />
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => this.resolveBVN()}
                    disabled={this.state.disableTouch}
                    style={[
                      styles.loginBtn,
                      this.state.loading
                        ? {backgroundColor: 'lightgray'}
                        : null,
                    ]}>
                    <Text style={[styles.loginTxt]}>Update KYC</Text>
                  </TouchableOpacity>
                  {loading ? <Loader /> : null}
                </KeyboardAvoidingView>
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
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 45,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 95,
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
});

export default KycDetails;
