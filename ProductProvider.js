import React, {Component} from 'react';
import QB from 'quickblox-react-native-sdk';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    chats: [],
    userId: '',
    name: '',
  };

  // test = "test";
  componentDidMount() {
    this.configQB();
    // this.signUpQB();
    this.loginQB();
    // this.createGroup();
    // this.updateGroupQB();
    this.groupChat();
    // this.connectChatQB();
    this.chatHistory();
    // this.getAllDialog();
    // this.usersById();
  }
  chatHistory = () => {
    // alert("from history");
    QB.chat
      .getDialogMessages({
        dialogId: '5ebe871aa28f9a4f681c0b8c',
        sort: {
          ascending: true,
          field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT,
        },
        markAsRead: false,
      })
      .then((result) => {
        console.log(result.messages);
        this.setState({chats: result.messages});
        console.log('this is from chat history state');
        console.log(this.state.chats);

        // result.messages - array of messages found
        // result.skip - number of items skipped
        // result.limit - number of items returned per page
      })
      .catch(function (e) {
        console.log('err from history');
        console.log(e);

        // handle error
      });
  };
  configQB = () => {
    const appSettings = {
      appId: '82450',
      authKey: 'BaArChd6pfdQq3t',
      authSecret: 'bZsGnWSKfCKn2Ok',
      accountKey: 'U2orKjxKsyyrq7DGfMzp',
      apiEndpoint: '', // optional
      chatEndpoint: '', // optional
    };

    QB.settings
      .init(appSettings)
      .then(function () {
        // SDK initialized successfully
        console.log('QB sdk initialized successfully');
      })
      .catch(function (e) {
        // Some error occured
        // look at the exception message for more details
        console.log('from QB: ' + e);
      });
  };

  signUpQB = () => {
    console.log('from signup');
    // token: 'e24d108b747fba3d8c70fd58ea698d61e5014212'
    QB.users
      .create({
        email: 'admin@gmail.com',
        fullName: 'Nessa G',
        login: 'admin',
        password: 'admin123456789',
        phone: `07086031218`,
      })
      .then(function (user) {
        console.log('this is the user that was created');

        console.log(user);

        // user created successfully
      })
      .catch(function (e) {
        console.log('this is the error from the user that was created');
        console.log(e);

        // handle as necessary
      });
  };

  loginQB = () => {
    console.log('this is from login to get session data');
    QB.auth
      .login({
        login: 'nessa',
        password: 'nessa123456789',
      })
      .then((info) => {
        // 109138316
        console.log('success login');
        console.log(info);
        this.setState({userId: info.user.id});
        console.log(this.state.userId);

        this.connectChatQB(info.user.id, 'nessa123456789');

        // signed in successfully, handle info as necessary
        // info.user - user information
        // info.session - current session
      })
      .catch(function (e) {
        // handle error
        console.log('err from login sesssion');
        console.log(e);
      });
  };
  usersById = async (id) => {
    // console.log("from users by id");
    // console.log(id);
    // const occupantsIds = '109010865';
    console.log('this is the id: ' + id);

    const occupantsIds = `${id}`;
    // console.log("ID " + occupantsIds);

    const filter = {
      field: QB.users.USERS_FILTER.FIELD.ID,
      type: QB.users.USERS_FILTER.TYPE.NUMBER,
      operator: QB.users.USERS_FILTER.OPERATOR.IN,
      value: occupantsIds,
    };
    // let name
    try {
      let res = await QB.users.getUsers({filter: filter});
      if (res) {
        // console.log('res', res.users[0].login);
        console.log('success cal');
        console.log(res);
        if (res.users[0].login) {
          console.log("he exists");
          console.log(res.users[0].login);
          
          
          return res.users[0].login;
        }

        
      }
    } catch (e) {
      console.log('this is the err from user id');
      console.log(e);
    }

    // .then((result) => {
    //     // console.log("from the user data with bid");
    //     name = result.users[0].login;
    //     this.sendName(name);

    // })
  };

  sendName = (name) => {
    return name;
  };

  usersByName = () => {
    console.log('from filter');

    const filter = {
      field: QB.users.USERS_FILTER.FIELD.FULL_NAME,
      operator: QB.users.USERS_FILTER.OPERATOR.IN,
      type: QB.users.USERS_FILTER.TYPE.STRING,
      value: 'Nessa G',
    };
    // id: 109010865,
    QB.users
      .getUsers({filter: filter})
      .then(function (result) {
        // users found
        console.log('user has been found this is the user');
        console.log(result);
      })
      .catch(function (e) {
        console.log('user awsnt found, this is the error');
        console.log(e);

        // handle error
      });
  };

  connectChatQB = (id, password) => {
    console.log('about to connect chat');
    // check if connected already
    QB.chat
      .isConnected()
      .then(function (connected) {
        // boolean
        // handle as necessary, i.e.
        if (connected === false) {
          QB.chat
            .connect({
              userId: id,
              password: password,
            })
            .then(function () {
              console.log('connected success');

              // alert("connected succesfully");
              // connected successfully
            })
            .catch(function (e) {
              // alert("not connected");
              console.log('not connected');

              console.log(e);

              // some error occurred
            });
        } else {
          console.log('hello guy you are already connected');
        }
      })
      .catch(function (e) {
        // handle error
      });
  };

  createGroup = () => {
    console.log('from create group');

    QB.chat
      .createDialog({
        type: QB.chat.DIALOG_TYPE.GROUP_CHAT,
        name: 'Group Chat',
        occupantsIds: [108567693, 109010717, 109010865],
      })
      .then(function (dialog) {
        // handle as neccessary, i.e.
        // subscribe to chat events, typing events, etc.
        // console.log("group created");
        // console.log(dialog);
      })
      .catch(function (e) {
        // console.log("err from group");
        // console.log(e);
        // handle error
      });
  };

  groupChat = async () => {
    QB.chat
      .joinDialog({dialogId: '5ebe871aa28f9a4f681c0b8c'})
      .then(function () {
        console.log("connected successfully");
      })
      .catch((e) => {
        console.log('this is error');
        console.log(e);
        
        // this.updateGroupQB();
      });
  };

  sendMessage = (textM) => {
    const message = {
      dialogId: '5ebe871aa28f9a4f681c0b8c',
      body: textM,
      saveToHistory: true,
    };

    QB.chat
      .sendMessage(message)
      .then(() => {
        // alert("sent success")
        this.chatHistory();
      })
      .catch(function (e) {
        console.log('err from chat');
        console.log(e);
      });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          sendMessage: this.sendMessage,
          usersById: this.usersById,
          chatHistory: this.chatHistory,
        }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
