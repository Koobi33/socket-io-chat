import React, {Component} from 'react';
import Message from './Message'

export default class Messages extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {messages, user, typingUsers} = this.props;
        return(
            <div>
                {
                    messages.map((mes) => {
                            return (
                                <div className={`message-container ${mes.sender === user.name && 'right'}`}>
                                    <Message mes={mes} user={user} key={mes.id}/>
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