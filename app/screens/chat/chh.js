<KeyboardAvoidingView
    style={{ flex: 1 }}
    keyboardVerticalOffset={0}
    behavior={'padding'}>
    <FlatList
        data={this.state.chatMessages}
        renderItem={({ item }) => {
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
                                            source={{ uri: item.file_link }}
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
                                            <View style={{ marginTop: -10 }}>
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
                                            source={{ uri: item.sender.avatar }}
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
                                        <View style={{ marginTop: -10 }}>
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
                                            source={{ uri: item.file_link }}
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
                                            <View style={{ marginTop: -10 }}>
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
                                            source={{ uri: item.file_link }}
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
                                            <View style={{ marginTop: -10 }}>
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

    <View style={{ height: 140 }} />
</KeyboardAvoidingView>