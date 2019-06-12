import React, {Component} from 'react';
import Message from "./Message";
import InputMessage from "./InputMessage";
import { Segment } from 'semantic-ui-react'
import DialogMenu from "./DialogMenu";
import {MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECIEVED} from './Events'
import Messages from "./Messages";

class DialogWindow extends  Component {
    constructor(props) {
    super(props);
        this.state = {
            chats: [],
            activeChat: null,
            numberOfUsers: 0
        };
    }
    componentDidMount() {
        const{socket} = this.props;
        socket.emit(COMMUNITY_CHAT, this.resetChat)
    }

    setActiveChat = (activeChat) => {
      this.setState({activeChat})
    };

    addMessageToChat = (chatId)=> {
        return message => {
            const {chats} = this.state;
            let newChats = chats.map( chat => {
                if(chat.id === chatId) {
                    chat.messages.push(message);
                }
                return chat
            });
            this.setState({chats: newChats})
        }
    };
    updateTypintInChat = (chatId) => {

    };
    sendMessage = (chatId, message) => {
        const {socket} =this.props;
        socket.emit(MESSAGE_SENT, {chatId, message})
    };

    sendTyping = (chatId, isTyping) => {
        const {socket} =this.props;
        socket.emit(TYPING, {chatId, isTyping})
    };

    resetChat = (chat) => {
        return this.addChat(chat, true)
    };

    addChat = (chat, reset) => {
        console.log(chat);
        const {socket} = this.props;
        const {chats} = this.state;

        const newChats = reset ? [chat] : [...chats, chat];
        this.setState({chats: newChats});

        const messageEvent =`${MESSAGE_RECIEVED}-${chat.id}`;
        const typingEvent =`${TYPING}-${chat.id}`;
        socket.on(typingEvent);
        socket.on(messageEvent, this.addMessageToChat(chat.id));
    };



    render() {
        const {user,logout} = this.props;
        const {chats, activeChat, numberOfUsers} = this.state;
        return (
            <div>
                <DialogMenu
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                />
                <div style={{position: 'absolute', left: '11%', height: '100%', width: '100%'}}>
                    <div style={{paddingTop: '8vh'}}>
                        <div color={'teal'}>


                                {
                                    activeChat !== null ? (
                                        <div>
                                            <div style={{
                                                height: '100%',
                                                display: 'flex',
                                                paddingBottom: '3%',
                                                paddingTop: '1%',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                                flexGrow: '1',
                                                overflowY: 'auto',
                                                minHeight: '0px',
                                                paddingLeft: '10px'
                                            }}>
                                            <Segment style={{
                                                marginTop: '0px',
                                                width: '100%',
                                                top: '0',
                                                position: 'fixed',
                                                paddingBottom: '1%'
                                            }}>
                                                {activeChat.name}
                                                <span>{numberOfUsers ? numberOfUsers : null}</span>
                                            </Segment>
                                            <Messages
                                                messages={activeChat.messages}
                                                user={user}
                                                typingUsers={activeChat.typingUsers}
                                            />
                                            </div>

                                            <div style={{width: '89%', marginTop: '15px', position: 'fixed', bottom: '0'}}>
                                                <InputMessage sendMessage={(message) => {
                                                    this.sendMessage(activeChat.id, message)
                                                }}
                                                sendTyping={(isTyping)=> {this.sendTyping(activeChat.id, isTyping)}}
                                                />
                                            </div>
                                        </div>
                                    ) :
                                        <div>
                                            <h2>Choose chat</h2>
                                        </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DialogWindow;