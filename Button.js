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
import {colors} from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../../config';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import moment from 'moment';
import {RH, RW} from './resize';
import ImagePicker from 'react-native-image-picker';
import io from "socket.io-client";


const WIDTH = Dimensions.get('window').width;

export default class ChatPage extends React.Component {
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
      lastName: ''
    };
  }


  update = async () => {
    const {navigation} = this.props;
    this.setState({forumId: navigation.getParam('id', '')});
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
        console.warn('There was an error retrieving the data' + error);
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
        console.warn('There was an error retrieving the data' + error);
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
      console.warn('There was an error retrieving the data' + error);
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
      //alert(this.state.userId);
    })
    .catch((error) => {
      console.warn('There was an error retrieving the data' + error);
    });



  };

  async componentDidMount() {
    await this.update();
    await this._retrieveData();
    await this.getForumMessages();
    setInterval(() => {
      this.checkNewMessage();
    }, 5000);
    //setInterval(this.checkNewMessage(), 5000);
    await this.enterForum();
    await this.getUserOnline();
    // console.log('tryd1', this.state.forumId);
    const {navigation} = this.props;
    this.focusListener = navigation.addListener(
      'didFocus',
      () => this._retrieveData(),
      this.getForumMessages(),
      this.enterForum(),
      this.getUserOnline(),
      this.getUserOnline(),
    );

    this.socket = io("wss://dozie.com.ng/ws/chat/test/");
    this.socket.on("chat message", msg => {
          this.setState({ chatMessages: [...this.state.chatMessages, msg]   
     });
  });


  }

  getUserOnline = async () => {
    const {navigation} = this.props;
    const forumId = navigation.getParam('id', '');
    await axios({
      method: 'get',
      url: `https://dozie.com.ng/api/v1/forums/${this.state.forumId}/check_user_online/`,
      headers: {
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then((data) => {
        this.setState({
          loading: false,
          userOnline: data.data.number_of_online_members,
          data: data,
        });
        // console.log('check user online', this.state.data);
        // console.log('check user online', this.state.userOnline);
        // console.log('check user online', forumId);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        // this.getUserOnline();
        // console.log('check user online is', err.response);
        // console.log('check user online', forumId);
        // console.log('check user online', this.state.token);
      });
  };
  all = async (data) => {
    await this.setState({chatMessages: data});
  };


  getForumMessages = async () => {
    const {navigation} = this.props;
    const forumId = navigation.getParam('id', '');

    axios({
      method: 'get',
      url: `https://dozie.com.ng/api/v1/forums/${this.state.forumId}/get_forum_chats/`,
      headers: {
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then((data) => {
        this.all(data.data);
        //this.setState({chatMessages: data.data});
        // console.log('tryd2', this.state.forumId);
        // this.setState({
        //   loading: false,
        //   chatMessages: data.data,
        // });
        // console.log('chatmessages', data.data);

        // console.log('chatmessagesreal', this.state.chatMessages);
        // console.log('forum Id', forumId);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        // console.log('tryd3', this.state.forumId);
        // console.log(err);
        // console.log('forum Id', forumId);
        // console.log('forum Id', this.state.token);
      });
  };

  // getForumMessagesSecond = async () => {
  //   const {navigation} = this.props;
  //   const forumId = navigation.getParam('id', '');

  //   axios({
  //     method: 'get',
  //     url: `https://dozie.com.ng/api/v1/forums/${
  //       this.state.forumId
  //     }/get_forum_chats/`,
  //     headers: {
  //       Authorization: `JWT ${this.state.token}`,
  //     },
  //   })
  //     .then(data => {
  //       // this.all(data.data);
  //       this.setState({test: data.data});
  //       //console.log('tryd2', this.state.forumId);
  //       // this.setState({
  //       //   loading: false,
  //       //   chatMessages: data.data,
  //       // });
  //       console.log('chatmessages', data.data);

  //       // console.log('test', this.state.test);
  //       // console.log('forum Id', forumId);
  //     })
  //     .catch(err => {
  //       this.setState({
  //         loading: false,
  //       });
  //       console.log('tryd3', this.state.forumId);
  //       console.log(err);
  //       console.log('forum Id', forumId);
  //       console.log('forum Id', this.state.token);
  //     });
  // };

  enterForum = async () => {
    const {navigation} = this.props;
    const forumId =
      navigation.getParam('id', '') || navigation.getParam('ids', '');

    await axios({
      method: 'get',
      url: `https://dozie.com.ng/api/v1/forums/${forumId}/enter_forum/`,
      headers: {
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then((data) => {
        this.setState({
          loading: false,
          forumDetails: data.data,
        });
        // console.log('enter forum', this.state.forumDetails);
        // console.log('forum Id', forumId);
        // this.loadMessages();
        // this.enterForum();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        this.enterForum();
        // console.log(`enter forum error is ${err}`);
        // console.log('forum Id', forumId);
        // console.log('forum Id', this.state.token);
      });
  };

  done = async (app) => {
    // this.setState({chatMessages: [...app]});
    // console.log('append');
    this.setState({chatMessages: [app, ...this.state.chatMessages]});
    //this.state.chatMessages.unshift(app);
  };

  postMessages = async () => {
    this.setState({
      text: '',
    });
    const {navigation} = this.props;
    const forumId = navigation.getParam('id', '');
    const {text} = this.state;
    await axios({
      method: 'post',
      url: `https://dozie.com.ng/api/v1/forums/${this.state.forumId}/post_message/`,
      headers: {
        Authorization: `JWT ${this.state.token}`,
      },
      data: {
        message_type: 'text',
        message: text,
      },
    })
      .then(({data}) => {
        this.setState({
          loading: false,
        });
        this.getForumMessages();
        //this.checkNewMessage();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        // console.log(`post message error is ${err}`);
        // console.log('post message forum Id', forumId);
        // console.log('post message forum Id', this.state.token);
      });
  };

  postMessages2 = async (tt, id) => {
    const {firstName, lastName} = this.state
    if (this.state.text != '') {
      const gg = `message:${tt}`;
      const app = {
        id: Math.random(),
        caption: null,
        file_link: null,
        forum: 1,

        is_sender: true,
        message: tt,
        message_type: 'text',
        sender: {
          avatar: null,
          first_name: firstName,
          id: id,
          last_name: lastName,
        },
      };
      //this.setState({app.message:tt})
      // console.log('............', tt);
      // console.log('*', app);
// 
      // console.log('final', this.state.chatMessages);
      this.setState({
        text: '',
      });
      const {navigation} = this.props;
      const forumId = navigation.getParam('id', '');
      const {text} = this.state;
      await axios({
        method: 'post',
        url: `https://dozie.com.ng/api/v1/forums/${this.state.forumId}/post_message/`,
        headers: {
          Authorization: `JWT ${this.state.token}`,
        },
        data: {
          message_type: 'text',
          message: text,
        },
      })
        .then(({data}) => {
          this.setState({
            loading: false,
          });

          // this.getForumMessages();
          this.done(app);
          //this.checkNewMessage();
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          // console.log(`post message error is ${err}`);
          // console.log('post message forum Id', forumId);
          // console.log('post message forum Id', this.state.token);
        });
    }
  };

  // componentWillUnmount() {
  //  // clearInterval(this.state.checkMessage);
  // }

  // componentDidUpdate() {
  //   if (this.state.newMessages !== this.state.chatMessages) {
  //     this.getForumMessages();
  //   }
  // }

  checkNewMessage = async () => {
    await axios({
      method: 'get',
      url: config.checkNewMessage,
      headers: {
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        //this.getForumMessages();
        if (data.detail === true) {
          this.getForumMessages();
        } else {
          // console.log('...>>>>>');
        }
        // console.log('check new message', data);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        this.getForumMessages();
        // console.log(`check new message error is ${err}`);

        // console.log('new mssg forum Id', this.state.token);
      });
  };

  uploadPicture = () => {
    const options = {
      title: 'Select Photo',
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({
          image: response,
        });
        // You can also display the image using data:

        // this.setState({
        //   profilePic: source.uri,
        // });
        // console.log('profile pic', this.state.image);
        this.postPicture();
      }
    });
  };

  postPicture = async () => {
    const {image} = this.state;
    let formData = new FormData();
    formData.append('message_type', 'image');
    formData.append('file_link', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
      path: image.path,
    });

    await axios
      .post(
        `https://dozie.com.ng/api/v1/forums/${this.state.forumId}/post_message/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${this.state.token}`,
          },
        },
      )
      .then((res) => {
        this.setState({
          photo: res.data.avatar,
        });
        // console.log(res.data);
        this.getForumMessages();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  render() {
    const {state} = this.props.navigation;
    var forumId = state.params.id;
    const {chatMessages} = this.state;
    return (
      <ThemeConsumer>
        {(value) => (
          <ChatHeader
            title={state.params.name}
            logo={state.params.logo}
            description={state.params.description}
            onlineUsers={this.state.userOnline}
            forumId={forumId}
            forumDetails={this.state.forumDetails}
            token={this.state.token}
            >
            <View style={{flex: 1}}>
              <View style={{height: RH(89)}}>
                <KeyboardAvoidingView
                  style={{flex: 1}}
                  keyboardVerticalOffset={0}
                  behavior={'padding'}>
                  <FlatList
                    data={this.state.chatMessages}
                    renderItem={({item}) => {
                      if (item.sender == null) {
                        return (
                          <ThemeConsumer>
                            {(value) => (
                              <View
                                style={{
                                  marginLeft: 12,
                                  flexDirection: 'row',
                                }}>
                                <Image
                                  style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                  }}
                                  source={require('../../assets/images/header.png')}
                                />
                                {item.message_type == 'image' ? (
                                  <View
                                    style={{
                                      padding: 8,
                                      borderWidth: 2,
                                      borderRadius: 6,
                                      borderColor: value.mode.card,
                                      paddingLeft: 8,
                                      marginBottom: 12,
                                    }}>
                                    <Image
                                      style={{
                                        height: 180,
                                        width: 180,
                                        marginBottom: 14,
                                      }}
                                      source={{uri: item.file_link}}
                                    />
                                    <Text
                                      style={{
                                        position: 'absolute',
                                        right: 6,
                                        bottom: 2,
                                        fontSize: 11,
                                        color: colors.grey2,
                                        marginTop: 6,
                                      }}>
                                      {moment(item.timestamp)
                                        .utc()
                                        .format('LT')}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      backgroundColor: value.mode.card,
                                      marginTop: 10,
                                      padding: 10,
                                      borderTopRightRadius: 12,
                                      borderBottomRightRadius: 12,
                                      borderBottomLeftRadius: 16,
                                      marginBottom: 15,
                                    }}>
                                    <View style={{marginTop: -10}}>
                                      <Text
                                        style={{
                                          color: colors.grey2,
                                          fontWeight: 'bold',
                                        }}>
                                        No Name
                                      </Text>
                                    </View>
                                    <Text
                                      style={{
                                        color: value.mode.text,
                                        marginTop: 10,
                                        marginBottom: 14,
                                      }}>
                                      {item.message}
                                    </Text>

                                    <Text
                                      style={{
                                        position: 'absolute',
                                        right: 6,
                                        bottom: 2,
                                        fontSize: 11,
                                        color: colors.grey2,
                                      }}>
                                      {moment(item.timestamp)
                                        .utc()
                                        .format('LT')}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            )}
                          </ThemeConsumer>
                        );
                      } else if (item.is_sender !== true) {
                        return (
                          <ThemeConsumer>
                            {(value) => (
                              <View
                                style={{
                                  width: WIDTH / 2,
                                  marginLeft: WIDTH / 2,
                                  paddingRight: 8,
                                  marginLeft: 12,
                                  flexDirection: 'row',
                                }}>
                                {item.sender.avatar == null ? (
                                  <Image
                                    style={{
                                      height: 40,
                                      width: 40,
                                      borderRadius: 20,
                                    }}
                                    source={require('../../assets/images/header.png')}
                                  />
                                ) : (
                                  <Image
                                    style={{
                                      height: 40,
                                      width: 40,
                                      borderRadius: 20,
                                    }}
                                    source={{uri: item.sender.avatar}}
                                  />
                                )}
                                {item.message_type == 'image' ? (
                                  <View
                                    style={{
                                      padding: 8,
                                      borderWidth: 2,
                                      borderRadius: 6,
                                      borderColor: value.mode.card,
                                      paddingLeft: 8,
                                      marginBottom: 12,
                                    }}>
                                    <View style={{marginTop: -10}}>
                                      <Text
                                        style={{
                                          color: colors.grey2,
                                          fontWeight: 'bold',
                                          marginBottom: 12,
                                        }}>
                                        {item.sender.first_name}{' '}
                                        {item.sender.last_name}
                                      </Text>
                                    </View>
                                    <Image
                                      style={{
                                        height: 180,
                                        width: 180,
                                        marginBottom: 14,
                                      }}
                                      source={{uri: item.file_link}}
                                    />
                                    <Text
                                      style={{
                                        position: 'absolute',
                                        right: 6,
                                        bottom: 2,
                                        fontSize: 11,
                                        color: colors.grey2,
                                        marginTop: 6,
                                      }}>
                                      {moment(item.timestamp)
                                        .utc()
                                        .format('LT')}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      width: WIDTH / 2,
                                      paddingRight: 8,
                                      backgroundColor: value.mode.card,
                                      marginTop: 10,
                                      padding: 10,
                                      borderTopRightRadius: 12,
                                      borderBottomRightRadius: 12,
                                      borderBottomLeftRadius: 16,
                                      marginBottom: 15,
                                    }}>
                                    <View style={{marginTop: -10}}>
                                      <Text
                                        style={{
                                          color: colors.grey2,
                                          fontWeight: 'bold',
                                        }}>
                                        {item.sender.first_name}{' '}
                                        {item.sender.last_name}
                                      </Text>
                                    </View>
                                    <Text
                                      style={{
                                        color: value.mode.text,
                                        marginTop: 10,
                                        marginBottom: 14,
                                      }}>
                                      {item.message}
                                    </Text>

                                    <Text
                                      style={{
                                        position: 'absolute',
                                        right: 6,
                                        bottom: 2,
                                        fontSize: 11,
                                        color: colors.grey2,
                                        paddingTop: 16,
                                      }}>
                                      {moment(item.timestamp)
                                        .utc()
                                        .format('LT')}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            )}
                          </ThemeConsumer>
                        );
                      } else if (item.sender.id === this.state.userId) {
                        return (
                          <ThemeConsumer>
                            {(value) => (
                              <View
                                style={{
                                  width: WIDTH / 2,
                                  marginLeft: WIDTH / 2,
                                  paddingRight: 8,
                                }}>
                                {item.message_type == 'image' ? (
                                  <View
                                    style={{
                                      // backgroundColor: colors.baseBorder,
                                      marginTop: 10,
                                      padding: 10,
                                      // borderRadius: 16,
                                      marginBottom: 15,
                                      marginRight: 10,
                                      borderColor: colors.baseBorder,
                                      borderWidth: 1,
                                      alignItems: 'center',
                                      // padding: 5
                                    }}>
                                    <Image
                                      style={{
                                        height: 180,
                                        width: '99.9%',
                                        borderRadius: 6,
                                        marginBottom: 10,
                                      }}
                                      source={{uri: item.file_link}}
                                    />

                                    <Text
                                      style={{
                                        position: 'absolute',
                                        right: 6,
                                        bottom: 2,
                                        fontSize: 11,
                                        color: colors.grey2,
                                        paddingTop: 16,
                                      }}>
                                      {moment(item.timestamp)
                                        .utc()
                                        .format('LT')}
                                    </Text>
                                  </View>
                                ) : (
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
                                    <View style={{marginTop: -10}}>
                                      <Text
                                        style={{
                                          color: colors.grey1,
                                          fontWeight: 'bold',
                                          // marginBottom: 12
                                        }}>
                                        {item.sender.first_name}{' '}
                                        {item.sender.last_name}
                                      </Text>
                                    </View>
                                    <Text
                                      style={{
                                        color: 'whitesmoke',
                                        marginTop: 10,
                                        marginBottom: 14,
                                      }}>
                                      {item.message}
                                    </Text>

                                    <Text
                                      style={{
                                        position: 'absolute',
                                        right: 6,
                                        bottom: 2,
                                        fontSize: 11,
                                        color: colors.grey1,
                                      }}>
                                      {moment(item.timestamp)
                                        .utc()
                                        .format('LT')}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            )}
                          </ThemeConsumer>
                        );
                      } else {
                        console.log('waiting....');
                      }
                    }}
                    keyExtractor={(item) => item.id}
                    inverted={true}
                  />

                  <View style={{height: 140}} />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={{position: 'absolute', bottom: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: value.mode.background,
                  alignItems: 'center',
                  borderTopWidth: 0.6,
                  borderTopColor: 'lightgray',
                }}>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <Image source={require('../../assets/images/emoji.png')} />
                </TouchableOpacity>
                <TextInput
                  placeholder="Type Message"
                  value={this.state.text}
                  onChangeText={(text) => this.setState({text})}
                  style={[styles.inputField, {color: value.mode.text}]}
                />
                <TouchableOpacity
                  onPress={() => this.uploadPicture()}
                  style={{marginRight: 6}}>
                  <Entypo
                    name="attachment"
                    color={colors.baseBorder}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10, paddingRight: 8}}
                  onPress={() =>
                    this.postMessages2(this.state.text, this.state.userId)
                  }>
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