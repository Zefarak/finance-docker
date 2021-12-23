import React, { Component} from 'react';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import moment from 'moment';


function getSocket() {
    const roomName =  window.location.pathname.substr(1);
    const socketPath = `ws://127.0.0.1:8000/ws/${roomName}`;
    const chatSocket = new WebSocket(socketPath);
    console.log(chatSocket)
    return chatSocket
}


class ChatRoomView extends Component {

    constructor(props){
        super(props);
        this.state = {
            messages: []
        }

        this.chatSocket = getSocket();
    }

    componentDidMount() {
        console.log('load')
        this.chatSocket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          const message = { text: data.message, date: data.utc_time };
          message.date = moment(message.date).local().format('YYYY-MM-DD HH:mm:ss');
          
          this.setState((prevState) => ({ messages: prevState.messages.concat(message) }));
        };
      }

      render() {
        const { messages } = this.state;
        const messageInput = <MessageInput socket={this.chatSocket} />;
        console.log('messages', messages)
        const messageList = (
          <div>
            {messages.map((item) => (
              <div key={item.id}>
                <Message text={item.text} date={item.date} />
              </div>
            ))}
          </div>
        );
    
        return (
          <div>
            {messageList}
            {messageInput}
          </div>
        );
      }
}

export default ChatRoomView