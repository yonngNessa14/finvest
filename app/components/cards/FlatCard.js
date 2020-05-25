import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';


const WIDTH = Dimensions.get('window').width
// create a component
const FlatCard = props => {
  return (
   <View style={{marginRight: 120}}>
      <View style={[styles.container, {backgroundColor: props.bgColor}]}>
      {props.children}
    </View>
   </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    height: 89,
    width: WIDTH - 20,
    marginVertical: 12,
    borderRadius: 6,
    marginTop: 10,
    padding: 12,
  },
});

//make this component available to the app
export default FlatCard;
