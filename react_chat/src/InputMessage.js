import React, {Component} from 'react'
import { Input } from 'semantic-ui-react'

export default class InputMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            isTyping: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.stopCheckingTyping();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.sendMessage();
        this.setState({message: ''});

    }


    sendMessage = ()=>{
        this.props.sendMessage(this.state.message)
    };

    sendTyping = ()=> {
        this.lastUpdateTime = Date.now();
        if(!this.state.isTyping){
            this.setState({isTyping:true});
            this.props.sendTyping(true);
            this.startCheckingTyping();
        }
    };

    startCheckingTyping = () => {
        this.typingInterval = setInterval(() => {
            if((Date.now() - this.lastUpdateTime) > 300){
                this.setState({isTyping:false});
                this.stopCheckingTyping();
            }
        }, 300)
    };

    stopCheckingTyping = () => {
        if(this.typingInterval){
            clearInterval(this.typingInterval);
            this.props.sendTyping(false);
        }
    };

    render() {
        const { message } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        action={'Отправить'}
                        fluid
                        placeholder='Введите сообщение...'
                        ref={'messageinput'}
                        value={message}
                        autoComplete={'off'}
                        onKeyUp = {e => {e.keyCode !== 13 && this.sendTyping()}}
                        onChange = {
                            ({target}) => {
                                this.setState({message:target.value})
                            }
                        }
                    />
                </form>
            </div>
            )
    }
};