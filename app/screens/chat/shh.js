<ThemeConsumer>
        {value => (
          <SingleChatHeader
            fname={state.params.fname}
            lname={state.params.fname}
            // avatar={state.params.logo}
             >
              <FlatList
                data={this.state.messages}
                renderItem={({item}) => {
                  if (item.sender.id !== this.state.userId) {
                    return (
                      <ThemeConsumer>
                        {value => (
                          <View style={{width: WIDTH / 2, marginLeft: 12}}>
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
                                  {item.sender.first_name}{' '}
                                  {item.sender.last_name}
                                </Text>
                              </View>
                              <Text
                                style={{color: value.mode.text, marginTop: 10}}>
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
                                {moment(item.timestamp).format('LT')}
                              </Text>
                            </View>
                          </View>
                        )}
                      </ThemeConsumer>
                    );
                  } else {
                    return (
                      <ThemeConsumer>
                        {value => (
                          <View
                            style={{width: WIDTH / 2, marginLeft: WIDTH / 2}}>
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
                                  }}>
                                  {item.sender.first_name}{' '}
                                  {item.sender.last_name}
                                </Text>
                              </View>
                              <Text
                                style={{color: 'whitesmoke', marginTop: 10}}>
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
                                {moment(item.timestamp).format('LT')}
                              </Text>
                            </View>
                          </View>
                        )}
                      </ThemeConsumer>
                    );
                  }
                }}
                keyExtractor={item => item.id}
              />
           
            <View style={{height: 70}} />
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
                  onChangeText={text => this.setState({text})}
                  style={[styles.inputField, {color: value.mode.text}]}
                />
                <TouchableOpacity style={{marginRight: 6}}>
                  <Entypo
                    name="attachment"
                    color={colors.baseBorder}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10, paddingRight: 8}}
                  onPress={() => this.onSend()}>
                  <Ionicons
                    name="ios-send"
                    color={colors.baseBorder}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SingleChatHeader>
        )}
      </ThemeConsumer>