import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constants/colors';
import CardView from 'react-native-cardview';
import {withNavigation} from 'react-navigation';
import Modal from 'react-native-modal';
import Loader from '../../components/helpers/Loader';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import {config} from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class Securities extends React.Component {
  state = {
    grid: true,
    activeIndex: 0,
    modalVisible: false,
    investments: [],
    mySecurities: [],
    token: '',
    loading: false,
  };

  async componentDidMount() {
    await this._retrieveData();
    //Get Securities
    // await this.getSecurities();
    //Get User Securities
    // await this.getUserSecurities();
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
  };

  //Get all securities
  //  getSecurities = async () => {
  //   this.setState({
  //     // loading: true,
  //   });
  //   await axios({
  //     method: 'get',
  //     url: `${config.getInvestment}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `JWT ${this.state.token}`,
  //     },
  //   })
  //     .then(({data}) => {
  //       this.setState({
  //         investments: data,
  //         loading: false,
  //       });
  //       // console.log('investments', this.state.investments);
  //     })
  //     .catch(err => {
  //       this.getSecurities();
  //       console.log(`error is ${err}`);
  //       console.log(this.state.token);
  //     });
  // };

  // //Get users securities
  // getUserSecurities = async () => {
  //   // this.setState({
  //   //   loading: true,
  //   // });
  //   await axios({
  //     method: 'get',
  //     url: `${config.mySecurities}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `JWT ${this.state.token}`,
  //     },
  //   })
  //     .then(({data}) => {
  //       this.setState({
  //         theSecurities: data,
  //         loading: false,
  //       });
  //       this.getPaidSecurities()
  //        console.log('investments', this.state.mySecurities);
  //     })
  //     .catch(err => {
  //       this.getUserSecurities()
  //       console.log(`error is ${err}`);
  //       console.log(this.state.token);
  //     });
  // };

  // getPaidSecurities = () => {
  //  let security = this.state.theSecurities
  //  let paidSecurities = security.filter(data => data.status == 'paid')
  //  this.setState({
  //    mySecurities: paidSecurities
  //  })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.mySecurities !== this.props.mysecurities) {
  //     this.getUserSecurities();
  //     this.getSecurities();
  //    this.props.mysecurities = this.state.mySecurities
  //   }

  // }

  pageClicked = index => {
    this.setState({
      activeIndex: index,
    });
  };

  toggleStock = () => {
    this.setState({
      grid: !this.state.grid,
    });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  showSortModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  renderPage = () => {
    const {activeIndex, mySecurities} = this.state;
    const {securities, mysecurities} = this.props;
    // console.log('..s', securities);
    var maxlimit = 16;
    if (activeIndex == 0) {
      return (
        <FlatList
          data={this.props.securities}
          renderItem={({item}) => {
            if (securities) {
              return (
                <ThemeConsumer>
                  {value => (
                    <View key={item.title} style={{padding: 18}}>
                      <TouchableOpacity
                        activeOpacity={0}
                        onPress={() =>
                          this.props.navigation.navigate('SecurityDetails', {
                            id: item.id,
                            title: item.title,
                            logo: item.logo,
                            maturityPeriod: item.maturity_period,
                            price: item.price,
                            status: item.status,
                            investmentType: item.investment_type,
                            insurancePartner: item.insurance_partner,
                            payoutType: item.payout_type,
                            extraInfo: item.extra_info,
                            roi: item.roi,
                            unit: item.units_available,
                            members: item.number_of_investors,
                            unit_type: item.unit_type,
                            start_date: item.start_date,
                            end_date: item.end_date,
                          })
                        }>
                        <CardView
                          style={{padding: 2, backgroundColor: value.mode.card}}
                          cardElevation={2}
                          cardMaxElevation={2}
                          cornerRadius={12}>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                borderRightWidth: 0.6,
                                borderRightColor: 'lightgray',
                                padding: 2.4,
                              }}>
                              <Image
                                style={{
                                  height: 120,
                                  width: 100,
                                  resizeMode: 'contain',
                                }}
                                source={{uri: item.logo}}
                              />
                            </View>
                            <View style={{marginTop: 12, marginLeft: 12}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={[
                                    styles.wordTxt,
                                    {width: WIDTH / 2.5},
                                  ]}>
                                  {item.title.length > maxlimit
                                    ? item.title.substring(0, maxlimit - 3) +
                                      '...'
                                    : item.title}
                                </Text>

                                <View
                                  style={{
                                    backgroundColor: item.units_available <= 0 ? colors.pink : colors.green,
                                    padding: 3,
                                    // borderRadius: 14,
                                    width: 120,
                                    height: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: -14,
                                    position: 'absolute',
                                    right: -55,
                                  }}>
                                  <Text
                                    style={{
                                      color: colors.whitesmoke,
                                      fontSize: 12,
                                    }}>
                                    {item.units_available <= 0
                                      ? 'Sold out'
                                      : `${item.units_available} units available`}
                                  </Text>
                                </View>
                              </View>

                              <Text style={{color: colors.grey2}}>
                                <Text style={{color: colors.green}}>
                                  {item.roi}% {` `}
                                </Text>
                                in {item.maturity_period} months.
                              </Text>
                              <View
                                style={{
                                  // flexDirection: 'row',
                                  marginTop: 6,
                                  justifyContent: 'flex-start',
                                }}>
                                {/* <View style={{flexDirection: 'row'}}>
                                  <FontAwesome
                                    name="users"
                                    size={18}
                                    color={colors.green}
                                  />
                                  <Text style={styles.secureTxt}>
                                    {item.number_of_investors}{' '}
                                    <Text style={{fontWeight: 'normal'}}>
                                      investors{' '}
                                    </Text>
                                  </Text>
                                </View> */}

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginTop: 6,
                                    // marginLeft: WIDTH / 10,
                                  }}>
                                  <MaterialIcons
                                    name="credit-card"
                                    size={18}
                                    color={colors.blue}
                                  />
                                  <Text style={styles.secureTxt}>
                                    ₦{this.formatNumber(item.price)}{' '}
                                    <Text style={{fontWeight: 'normal'}}>
                                      per share unit{' '}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </CardView>
                      </TouchableOpacity>
                    </View>
                  )}
                </ThemeConsumer>
              );
            } else {
              console.log('tpbi');
            }
          }}
          keyExtractor={item => item.id}
        />
      );
    } else if (activeIndex == 1) {
      return (
        <FlatList
          data={this.props.mysecurities}
          renderItem={({item}) => {
            if (securities) {
              return (
                <ThemeConsumer>
                  {value => (
                    <View
                      key={item.id}
                      style={{
                        padding: 18,
                        backgroundColor: value.mode.background,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0}
                        onPress={() => {
                          item.status == 'pending'
                            ? this.props.navigation.navigate(
                                'SecurityDetails',
                                {
                                  id: item.investment.id,
                                  logo: item.investment.logo,
                                  title: item.investment.title,
                                  price: item.investment.price,
                                  status: item.status,
                                  roi: item.investment.roi,
                                  mature: item.investment.maturity_period,
                                  investmentType:
                                    item.investment.investment_type,
                                  insurancePartner:
                                    item.investment.insurance_partner,
                                  payoutType: item.investment.payout_type,
                                  extraInfo: item.investment.extra_info,
                                  roi: item.investment.roi,
                                  unit: item.investment.units_available,
                                  members: item.investment.number_of_investors,
                                  unit_type: item.investment.unit_type,
                                },
                              )
                            : this.props.navigation.navigate('PaidSecurity', {
                                id: item.id,
                                logo: item.investment.logo,
                                title: item.investment.title,
                                price: item.investment.price,
                                status: item.status,
                                roi: item.investment.roi,
                                mature: item.investment.maturity_period,
                                investmentType: item.investment.investment_type,
                                insurancePartner:
                                  item.investment.insurance_partner,
                                payoutType: item.investment.payout_type,
                                extraInfo: item.investment.extra_info,
                                roi: item.investment.roi,
                                unit: item.investment.units_available,
                                members: item.investment.number_of_investors,
                                unit_type: item.investment.unit_type,
                              });
                        }}>
                        <CardView
                          style={{padding: 2, backgroundColor: value.mode.card}}
                          cardElevation={2}
                          cardMaxElevation={2}
                          cornerRadius={12}>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              style={{
                                height: 120,
                                width: 100,
                                resizeMode: 'contain',
                              }}
                              source={{uri: item.investment.logo}}
                            />

                            <View style={{marginTop: 12, marginLeft: 12}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={[styles.wordTxt, {width: WIDTH / 2}]}>
                                  {item.investment.title}
                                </Text>

                                <View
                                  style={{
                                    padding: 3,
                                    height: 20,
                                    position: 'absolute',
                                    right: -45,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: -14,
                                    backgroundColor: item.status == 'liquidate' ? colors.pink : colors.green,
                                  }}>
                                  <Text
                                    style={{
                                      color: colors.whitesmoke,
                                      textTransform: 'capitalize',
                                    }}>
                                    {item.status == 'liquidate'  ? 'Liquidated' : item.status}
                                  </Text>
                                </View>
                              </View>

                              <Text style={{color: colors.grey2}}>
                                <Text style={{color: colors.green}}>
                                  {item.roi}% {` `}
                                </Text>
                                in {item.investment.maturity_period} months.
                              </Text>
                              <View
                                style={{
                                  // flexDirection: 'row',
                                  marginVertical: 8,
                                  justifyContent: 'flex-start',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <MaterialCommunityIcons
                                    name="coins"
                                    size={18}
                                    color={colors.green}
                                  />
                                  <Text style={styles.secureTxt}>
                                    {item.units}{' '}
                                    <Text style={{fontWeight: 'normal'}}>
                                      units bought
                                    </Text>
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // marginLeft: WIDTH / 10,
                                    marginTop: 6,
                                  }}>
                                  <MaterialIcons
                                    name="credit-card"
                                    size={18}
                                    color={colors.blue}
                                  />
                                  <Text style={styles.secureTxt}>
                                    ₦{this.formatNumber(item.amount)}{' '}
                                    <Text style={{fontWeight: 'normal'}}>
                                      per share unit
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </CardView>
                      </TouchableOpacity>
                    </View>
                  )}
                </ThemeConsumer>
              );
            }
          }}
          keyExtractor={item => item.id}
        />
      );
    }
  };

  render() {
    const {securities, mysecurities} = this.props;
    const {activeIndex, grid, modalVisible, loading} = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <SafeAreaView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 12,
                }}>
                <Text style={[styles.header, {color: value.mode.text}]}>
                  Securities
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/* <TouchableOpacity onPress={() => this.showSortModal()}>
                    <MaterialIcons color={colors.grey2} size={24} name="sort" />
                  </TouchableOpacity> */}
                </View>
              </View>

              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 30,
                }}>
                <TouchableOpacity
                  onPress={() => this.pageClicked(0)}
                  active={activeIndex == 0}
                  style={[
                    activeIndex == 0
                      ? {
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 1,
                          width: '50%',
                        }
                      : null,
                  ]}>
                  <Text
                    style={[
                      activeIndex == 0
                        ? styles.exploreSecuritiesFocus
                        : styles.exploreSecurities,
                    ]}>
                    Explore Securities
                  </Text>
                </TouchableOpacity>

                <View>
                  <TouchableOpacity
                    onPress={() => this.pageClicked(1)}
                    active={activeIndex == 1}
                    style={[
                      activeIndex == 1
                        ? {
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 1,
                            // width: '30%',
                          }
                        : null,
                    ]}>
                    <Text
                      style={[
                        activeIndex == 1
                          ? styles.yourSecuritiesFocus
                          : styles.yourSecurities,
                      ]}>
                      Your Securities
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.renderPage()}
              </ScrollView>
            </SafeAreaView>

            <Modal
              onBackdropPress={() => this.setState({modalVisible: false})}
              isVisible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <FontAwesome
                      color={colors.baseBorder}
                      name="sort-amount-desc"
                      size={20}
                    />
                    <Text style={styles.modalText}>Sort by Status</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.sortAlpha}
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <FontAwesome
                      color={colors.baseBorder}
                      name="sort-alpha-asc"
                      size={20}
                    />
                    <Text style={styles.modalText}>Sort by Alphabet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <FontAwesome
                      color={colors.baseBorder}
                      name="sort-alpha-asc"
                      size={20}
                    />
                    <Text style={styles.modalText}>Sort by Share Value</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                    });
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {loading ? <Loader /> : null}
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

export default withNavigation(Securities);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    // marginTop: 25,
    // padding: 12,
  },
  header: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 19,
  },
  stockTxt: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  wordTxt: {
    color: colors.grey2,
    fontSize: 16,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
  sortMenu: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  exploreSecuritiesFocus: {
    marginLeft: 30,
    fontWeight: 'bold',
    color: colors.grey3,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },

  exploreSecurities: {
    marginLeft: 30,
    fontWeight: 'bold',
    color: colors.grey3,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },
  yourSecuritiesFocus: {
    marginRight: 30,
    fontWeight: 'bold',
    color: colors.grey2,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },

  yourSecurities: {
    marginRight: 30,
    fontWeight: 'bold',
    color: colors.grey3,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },
  centeredView: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
    width: WIDTH,
    marginLeft: -20,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: colors.baseBorder,
    borderWidth: 0.6,
    padding: 35,
    // alignItems: 'center',

    shadowColor: 'red',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 3.84,
    elevation: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: -20,
  },
  textStyle: {
    color: 'whitesmoke',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: colors.grey2,
    fontWeight: 'bold',
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'quicksand',
  },
});
