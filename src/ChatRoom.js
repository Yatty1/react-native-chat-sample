import React from 'react';
import {
  View,
  Text,
  FlatList,
  Animation,
  LayoutAnimation,
  Easing,
} from 'react-native';
import SocketIOClient from 'socket.io-client';


export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
    const socket = SocketIOClient('http://localhost:3000');
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('join', {room: props.room, name: props.name}, (error) => {
        console.log(error);
      })
    })
    socket.on('newMessage', (message) => {
      console.log(message.text);
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
    })
    socket.on('disconnect', () => {
      console.log('disconnected');
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        {
         this.state.messages.map(message => {
           return <Text key={message.createdAt}> {message.text} </Text>;
         })
        }
      </View>
    );
  }
}
