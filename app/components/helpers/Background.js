//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";

// create a component
class Background extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <View style={styles.circle4} />
        <View style={styles.circle5} />
        <View style={styles.circle6} />
        {this.props.children}
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey4
  },
  circle1: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 0.3,
    borderColor: colors.drawing,
    position: "absolute",
    left: -60,
    top: -20
  },
  circle2: {
    height: 60,
    width: 60,
    borderRadius: 40,
    borderWidth: 0.3,
    borderColor: colors.drawing,
    position: "absolute",
    left: 200,
    top: 150
  },
  circle3: {
    height: 60,
    width: 60,
    borderRadius: 40,
    borderWidth: 0.3,
    borderColor: colors.drawing,
    position: "absolute",
    left: 20,
    top: 300
  },
  circle4: {
    height: 60,
    width: 60,
    borderRadius: 40,
    borderWidth: 0.3,
    borderColor: colors.drawing,
    position: "absolute",
    right: 80,
    bottom: 100
  },
  circle5: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 0.3,
    borderColor: colors.drawing,
    position: "absolute",
    left: -60,
    bottom: -20
  },
  circle6: {
    height: 300,
    width: 200,
    borderRadius: 250,
    borderWidth: 0.3,
    borderColor: colors.drawing,
    position: "absolute",
    right: -160,
    top: 150
  }
});

//make this component available to the app
export default Background;
