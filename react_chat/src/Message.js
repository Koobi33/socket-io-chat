import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import img1 from './elliot.jpg'

const Message = (props) => (
    <Card className={'message'} >
        <Card.Content>
            <Image src={img1} size={'mini'} floated={'right'}/>
            <Card.Header>{props.mes.sender}</Card.Header>
            <Card.Meta>{props.mes.time}</Card.Meta>
        </Card.Content>
        <Card.Content>
            <Card.Description>{props.mes.message}</Card.Description>
        </Card.Content>

    </Card>
);

export default Message;