import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import ChatRoom from './ChatRoom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: "",
      room: "",
      isValid: false,
    }
  }

  _checkValidation = () => {
    return this.state.name.length > 0 && this.state.room.length > 0;
  }
  render() {
    if (!this.state.isValid) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.inputText}
              placeholder="username"
              value={this.state.name}
              onChangeText={(name) => {
                this.setState({ name });
              }}
            />
            <TextInput
              style={styles.inputText}
              placeholder="room"
              value={this.state.room}
              onChangeText={(room) => {
                this.setState({ room });
              }}
              />
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                this.setState({ isValid: this._checkValidation()});
              }}
            >
              <Text style={styles.btnText}> Join </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <ChatRoom
        name={this.state.name}
        room={this.state.room}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '70%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#61c3f4'
  },
  inputText: {
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 15,
    width: '80%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  submitBtn: {
    marginTop: 25,
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#eb8b45'
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  }
})
