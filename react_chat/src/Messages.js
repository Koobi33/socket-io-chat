import React, {Component} from 'react';
import Message from './Message';
import './Messages.css';

export default class Messages extends Component {
    constructor(props){
        super(props);

        this.scrollDown = this.scrollDown.bind(this);
    }

    scrollDown() {
        const {container} = this.refs;
        container.scrollTop = container.scrollHeight;
    }


    componentDidMount() {
        const {container} = this.refs;
        container.scrollTop = container.scrollHeight;
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown();
    }

    render() {
        const {messages, user, typingUsers} = this.props;
        return(
            <div ref={'container'}>
                {
                    messages.map((mes) => {
                            return (
                                <div
                                    key={mes.id}
                                    className={`message-container ${mes.sender === user.name && 'right'}`}>
                                    <Message mes={mes} user={user} />
                                </div>
                            )
                        }
                    )
                }
                {
                    typingUsers.map((name) => {
                        return (
                            <div key={name}>
                                {`${name} is typing...`}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}