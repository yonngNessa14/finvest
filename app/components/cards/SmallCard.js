//import liraries
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width

// create a component
const SmallCard = (props) => {
    return (
            <View style={[styles.container, {backgroundColor: props.bgColor,}]}>
            {props.children}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        height: 89,
        width: WIDTH / 3.3,
        margin: 3,
        borderRadius: 6,
        marginTop: 15,
        padding: 12
    },
    
});

//make this component available to the app
export default SmallCard;
