import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import LineChart from 'react-native-responsive-linechart';
import {Button, Paragraph, Menu, Divider, Provider} from 'react-native-paper';
import WhiteCard from '../../components/cards/WhiteCard';
import CardView from 'react-native-cardview';

const HEIGHT = Dimensions.get('window').height;

const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config = {
  interpolation: 'spline',
  area: {
    gradientFrom: 'white',
    gradientFromOpacity: 1,
    gradientTo: 'blue',
    gradientToOpacity: 0.4,
    backgroundColor: 'red',
  },
  line: {
    visible: false,
  },
};

export default class Securities extends Component {
  
  state = {
    visible: false,
  };

  _openMenu = () => this.setState({visible: true});

  _closeMenu = () => this.setState({visible: false});

  render() {
    const {state} = this.props.navigation
    return (
      <Provider>
        <ScrollView style={styles.container}>
          <Fragment>
            <View style={styles.header}>
             <TouchableOpacity
             onPress={() => this.props.navigation.goBack(null)}
             >
             <Ionicons
                name="ios-arrow-round-back"
                size={30}
                color={colors.grey2}
              />
             </TouchableOpacity>
              <Text style={styles.headerTxt}> {state.params.data} </Text>
              <Menu
                visible={this.state.visible}
                onDismiss={this._closeMenu}
                anchor={
                  <TouchableOpacity onPress={this._openMenu}>
                    <Feather
                      name="more-vertical"
                      size={30}
                      color={colors.grey2}
                    />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => {}} title="Add to Watchlist" />
                <Menu.Item onPress={() => {}} title="Read More" />
                <Menu.Item onPress={() => {}} title="Share Stock" />
              </Menu>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.stockDesc}>United Bank For Africa Plc</Text>
              <Text style={styles.stockPrice}>₦30.35</Text>
              <Text style={{color: colors.grey2, fontWeight: 'bold'}}>
                Current price
              </Text>
              <Text style={{color: colors.green, fontWeight: 'bold'}}>
                {' '}
                + 0.25 (3.33%)
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <LineChart
                style={{height: HEIGHT / 3}}
                config={config}
                data={data}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 18,
              }}>
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('BuyStock', {data: 'Wema Bank'})}
              style={styles.buysell}>
                <AntDesign
                  name="arrowdown"
                  size={20}
                  color={colors.whitesmoke}
                />
                <Text style={{marginLeft: 12, color: colors.whitesmoke}}>
                  Buy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('SellStock', {data: 'Wema Bank'})}
              style={styles.buysell}>
                <AntDesign name="arrowup" size={20} color={colors.whitesmoke} />
                <Text style={{marginLeft: 12, color: colors.whitesmoke}}>
                  Sell
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{margin: 20}}>
              <Text style={{color: colors.grey2, fontWeight: 'bold'}}>
                End of day: Thur, 6 Feb 2020
              </Text>
            </View>
            <View style={{paddingHorizontal: 12}}>
              <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={[styles.nameCardTxt, {color: colors.green}]}>
                      7:50
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>

            <View style={{margin: 20, marginLeft: 12}}>
              <Text style={{color: colors.grey2, fontWeight: 'bold'}}>
                Performance History
              </Text>
            </View>

            <View style={{paddingHorizontal: 12}}>
              <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={[styles.nameCardTxt, {color: colors.green}]}>
                      7:50
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>

            <View style={{margin: 20, marginLeft: 12}}>
              <Text style={{color: colors.grey2, fontWeight: 'bold'}}>
                NSE Rank
              </Text>
            </View>
            <View style={{paddingHorizontal: 12}}>
              <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={[styles.nameCardTxt, {color: colors.green}]}>
                      7:50
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>


            <View style={{margin: 20, marginLeft: 12}}>
              <Text style={{color: colors.grey2, fontWeight: 'bold'}}>
                6 Year Average
              </Text>
            </View>
            <View style={{paddingHorizontal: 12}}>
              <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={styles.nameCardTxt}>7:50</Text>
                  </View>
                </View>

                <View style={styles.cardStyles}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nameCardTxt}>Open</Text>
                    <Text style={styles.valueCardTxt}>7:50</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name2CardTxt}>Open</Text>
                    <Text style={[styles.nameCardTxt, {color: colors.green}]}>
                      7:50
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>

            <View style={{height: HEIGHT / 10}} />
          </Fragment>
        </ScrollView>
      </Provider>
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
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  stockDesc: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.grey2,
  },
  stockPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.grey2,
    fontFamily: 'quicksand',
  },
  buysell: {
    backgroundColor: colors.baseBorder,
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  cardStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  valueCardTxt: {
    marginLeft: 90,
    color: colors.grey2,
    fontWeight: 'bold',
  },
  nameCardTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
  },
  name2CardTxt: {
    marginRight: 90,
    color: colors.grey2,
    fontWeight: 'bold',
  },
});
