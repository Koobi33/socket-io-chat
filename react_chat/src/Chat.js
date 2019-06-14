import React, {Component} from 'react';
import DialogWindow from './DialogWindow'
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from './Events';
import Login from './Login'

const socketURL = 'http://localhost:3030';
class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(socketURL);
        socket.on('connect', () => {
            console.log('connected');
        });
        this.setState({socket});
    };

    setUser = (user) => {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    };

    logout = () => {
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({user: null})
    };

    render() {
        const {socket, user} = this.state;
        return (
            <div>
                {!user ? <Login socket={socket} setUser={this.setUser}/> :

                    <DialogWindow socket={socket} user={user} logout={this.logout}/>
                }
            </div>
        )
    }
}
export default Chat;