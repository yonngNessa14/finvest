//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// create a component
const Card = props => {
  return (
 
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
          {/* <View style={[styles.logoTop, {backgroundColor: props.logocolor}]}>
            <Feather name={props.iconName} size={25} color={props.iconColor} />
          </View> */}
          {props.children}
      </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    height: 205,
    width: 290,
    margin: 8,
    borderRadius: 6,
    marginTop: 25,
    padding: 16,
    zIndex: 1
  },
  logoTop: {
    position: 'absolute',
    left: 30,
    top: -25,
    width: 50,
    height: 50,
    zIndex:0,
    // elevation:1000, 
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Card;
