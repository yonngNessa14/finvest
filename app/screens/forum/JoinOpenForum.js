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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import axios from 'axios';
import {config} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import Loader from '../../components/helpers/Loader';

export default class JoinForum extends Component {
  state = {
    visible: false,
    amountCounter: 0,
    forumId: '',
    successModal: false,
    failModal: false,
    loading: false,
    disableTouch: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await this._retrieveData();
  }

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

  //API calls
  joinForum = async () => {
    const {navigation} = this.props;
    const ID = navigation.getParam('id', '');
    this.setState({
      forumId: ID,
      loading: true,
      disableTouch: true,
    });
    const {forumId} = this.state;
    console.log('before', forumId);
    await axios({
      method: 'post',
      url: config.joinForum,
      data: {
        forum_id: ID,
        reference_code: null,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          loading: !this.state.loading,

          // disableTouch: !this.state.loading,
        });
        this.showSuccessModal(), console.log('join forum', data);
        console.log('forum Id', this.state.forumId);
      })
      .catch(err => {
        this.setState({
          loading: !this.state.loading,
          // disableTouch: !this.state.loading,
        });
        this.showFailModal(),
          // console.log(`join forum error is ${err.response}`);
        // console.log('error forum Id', this.state.forumId);
        console.log('error forum Id', this.state.token);
      });
  };

  enterRoom = async () => {
    const {forumId} = this.state;
    await axios({
      method: 'get',
      url: `https://dozie.com.ng/api/v1/forums/${
        this.state.forumId
      }/enter_forum/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          loading: false,
        });
        // console.log('enter forum', data);
        // console.log('forum Id', this.state.forumId);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        console.log(`enter forum error is ${err}`);
      });
  };

  continueToChatPage = () => {
    const {navigation} = this.props;
    const forumId = navigation.getParam('id', '');
    const forumName = navigation.getParam('name', '');
    const forumLogo = navigation.getParam('logo', '');
    this.props.navigation.navigate('ChatPage', {
      id: forumId,
      name: forumName,
      logo: forumLogo,
    }),
      this.setState({
        successModal: false,
      });
  };

  //Modal functions
  showSuccessModal = () => {
    this.setState({
      successModal: true,
    });
  };

  showFailModal = () => {
    this.setState({
      failModal: true,
    });
  };

  hideFailure = () => {
    this.setState({
      failModal: false,
    });
  };

  render() {
    const {state} = this.props.navigation;
    const {successModal, failModal, loading} = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <Fragment>
              <Header headerName={state.params.name} />

              <View style={{margin: 12, alignItems: 'center'}}>
                <Image
                  style={{height: 150, width: 150}}
                  source={{uri: state.params.logo}}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.chooseAmount,
                    {fontSize: 25, color: value.mode.text},
                  ]}>
                  {' '}
                  {state.params.name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    alignItems: 'center',
                  }}>
                  <FontAwesome name="group" color={colors.green} size={22} />
                  <Text
                    style={{
                      marginLeft: 12,
                      fontSize: 15,
                      color: value.mode.text,
                      fontWeight: 'bold',
                    }}>
                    2k+ Members
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name="credit-card"
                    color={colors.blue}
                    size={22}
                  />
                  <Text
                    style={{
                      marginLeft: 16,
                      fontSize: 15,
                      color: value.mode.text,
                      fontWeight: 'bold',
                    }}>
                    {(state.free = 'true' ? 'Free Group' : 'Paid Group')}
                  </Text>
                </View>
              </View>

              <View
                style={{alignItems: 'center', marginVertical: 40, padding: 12}}>
                <Text
                  style={[
                    styles.chooseAmount,
                    {textAlign: 'center', color: value.mode.text},
                  ]}>
                  {' '}
                  This chatroom or forum is strictly for people interested in
                  the Nigerian Stock Exchange. Get tips, alerts and professional
                  advice from industry leaders in the stock market. Know when,
                  what and how to invest in the NSE.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 18,
                }}>
                <TouchableOpacity
                  onPress={() => this.joinForum()}
                  // disabled={!this.state.disableTouch}
                  style={[
                    styles.buyBtn,
                    !this.state.loading ? {backgroundColor: 'lightgray'} : null,
                  ]}>
                  <Text style={{marginRight: 12, color: colors.whitesmoke}}>
                    Join Forum
                  </Text>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={colors.whitesmoke}
                  />
                </TouchableOpacity>
              </View>
              {!loading ? <Loader /> : null}

              <View>
                <Text
                  style={{
                    fontFamily: 'quicksand',
                    textAlign: 'center',
                    color: value.mode.text,
                    fontSize: 16,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'quicksand',
                      textAlign: 'center',
                      color: value.mode.text,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Note:
                  </Text>
                  This an open chatroom as such no charges will be incurred, do
                  note that no form of payment is expected from you in this
                  chatroom.
                </Text>
              </View>

              <Modal isVisible={failModal}>
                <View style={{flex: 1, justifyContent: 'center', padding: 18}}>
                  <View style={{backgroundColor: 'white', borderRadius: 6}}>
                    <View
                      style={{
                        padding: 12,
                        marginVertical: 30,
                        alignItems: 'center',
                      }}>
                      <Entypo name="cross" size={100} color={colors.pink} />
                      <Text style={styles.successTxt}>
                        Fail to join {state.params.name} Forum, please try
                        again!
                      </Text>
                    </View>
                    <View style={{marginVertical: 20}}>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 15,
                          bottom: 2,
                        }}
                        onPress={this.hideFailure}>
                        <Text style={styles.creditDetails}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal isVisible={successModal}>
                <View style={{flex: 1, justifyContent: 'center', padding: 18}}>
                  <View style={{backgroundColor: 'white', borderRadius: 6}}>
                    <View
                      style={{
                        padding: 12,
                        marginVertical: 30,
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={100}
                        color={colors.green}
                      />
                      <Text style={styles.successTxt}>
                        You have successfully joined {state.params.name}{' '}
                        Forum!!!
                      </Text>
                    </View>
                    <View style={{marginVertical: 20}}>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 15,
                          bottom: 2,
                        }}
                        onPress={() => this.continueToChatPage()}>
                        <Text style={[styles.creditDetails]}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <View style={{height: 90}} />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
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
  successTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  creditDetails: {
    fontWeight: 'bold',

    fontSize: 18,
    color: colors.pink,
  },
});
