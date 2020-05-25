//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card} from 'react-native-elements'

// create a component
const WhiteCard = (props) => {
    return (
        <Card>
            {props.children}
        </Card>
    );
};



export default WhiteCard;
