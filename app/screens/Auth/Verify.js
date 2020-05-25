import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Text,
  Image,
  TextInput,
  ScrollView
} from "react-native";import axios from 'axios';
import {config} from '../../../config';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Background from '../../components/helpers/Background';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Subheading } from "react-native-paper";

class Verify extends Component {
  state = {
    email: "",
    password: "",
    visible: false,
    msg: "",
    type: "",

  };

  handleLogin = async () => {
    try {
      const { password, email } = this.state;

      this.setState({
        loading: true
      });

      Keyboard.dismiss();

      if (password === "") {
        this.setState({
          loading: false,
          visible: true,
          msg: "Password is required",
          type: "w"
        });
        return;
      }

      const login = await axios.post(config.login, {
        email,
        password,
        churchId
      });

      await AsyncStorage.setItem("token", login.headers["x-auth-token"]);
      await AsyncStorage.setItem("refreshToken", login.data.data.refreshToken);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
      this.setState({
        loading: false,
        visible: true,
        msg: error.response.data,
        type: "w"
      });
    }
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: "",
      type: ""
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      email,
      visible,
      type,
      msg,
      password,
      loading,
      account
    } = this.state;

    return (
      <Network>
        <Background>
          <TouchableOpacity
            style={classes.skip}
            onPress={() => navigation.navigate("Login")}
          >
            <Subheading style={classes.SkipText}>Skip</Subheading>
            <Icon name="arrow-right" size={15} />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ justifyContent: "space-between" }}
            style={classes.container}
          >
            <KeyboardAvoidingView style={classes.root}>
              <Image
                //  style={classes.logo}
                source={require('../../assets/images/phone.png')}
              />
              <Text style={classes.providePhone}>
                Please provide a phone number.
              </Text>

              <View style={classes.welcomTxt}>
                <Text style={classes.finText}>
                  {``} This number would be tied to your chatrooms and would be
                  used to validate your account upon login.
                </Text>

                <View style={classes.inputContainer}>
                  <View style={classes.phoneNum}>
                    <Text style={{ fontSize: 15, color: "white" }}>+234</Text>
                  </View>
                  <TextInput
                    keyboardType={"email-address"}
                    placeholderTextColor={colors.grey2}
                    style={classes.inputStyle}
                    autoCorrect={false}
                    placeholder="xxx   -   xxxx   -   xxx"
                    // value={this.state.email}
                    // onChangeText={email => this.setState ({email})}
                  />
                </View>

                <Text style={classes.finText}>
                  Please ensure that this number is reachable and can receive
                  messages
                </Text>
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={() => navigation.navigate("Otp")}
              style={classes.loginBtn}
            >
              <Text style={classes.loginTxt}>Send Code</Text>
            </TouchableOpacity>

            <Snackbar
              visible={visible}
              handleClose={this.handleClose}
              msg={msg}
              type={type}
            />
          </ScrollView>
        </Background>
      </Network>
    );
  }
}

const classes = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.grey4,
    padding: 12
  },
  root: {
    marginHorizontal: 30,
    flex: 0.8,
    alignItems: "center",
    padding: 12
  },
  logo: {
    height: 250,
    width: 250
  },

  welcomTxt: {
    marginTop: 30
  },

  text: {
    fontSize: 18,
    textAlign: "center"
  },
  finText: {
    color: colors.grey2,
    fontSize: 15,
    textAlign: "center"
  },
  providePhone: {
    color: colors.grey1,
    fontSize: 17,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.baseBorder,
    // paddingBottom: 10,
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 6,
    width: 260,
    margin: 10
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    left: 8
  },
  forgotPassword: {
    paddingRight: 20
  },

  forgotText: {
    color: colors.baseBorder,
    fontSize: 12,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    paddingRight: 20,
    marginTop: -25
  },
  loginBtn: {
    backgroundColor: colors.baseBorder,
    borderRadius: 6,
    width: 140,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 16
  },
  loginTxt: {
    color: colors.whitesmoke
  },
  signupWrapper: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },

  signupTxt: {
    color: colors.grey1,
    fontSize: 15
  },
  signupColor: {
    color: colors.baseBorder,
    fontSize: 15,
    textDecorationLine: "underline"
  },

  typeRoot: {
    justifyContent: "flex-start",
    // flexDirection: 'row',
    alignItems: "flex-start"
  },
  type: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  headingText: {
    marginVertical: 40
  },
  TextInput: {
    marginVertical: 5
  },
  button: {
    // width: 100,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginVertical: 20
  },
  innerButton: {
    height: 45,
    fontSize: 20
  },

  SkipText: {
    color: "gray",
    paddingHorizontal: 5
  },
  skip: {
    justifyContent: "flex-end",
    top: 20,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  forgotPassword: {
    justifyContent: "flex-end",
    alignItems: "baseline",
    marginTop: 10
    // marginBottom: 10,
  },
  account: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2
  },
  phoneNum: {
    backgroundColor: "#CA1A8E",
    padding: 12,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  }
});

export default Verify