import React, {Component} from 'react';
import { VERIFY_USER } from './Events'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            error: ''
        }

    }
    setError = (error) => {
        this.setState(
            {
                error: error
            }
        )
    };

    setUser = ({user, isUser}) => {
        console.log(user, isUser);
        if(isUser){
            this.setError('username taken');
        } else {
            this.props.setUser(user);
        }
    };

    handleChange = (e) => {
        this.setState({nickname: e.target.value})
    };

    handleSubmit = (e) => {
      e.preventDefault();
        const { socket } = this.props;
        const { nickname } = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser)
    };

    render() {
        const {error} = this.state;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor={'nickname'}>
                    <h2>Nickname</h2>
                </label>
                    <input
                    ref = {(input) => { this.textInput = input}}
                    type={'text'}
                    id={'nickname'}
                    onChange={this.handleChange}
                    placeholder={'username'}
                    />
                    <button>submit</button>
                </form>
                <div>{error ? error:null}</div>
            </div>
        )
    }
}