import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Subheading, Surface} from 'react-native-paper';

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.subscribe = null;
    this.clear = null;

    this.state = {
      isConnected: true,
    };
  }

  componentDidMount() {
    this.handleSubscribe();
  }

  handleSubscribe = () => {
    // Subscribe
    this.subscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      this.setState({
        isConnected: state.isConnected,
      });
    });
  };

  componentWillUnmount() {
    this.subscribe();
  }

  render() {
    const {isConnected} = this.state;
    return (
      <View style={{flex: 1}}>
        {this.props.children}
        {!isConnected && (
          <Surface style={classes.alert}>
            <Subheading style={classes.text}>
              Connection Lost. Please ensure you're connected...
            </Subheading>
          </Surface>
        )}
      </View>
    );
  }
}

const classes = StyleSheet.create({
  alert: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'red',
    textAlign: 'center',
    elevation: 6,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
