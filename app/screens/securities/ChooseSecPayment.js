import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {config} from '../../../config'

const HEIGHT = Dimensions.get('window').height;

export default class ChooseSecPayment extends Component {
  state = {
    visible: false,
    amountCounter: 0,
    profile: '',
    token: ''
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
        console.log('There was an error retrieving the data' + error);
      });

   
  };

  getUserProfile = async () => {
    await axios({
      method: 'get',
      url: `${config.checkProfile}${this.state.id}`,
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

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    const {profile} = this.state;
    const {state} = this.props.navigation;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <View style={styles.container}>
              <Header headerName={state.params.title} />
              <View style={styles.welcome}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.salutation, {color: value.mode.text}]}>
                    Hi!
                  </Text>
                  <Text style={[styles.nameTxt, {color: value.mode.text}]}>
                    {profile.username}
                  </Text>
                </View>
                <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                  We are glad to have you join us. Kindly choose your preferred
                  payment option to buy your securities.
                </Text>

                <View style={{marginTop: 40}}>
                  <Text style={[styles.inputCode, {color: value.mode.text}]}>
                    {' '}
                    Pay Subscription{' '}
                  </Text>
                </View>
              </View>
              <View>
                {/* <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Account Holder
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    {profile.first_name} {profile.last_name}
                  </Text>
                </View> */}

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Package
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    {state.params.title}
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Current Value/Unit
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    N{this.formatNumber(state.params.price)}
                  </Text>
                </View>
              </View>

              <View style={{marginTop: 40}}>
                <Text style={[styles.instructions, {color: value.mode.text}]}>
                  You are about to pay for {``}
                  <Text
                    style={[
                      styles.instructions,
                      {color: colors.baseBorder, fontWeight: 'bold'},
                    ]}
                  />
                  <Text
                    style={[
                      styles.instructions,
                      {color: colors.baseBorder, fontWeight: 'bold'},
                    ]}>
                    {state.params.title}
                  </Text>
                  {` `}securities
                </Text>
              </View>

              <View style={{marginTop: 40}}>
                <Text style={[styles.inputCode, {color: value.mode.text}]}>
                  {' '}
                  Choose Payment Option{' '}
                </Text>
              </View>

              <View style={styles.footerWrapper}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SecPaymentPage', {
                        id: state.params.id,
                        logo: state.params.logo,
                        price: state.params.price,
                        title: state.params.title,
                        access: state.params.access,
                        name: state.params.name,
                      })
                    }
                    style={styles.iconWrapper}>
                    <Image
                      source={require('../../assets/images/paystack.png')}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.footerTxt, {color: value.mode.text}]}>
                    Paystack
                  </Text>
                </View>

                <View style={{alignItems: 'center', marginLeft: 50}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SecBankTeller', {
                      id: state.params.id,
                    })}
                    style={styles.iconWrapper}>
                    <Image source={require('../../assets/images/teller.png')} />
                  </TouchableOpacity>
                  <Text style={[styles.footerTxt, {color: value.mode.text}]}>
                    Bank Teller
                  </Text>
                </View>
              </View>
            </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
    alignItems: 'center',
  },
  buyTxt: {
    fontSize: 25,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.baseBorder,
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  buyBtn: {
    backgroundColor: colors.baseBorder,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  chooseAmount: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  counterContainer: {
    backgroundColor: colors.baseColor3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterTxt: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.grey2,
  },
  welcome: {
    marginTop: 40,
    padding: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 0.9,
    borderColor: colors.baseBorder,
    // paddingBottom: 10,
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 12,
    width: '90%',
    height: 40,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    left: 8,
    alignItems: 'center',
  },
  phoneNum: {
    backgroundColor: '#CA1A8E',
    padding: 12,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  welcomeTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  nameTxt: {
    fontFamily: 'quicksand',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 6,
    color: colors.grey2,
  },
  salutation: {
    fontFamily: 'quicksand',
    fontSize: 26,
    color: colors.grey2,
  },
  inputCode: {
    fontFamily: 'quicksand',
    fontSize: 20,
    color: colors.grey2,
    fontWeight: 'bold',
  },
  instructions: {
    fontFamily: 'quicksand',
    textAlign: 'center',
    color: colors.grey2,
    fontSize: 14,
    padding: 14,
  },
  footerWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconWrapper: {
    borderWidth: 0.1,
    borderColor: colors.baseBorder,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  footerTxt: {
    color: colors.grey2,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'quicksand',
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
});
