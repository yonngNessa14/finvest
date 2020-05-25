import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Text,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import ChatHeader from '../../components/helpers/ChatHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { config } from '../../../config';
import { ThemeConsumer } from '../../components/theme/ThemeContextProvider';
import moment from 'moment';
import { RH, RW } from './resize';
import ImagePicker from 'react-native-image-picker';
import { ProductConsumer } from '../../../ProductProvider';
import QB from 'quickblox-react-native-sdk';


const WIDTH = Dimensions.get('window').width;

class SingleChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      token: '',
      chatMessages: [],
      text: '',
      userId: '',
      userOnline: '',
      data: '',
      forumDetails: [],
      test: '',
      forumId: '',
      touch: false,
      firstName: '',
      lastName: '',
      message: '',
      diaId: '',
      chats: [],
    };
  }

  //   async componentDidMount() {

  //  }
  chatHistory = () => {
    // alert("from history");
    QB.chat
      .getDialogMessages({
        dialogId: `${this.state.diaId}`,
        sort: {
          ascending: true,
          field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT
        },
        markAsRead: false
      })
      .then((result) => {

        console.log(result.messages);
        this.setState({ chats: result.messages })
        console.log("this is from chat history state single");
        console.log(this.state.chats);
        this.getChats();
        // result.messages - array of messages found
        // result.skip - number of items skipped
        // result.limit - number of items returned per page
      })
      .catch(function (e) {
        console.log("err from history");
        console.log(e);


        // handle error
      });
  }

  sendMessage = () => {
    const message = {
      dialogId: `${this.state.diaId}`,
      body: `${this.state.message}`,
      saveToHistory: true
    };

    QB.chat
      .sendMessage(message)
      .then(() => {
        // alert(this.state.message + " sent successfully");
        this.setState({ message: '' });
        // call chatHistory to update the view
        this.chatHistory();
      })
      .catch(function (e) {
        // alert("not sent");
        console.log("err from chat");
        console.log(e);


      })
  }

  getChats = async () => {
    console.log("this is from get data single");
    let arr = [];
    for (var i = 0; i < this.state.chats.length; i++) {
      let name = await this.props.value.usersById(this.state.chats[i].senderId);
      this.state.chats[i]["userName"] = name;
      arr.push(this.state.chats[i]);
    }

    console.log("from arr single");
    console.log(arr);
    await this.setState({ chatMessages: arr });
    console.log("from state single");
    console.log(this.state.chatMessages);
  }

  update = async () => {
    const { navigation } = this.props;
    this.setState({ forumId: navigation.getParam('id', '') });
  };
  //API functions
  _retrieveData = async () => {
    await AsyncStorage.getItem('token')
      .then((value) => {
        return value;
      })
      .then((valueJson) => {
        this.setState({
          token: valueJson,
        });
        // console.warn('Token Data retrieved successfully', this.state.token);
        //alert(this.state.token);
      })
      .catch((error) => {
        // console.warn('There was an error retrieving the data' + error);
      });

    await AsyncStorage.getItem('id')
      .then((value) => {
        return value;
      })
      .then((valueJson) => {
        this.setState({
          userId: valueJson,
        });
        // console.log('Token Data retrieved successfully', this.state.userId);
        //alert(this.state.userId);
      })
      .catch((error) => {
        // console.warn('There was an error retrieving the data' + error);
      });



    await AsyncStorage.getItem('firstName')
      .then((value) => {
        return value;
      })
      .then((valueJson) => {
        this.setState({
          firstName: valueJson,
        });
        // console.log('Name Data retrieved successfully', this.state.firstName);
        //alert(this.state.userId);
      })
      .catch((error) => {
        // console.warn('There was an error retrieving the data' + error);
      });


    await AsyncStorage.getItem('lastName')
      .then((value) => {
        return value;
      })
      .then((valueJson) => {
        this.setState({
          lastName: valueJson,
        });
        console.log('Name Data retrieved successfully', this.state.lastName);
        // alert(this.state.userId);
      })
      .catch((error) => {
        console.warn('There was an error retrieving the data' + error);
      });



  };

  _retrieveData = async () => {
    await AsyncStorage.getItem('token')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          token: valueJson,
        });
        // console.log('Token Data retrieved successfully', this.state.token);
      })
      .catch(error => {
        console.log('There was an error retrieving the data' + error);
      });


  };



  async componentDidMount() {
    await this.createChat();
    await this._retrieveData();

  }

  createChat = async () => {
    console.log("about to connect chat");
    try {
      let res = await QB.chat.createDialog({
        type: QB.chat.DIALOG_TYPE.CHAT,
        occupantsIds: [this.props.navigation.getParam('userId')]
      });
      if (res) {
        console.log("success from single oo");
        console.log(res);
        await this.setState({ diaId: res.id });
        this.chatHistory();
      }
    }
    catch (e) {
      console.log("err from connect chat");
      console.log(e);

    }


  }


  subToMsgs = async () => {
    console.log("from sub messages");

    QB.chat
      .subscribeMessageEvents({
        dialogId: '5ebe871aa28f9a4f681c0b8c' // something like 'dsfsd934329hjhkda98793j2'
      })
      .then(function () {
        // alert("subed successfully")
      })
      .catch(function (e) {
        alert("there ia an error"); console.log(e);
      });
  }


  render() {
    const { state } = this.props.navigation;
    var forumId = state.params.id;
    const { chatMessages } = this.state;
    return (
      <ThemeConsumer>
        {(value) => (
          <ChatHeader
            title={state.params.login}
            logo={state.params.logo}
            description={state.params.description}
            onlineUsers={this.state.userOnline}
            forumId={forumId}
            forumDetails={this.state.forumDetails}
            token={this.state.token}
            login={state.params.login}
          >
            <ScrollView>
              <KeyboardAvoidingView>

                <View style={{ flex: 1 }}>
                  <ProductConsumer>
                    {(chatVal) => (

                      <View style={{ marginBottom: 40 }}>
                        {this.state.chatMessages ? this.state.chatMessages.map(el => {
                          // console.log("about to log state");
                          // console.log(this.state.chatMessages);


                          // 109138316
                          // let name = await chatVal.usersById(el.senderId);
                          // console.log("about to log name");

                          // console.log(name);
                          // append the userName field to data then call it in the view
                          // el["userName"] = name;


                          if (el.senderId === 109138316) {
                            // alert("yesssss")
                            return <View
                              style={{
                                width: WIDTH / 2,
                                marginLeft: WIDTH / 2,
                                paddingRight: 8,
                              }}>
                              <View
                                style={{
                                  backgroundColor: colors.baseBorder,
                                  marginTop: 10,
                                  padding: 10,
                                  borderTopRightRadius: 12,
                                  borderBottomRightRadius: 12,
                                  borderBottomLeftRadius: 16,
                                  marginBottom: 15,
                                  marginRight: 10,
                                }}>
                                <View style={{ marginTop: -10 }}>
                                  <Text
                                    style={{
                                      color: colors.grey1,
                                      fontWeight: 'bold',
                                      // marginBottom: 12
                                    }}>
                                    {el.userName}
                                    {/* {item.sender.last_name} */}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    color: 'whitesmoke',
                                    marginTop: 10,
                                    marginBottom: 14,
                                  }}>
                                  {el.body}
                                </Text>

                                <Text
                                  style={{
                                    position: 'absolute',
                                    right: 6,
                                    bottom: 2,
                                    fontSize: 11,
                                    color: colors.grey1,
                                  }}>
                                  {moment(el.dateSent)
                                    .utc()
                                    .format('LT')}
                                </Text>
                              </View>
                            </View>
                          } else {
                            return <View
                              style={{
                                width: WIDTH / 2,
                                marginRight: WIDTH / 2,
                                paddingLeft: 8,
                              }}>
                              <View
                                style={{
                                  backgroundColor: colors.grey1,
                                  marginTop: 10,
                                  padding: 10,
                                  borderTopRightRadius: 12,
                                  borderBottomRightRadius: 12,
                                  borderBottomLeftRadius: 16,
                                  marginBottom: 15,
                                  marginRight: 10,
                                }}>
                                <View style={{ marginTop: -10 }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontWeight: 'bold',
                                      // marginBottom: 12
                                    }}>
                                    {el.userName}
                                    {/* {chatVal.name} */}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    color: 'whitesmoke',
                                    marginTop: 10,
                                    marginBottom: 14,
                                  }}>
                                  {el.body}
                                </Text>

                                <Text
                                  style={{
                                    position: 'absolute',
                                    right: 6,
                                    bottom: 2,
                                    fontSize: 11,
                                    color: colors.grey1,
                                  }}>
                                  {moment(el.dateSent)
                                    .utc()
                                    .format('LT')}
                                </Text>
                              </View>
                            </View>
                          }


                        }) : <View><Text>State is empty</Text></View>
                        }
                      </View>

                    )}
                  </ProductConsumer>

                </View>

              </KeyboardAvoidingView>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: value.mode.background,
                  alignItems: 'center',
                  borderTopWidth: 0.6,
                  borderTopColor: 'lightgray',
                }}>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <Image source={require('../../assets/images/emoji.png')} />
                </TouchableOpacity>
                <TextInput
                  placeholder="Type Messssage"
                  value={this.state.text.value}
                  onChangeText={(message) => this.setState({ message })}
                  style={[styles.inputField, { color: value.mode.text }]}
                />
                <TouchableOpacity
                  onPress={() => this.uploadPicture()}
                  style={{ marginRight: 6 }}>
                  <Entypo
                    name="attachment"
                    color={colors.baseBorder}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 10, paddingRight: 8, paddingVertical: 10 }}
                  onPress={this.sendMessage}
                >
                  <Ionicons
                    name="ios-send"
                    color={colors.baseBorder}
                    size={26}
                  />
                </TouchableOpacity>

              </View>
            </View>
          </ChatHeader>
        )}
      </ThemeConsumer>
    );
  }
}

const WithContext = (Component) => {
  return (props) => (
    <ProductConsumer>
      {(value) => <Component {...props} value={value} />}
    </ProductConsumer>
  )
}

export default WithContext(SingleChatPage);

const styles = StyleSheet.create({
  sendContainer: {
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 0,
  },
  inputField: {
    width: WIDTH - 100,
    // flex: 1
  },
  textinput: {
    flex: 1,
    borderWidth: 1,
    width: RW(80),
    height: RH(7),
    borderRadius: 10,
    borderColor: '#ECC90D',
    marginBottom: RH(4),
    marginLeft: RW(2),
    paddingLeft: RW(3),
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});