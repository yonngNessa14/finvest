import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import Feather from 'react-native-vector-icons/Feather';
import Securities from './Securities';
import Home from './Home';
import Stock from './Stock';
import Forums from './Forums';
import Account from './Account';
import {config} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Network from '../../components/helpers/Network';

export default class Footer extends Component {
  state = {
    activeIndex: 0,
    retrieveforumagain: [],
    forums: [],
    userforums: [],
    securities: [],
    mysecurities: [],
    transaction: [],
    profile: [],
    id: '',
    token: '',
  };

  //call functions before component mounts
  async componentDidMount() {
    await this._retrieveData();
    //Get Securities
    await this.getSecurities();
    //Get User Securities
    await this.getUserSecurities();

    //Forum
    await this.getForumList();
    await this.getUsersForum();
    await this.getUserTransaction();
    await this.getUserProfile();
  }

  screenClicked = index => {
    this.setState({
      activeIndex: index,
    });
  };

  //retrieve data
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
        this._retrieveData();
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
        console.log('There was an error retrieving the ID data' + error);
      });
  };

  //Securities Functions

  //Get all securities
  getSecurities = async () => {
    this.setState({
      // loading: true,
    });
    await axios({
      method: 'get',
      url: `${config.getInvestment}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          investments: data,
          loading: false,
        });
        // console.log('investments', this.state.investments);
      })
      .catch(err => {
        this.getSecurities();
        console.log(`error is ${err}`);
        console.log(this.state.token);
      });
  };

  //Get users securities
  getUserSecurities = async () => {
    // this.setState({
    //   loading: true,
    // });
    await axios({
      method: 'get',
      url: `${config.mySecurities}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          mySecurities: data,
          loading: false,
        });
        // this.getPaidSecurities()
        // console.log('investments', this.state.mySecurities);
      })
      .catch(err => {
        this.getUserSecurities();
        console.log(`error is ${err.response}`);
        console.log(this.state.token);
      });
  };

  // getPaidSecurities = () => {
  //  let security = this.state.theSecurities
  //  let paidSecurities = security.filter(data => data.status == 'paid')
  //  this.setState({
  //    mySecurities: paidSecurities
  //  })
  // }

  //Forums functions
  getForumList = async () => {
    await axios({
      method: 'get',
      url: `${config.getForums}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          forums: data,
          loading: false,
        });
        //  console.log('investments', this.state.forums);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        console.log(`error is ${err}`);
        console.log(this.state.token);
        this.getForumList();
      });
  };

  getUsersForum = async () => {
    await axios({
      method: 'get',
      url: `${config.myForums}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          userforums: data,
          loading: false,
        });
        // console.log('investments', this.state.myForums);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        this.getUsersForum();
        console.log(`error is ${err}`);
        console.log(this.state.token);
      });
  };

  //Transaction history
  getUserTransaction = async () => {
    await axios({
      method: 'get',
      url: config.transactionsHistory,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          transaction: data,
          loading: false,
        });
        // console.log('transaction', this.state.transaction);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        this.getUserTransaction();
        console.log(`error is ${err}`);
        console.log(this.state.token);
      });
  };

  //User Profile
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
        this.getUserProfile();
        console.log(`error is ${err}`);
        console.log(this.state.token);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mySecurities !== this.state.mySecurities) {
      this.setState({
        loading: false,
      });
      this.getUserSecurities();
      this.getSecurities();
      // console.log('securities', prevState);
    }

    if (prevState.myForums !== this.state.myForums) {
      this.getUsersForum();
      getForumList();
      // console.log('forum', prevState);
    }

    if (prevState.transaction !== this.state.transaction) {
      this.getUserTransaction();
      // console.log('transaction', prevState);
    }

    if (prevState.profile !== this.state.profile) {
      this.getUserProfile();
      // console.log('did update profile', prevState);
    }
  }

  renderScreen = () => {
    const {activeIndex} = this.state;
    if (activeIndex == 0) {
      return (
        <Home
          securities={this.state.investments}
          mysecurities={this.state.mySecurities}
          avatar={this.state.profile.avatar}
          userforums={this.state.userforums}
          transaction={this.state.transaction}
        />
      );
    } else if (activeIndex == 1) {
      return <Stock />;
    } else if (activeIndex == 2) {
      return (
        <Securities
          securities={this.state.investments}
          mysecurities={this.state.mySecurities}
        />
      );
    } else if (activeIndex == 3) {
      return (
        <Forums forums={this.state.forums} userforums={this.state.userforums} />
      );
    } else {
      return <Account profile={this.state.profile} />;
    }
  };

  render() {
    const {activeIndex} = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <Network>
            <View
              style={[
                styles.container,
                {backgroundColor: value.mode.background},
              ]}>
              {this.renderScreen()}
              <View
                style={
                  {
                    // top: HEIGHT - 110,
                  }
                }>
                <View
                  style={{
                    //   marginVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    borderTopWidth: 0.6,
                    borderTopColor: 'lightgray',
                    backgroundColor: value.mode.footBack,
                  }}>
                  <TouchableOpacity
                    style={[
                      activeIndex == 0 ? {color: 'white'} : {color: 'red'},
                      {alignItems: 'center'},
                    ]}
                    onPress={() => this.screenClicked(0)}
                    active={activeIndex == 0}>
                    <Feather
                      name="home"
                      size={30}
                      color={
                        activeIndex == 0
                          ? value.mode.footColor
                          : value.mode.footText
                      }
                    />
                    <Text
                      style={[
                        activeIndex == 0
                          ? {color: value.mode.footColor}
                          : {color: value.mode.footText},
                      ]}>
                      Home
                    </Text>
                  </TouchableOpacity>

                  <View>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => this.screenClicked(1)}
                      active={activeIndex == 2}>
                      <Feather
                        name="bar-chart-2"
                        size={30}
                        color={
                          activeIndex == 1
                            ? value.mode.footColor
                            : value.mode.footText
                        }
                      />
                      <Text
                        style={[
                          activeIndex == 1
                            ? {color: value.mode.footColor}
                            : {color: value.mode.footText},
                        ]}>
                        Stock
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => this.screenClicked(2)}
                      active={activeIndex == 3}>
                      <Feather
                        name="trending-up"
                        size={30}
                        color={
                          activeIndex == 2
                            ? value.mode.footColor
                            : value.mode.footText
                        }
                      />
                      <Text
                        style={[
                          activeIndex == 2
                            ? {color: value.mode.footColor}
                            : {color: value.mode.footText},
                        ]}>
                        Securities
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => this.screenClicked(3)}
                      active={activeIndex == 1}>
                      <Feather
                        name="message-square"
                        size={30}
                        color={
                          activeIndex == 3
                            ? value.mode.footColor
                            : value.mode.footText
                        }
                      />
                      <Text
                        style={[
                          activeIndex == 3
                            ? {color: value.mode.footColor}
                            : {color: value.mode.footText},
                        ]}>
                        Forums
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => this.screenClicked(4)}
                      active={activeIndex == 1}>
                      <Feather
                        name="user"
                        size={30}
                        color={
                          activeIndex == 4
                            ? value.mode.footColor
                            : value.mode.footText
                        }
                      />
                      <Text
                        style={[
                          activeIndex == 4
                            ? {color: value.mode.footColor}
                            : {color: value.mode.footText},
                        ]}>
                        Account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Network>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
