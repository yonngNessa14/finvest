import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


import { colors } from "../../constants/colors";
import Header from "../../components/helpers/Header";


export default class BuyStock extends Component {
  state = {
    visible: false,
    amountCounter: 0
  };

increaseAmount = () => {
  this.setState({
    amountCounter: this.state.amountCounter + 1
  });
}

decreaseAmount = () => {
  this.setState(prevState => ({
    amountCounter: Math.max(prevState.amountCounter - 1, 0)
  }));
};


  render() {
    const {state} = this.props.navigation
    const {  amountCounter } = this.state;
    return (
      <ScrollView style={styles.container}>
          <Fragment>
           <Header
           headerName={state.params.data}
           />

            <View style={{ margin: 30 }}>
              <Text style={styles.buyTxt}>Nice Move!!!</Text>

              <Text style={styles.chooseAmount}>
                Choose the total amount of units you want to buy.
              </Text>
            </View>

            <View style={{ margin: 30 }}>
              <Text
              style={styles.chooseAmount}
              > Select Amount Units</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity 
                onPress={this.decreaseAmount}
                style={styles.counterContainer}>
                  <Text style={styles.counterTxt}> - </Text>
                </TouchableOpacity>

                <Text style={styles.buyTxt}> {amountCounter} </Text>
                <TouchableOpacity 
                onPress={this.increaseAmount}
                style={styles.counterContainer}>
                  <Text style={[styles.counterTxt, {fontSize: 30}]}> + </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{alignItems: 'center', marginVertical: 40}}>
            <Text
              style={styles.chooseAmount}
              > Your total in naira is NGN {amountCounter}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 18
              }}
            >
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Stock')}
              style={styles.buyBtn}>
                <AntDesign
                  name="arrowdown"
                  size={20}
                  color={colors.whitesmoke}
                />
                <Text style={{ marginLeft: 12, color: colors.whitesmoke }}>
                  Buy
                </Text>
              </TouchableOpacity>

            </View>
          </Fragment>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center"
  },
  buyTxt: {
    fontSize: 25,
    fontFamily: "quicksand",
    fontWeight: "bold",
    color: colors.baseBorder
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: "quicksand",
    fontWeight: "bold",
    color: colors.grey2
  },
  buyBtn: {
    backgroundColor: colors.baseBorder,
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  
  },
  chooseAmount: {
    color: colors.grey2,
    fontWeight: "bold"
  },
  counterContainer: {
    backgroundColor: colors.baseColor3,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  counterTxt: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.grey2
  }
});
