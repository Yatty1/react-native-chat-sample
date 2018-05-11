import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
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
    this.socket = SocketIOClient('http://localhost:3000');
    this.socket.on('connect', () => console.log('connected'));
    this.socket.on('disconnect', () => console.log('disconnected'));
  }

  _join = (callback) => {
    this.socket.emit('join', {room: this.state.room, name: this.state.name}, (error) => {
      if(error) {
        Alert.alert(error);
        return;
      }
      callback(true);
    });
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
              onPress={() => this._join(isValid => this.setState({ isValid }))}
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
        socket={this.socket}
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
    backgroundColor: '#0f97e0'
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
    backgroundColor: '#c1c1c1'
  },
  btnText: {
    fontSize: 20,
    color: '#5b5b5b',
  }
})
