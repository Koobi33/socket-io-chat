import React, { Component } from 'react'
import { Input, Label, Menu, Card } from 'semantic-ui-react'

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
    };


    handleItemClick = (e, { name }) => this.setState({ activeChat: name });

    render() {
        const {reciever} = this.state;
        const { chats, activeChat, user, setActiveChat, logout } = this.props;
        return (
            <Menu className={'vertical left fixed'} style={{width: '11%'}}>
                <Menu.Item>
                    <form
                        onSubmit={this.handleSubmit}>
                        <Input
                            icon='search'
                            placeholder='Search user...'
                            onChange={(e)=> {this.setState({reciever:e.target.value})}}/>
                    </form>
                    </Menu.Item>
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
                                                {chatSideName[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div>{chatSideName}</div>
                                                {lastMessage && <div>{lastMessage.message}</div>}
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
                {/*<Menu.Item name='inbox' active={activeChat === 'inbox'} onClick={this.handleItemClick}>*/}
                {/*    <Card>*/}
                {/*        <Card.Content>*/}
                {/*            <Card.Header>Matthew Harris</Card.Header>*/}
                {/*            <Card.Meta>Co-Worker</Card.Meta>*/}
                {/*            <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>*/}
                {/*        </Card.Content>*/}
                {/*    </Card>*/}
                {/*</Menu.Item>*/}

            </Menu>
        )
    }
}