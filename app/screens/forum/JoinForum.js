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
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const HEIGHT = Dimensions.get('window').height;

export default class JoinForum extends Component {
  state = {
    visible: false,
    amountCounter: 0,
  };

  render() {
    const {state} = this.props.navigation;
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
                <Text style={[styles.chooseAmount, {fontSize: 25, color: value.mode.text}]}>
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
                    {state.params.number_of_members} Members
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
                      color: colors.grey2,
                      fontWeight: 'bold',
                      color: value.mode.text,
                    }}>
                    Paid Group
                  </Text>
                </View>
              </View>

              <View
                style={{alignItems: 'center', marginVertical: 40, padding: 12}}>
                <Text style={[styles.chooseAmount, {textAlign: 'center', color: value.mode.text,}]}>
                  {' '}
                  {state.params.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 18,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ValidateCode', {
                      id: state.params.id,
                      name: state.params.name,
                      price: state.params.price,
                      logo: state.params.logo,
                    })
                  }
                  style={styles.buyBtn}>
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

              <View>
                <Text
                  style={{
                    fontFamily: 'quicksand',
                    textAlign: 'center',
                    color: value.mode.text,
                    fontSize: 16,
                  }}>
                  Note: Joining this group would incur a monthly charge of N
                  {state.params.price}
                </Text>
              </View>
              <View style={{height: 100}} />
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
    height: HEIGHT,
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
});
