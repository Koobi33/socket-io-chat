import React, {Component} from 'react';
import Message from "./Message";
import InputMessage from "./InputMessage";
import { Segment } from 'semantic-ui-react'
import DialogMenu from "./DialogMenu";
import {MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECIEVED, PRIVATE_MESSAGE} from './Events'
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
        const {socket} = this.props;
        this.initSocket(socket);
    }

    initSocket(socket){
        socket.emit(COMMUNITY_CHAT, this.resetChat);
        socket.on(PRIVATE_MESSAGE, this.addChat);
        socket.on('connect', () => {
            socket.emit(COMMUNITY_CHAT, this.resetChat)
        });
    }

    sendOpenPrivateMessage = (reciever) => {
        const {socket, user} = this.props;
        socket.emit(PRIVATE_MESSAGE, {reciever, sender: user.name})
    };

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
    updateTypingInChat = (chatId) => {
        return ({isTyping, user}) => {
            if(user !== this.props.user.name){
                const {chats} = this.state;
                let newChats = chats.map((chat) => {
                    if(chat.id === chatId){
                        if(isTyping && !chat.typingUsers.includes(user)){
                            chat.typingUsers.push(user);
                        } else if(!isTyping && chat.typingUsers.includes(user)){
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user);
                        }
                    }
                    return chat;
                });
                this.setState({chats: newChats})
            }
        }
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

    addChat = (chat, reset = false) => {
        const {socket} = this.props;
        const {chats} = this.state;

        const newChats = reset ? [chat] : [...chats, chat];
        this.setState({chats: newChats, activeChat: reset ? chat: this.state.activeChat});

        const messageEvent =`${MESSAGE_RECIEVED}-${chat.id}`;
        const typingEvent =`${TYPING}-${chat.id}`;
        socket.on(typingEvent, this.updateTypingInChat(chat.id));
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
                    onSendPrivateMessage={this.sendOpenPrivateMessage}
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
                                                <InputMessage
                                                    sendMessage = {
                                                        (message) => {
                                                    this.sendMessage(activeChat.id, message)
                                                }}
                                                sendTyping = {
                                                    (isTyping)=> {
                                                        this.sendTyping(activeChat.id, isTyping)
                                                    }}
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