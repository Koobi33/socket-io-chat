import React, { Component } from 'react'
import { Input, Menu} from 'semantic-ui-react'

export default class DialogMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reciever: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {reciever} = this.state;
        const {onSendPrivateMessage} = this.props;

        onSendPrivateMessage(reciever);
        this.setState({reciever: ''});
    };

    render() {
        const { chats, activeChat, user, setActiveChat, logout} = this.props;
        return (
            <Menu className={'vertical left fixed'} style={{width: '18%'}}>
                <Menu.Menu>
                    <form
                        onSubmit={this.handleSubmit}>
                        <Input
                            icon='search'
                            placeholder='Search user...'
                            onChange={(e)=> {this.setState({reciever:e.target.value})}}
                            fluid
                        />
                    </form>
                </Menu.Menu>
                    <div ref={'users'}
                         onClick={(e) => {(e.target === this.refs.user) && setActiveChat(null) }}
                    >
                        {
                            chats.map((chat) => {
                                if (chat.name) {
                                    const lastMessage = chat.messages[chat.messages.length - 1];
                                    const chatSideName = chat.users.find((name) => {
                                        return name !== user.name
                                    }) || 'Community';
                                    const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';
                                    return (
                                        <Menu.Item
                                            name={chat.name}
                                            key={chat.id}
                                            className={`user ${classNames}`}
                                            onClick={() => {
                                                setActiveChat(chat);
                                            }}>
                                            <div>
                                                <div>{chatSideName}</div>
                                                {
                                                    lastMessage ? lastMessage.message.length < 30 ? <div>{lastMessage.message}</div> : <div>{lastMessage.message.substr(0,20) + '...'}</div> : null
                                                }
                                            </div>

                                        </Menu.Item>
                                    )
                                }
                                return null
                            })
                        }
                    </div>
                    <div>
                        <span>{user.name}</span>
                        <div onClick={() => {logout()}}>logout</div>
                    </div>
            </Menu>
        )
    }
}