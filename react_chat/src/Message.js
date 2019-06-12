import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import img1 from './elliot.jpg'

const Message = (props) => (
    <Card style={{minHeight: '80px'}}>
        <Card.Content>
            <Feed>
                <Feed.Event>

                    <Feed.Content>
                        <Feed.Date content={this.props.mes.time} />
                        <h2>{props.mes.sender}</h2>
                            <p>
                               {props.mes.message}
                            </p>
                    </Feed.Content>
                    <Feed.Label image={img1} />
                </Feed.Event>
            </Feed>
        </Card.Content>
    </Card>
)

export default Message;