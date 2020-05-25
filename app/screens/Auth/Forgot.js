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
  ScrollView,
  Dimensions
} from "react-native";
import axios from 'axios';
import {config} from '../../../config';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Background from '../../components/helpers/Background';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class Forgot extends Component {
  state = {
    email: "",
    password: "",
    visible: false,
    msg: "",
    type: "",
    account: "driver"
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
          <ScrollView
            contentContainerStyle={{ justifyContent: "space-between" }}
            style={classes.container}
          >
            <KeyboardAvoidingView style={classes.root}>
              <Image
                style={classes.logo}
                source={require('../../assets/images/fin-logo.png')}
              />

              <View style={classes.welcomTxt}>
                <Text style={classes.finText}>{``} Ahh snap...</Text>
                <Text style={classes.text}> You forgot your password </Text>
              </View>

              <View style={classes.inputContainer}>
                <Feather name="user" color={colors.grey2} size={20} />
                <TextInput
                  keyboardType={"email-address"}
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="Email Address"
                  // value={this.state.email}
                  // onChangeText={email => this.setState ({email})}
                />
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={() => navigation.navigate("Verify")}
              style={classes.loginBtn}
            >
              <Text style={classes.loginTxt}>Recover Password</Text>
            </TouchableOpacity>

            <Snackbar
              visible={visible}
              handleClose={this.handleClose}
              msg={msg}
              type={type}
            />
          </ScrollView>
          <View style={classes.signupWrapper}>
            <Text style={classes.signupTxt}>Remember your details?</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={classes.signupColor}> Sign in to continue...</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </Network>
    );
  }
}

const classes = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "column"
  },
  root: {
    marginHorizontal: 30,
    flex: 0.8,
    alignItems: "center",
    padding: 12
  },
  logo: {
    height: 100,
    width: 80,
    marginTop: HEIGHT / 10
  },

  welcomTxt: {
    flexDirection: "row",
    marginTop: 30
  },

  text: {
    fontSize: 18,
    textAlign: "center"
  },
  finText: {
    color: colors.baseColor,
    fontSize: 18
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.baseBorder,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: WIDTH - 40,
    marginTop: 60
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
  skip: {
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center"
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
  }
});

export default Forgot;
