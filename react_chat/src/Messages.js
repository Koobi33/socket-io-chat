import React, {Component} from 'react';
import Message from './Message'

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
                             //   {/*    key={mes.id}*/}
                             //   {/*    >*/}
                            //    {/*    <div>{mes.time}</div>*/}
                            //    {/*    <div>*/}
                            //    {/*        <div>{mes.message}</div>*/}
                           //     {/*        <div>{mes.sender}</div>*/}
                             //   {/*    </div>*/}
                             //   {/*</div>*/}
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