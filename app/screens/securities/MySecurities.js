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
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/colors';
import CardView from 'react-native-cardview';
import {withNavigation} from 'react-navigation';
import Loader from '../../components/helpers/Loader';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import Header from '../../components/helpers/Header';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class MySecurities extends React.Component {
  state = {
    grid: true,
    activeIndex: 0,
    modalVisible: false,
    investments: [],
    mySecurities: [],
    token: '',
    loading: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    mysecurities = navigation.getParam('data', '');
    this.setState({
      mySecurities: mysecurities,
    });
    console.log(mysecurities);
  }


  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  showSortModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    const {state} = this.props.navigation;
    const { loading} = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
                <Header  headerName = "Securities"/>
            <SafeAreaView>
             
              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                }}>
                <Text
                  style={[styles.yourSecurities, {color: value.mode.text}]}>
                  Your Securities
                </Text>
              </View>
              <FlatList
                data={state.params.data}
                renderItem={({item}) => {
                  if (state.params.data) {
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
                                        status: item.investment.status,
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
                                        members:
                                          item.investment.number_of_investors,
                                        unit_type: item.investment.unit_type,
                                      },
                                    )
                                  : this.props.navigation.navigate(
                                      'PaidSecurity',
                                      {
                                        id: item.investment.id,
                                        logo: item.investment.logo,
                                        title: item.investment.title,
                                        price: item.investment.price,
                                        status: item.investment.status,
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
                                        members:
                                          item.investment.number_of_investors,
                                        unit_type: item.investment.unit_type,
                                      },
                                    );
                              }}>
                              <CardView
                                style={{
                                  padding: 2,
                                  backgroundColor: value.mode.card,
                                }}
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={5}>
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
                                    <Text
                                      style={[
                                        styles.wordTxt,
                                        {width: WIDTH / 2},
                                      ]}>
                                      {item.investment.title}
                                    </Text>
                                    <Text style={{color: colors.grey2}}>
                                      <Text style={{color: colors.green}}>
                                        {item.roi}% {` `}
                                      </Text>
                                      in {item.investment.maturity_period}{' '}
                                      months.
                                    </Text>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 6,
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
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          marginLeft: WIDTH / 10,
                                        }}>
                                        <MaterialIcons
                                          name="credit-card"
                                          size={18}
                                          color={colors.blue}
                                        />
                                        <Text style={styles.secureTxt}>
                                          N{this.formatNumber(item.amount)}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text style={{color: colors.grey2}}>
                                        units bought
                                      </Text>
                                      <Text
                                        style={{
                                          color: colors.grey2,
                                          marginLeft: WIDTH / 10,
                                        }}>
                                        per share unit
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        backgroundColor: colors.green,
                                        marginLeft: WIDTH / 5,
                                        padding: 4,
                                        borderRadius: 10,
                                        width: 80,
                                        height: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 6,
                                      }}>
                                      <Text style={{color: colors.whitesmoke}}>
                                        {item.status}
                                      </Text>
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
            </SafeAreaView>

            {loading ? <Loader /> : null}
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

export default withNavigation(MySecurities);

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
