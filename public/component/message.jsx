import React, {Component} from "react";
import {hashHistory} from 'react-router'
import request from 'superagent';

require("../css/message.css");

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            messages: []
        };
    }

    componentDidMount() {
        request.get('/api/message')
            .end((err, res) => {
                this.setState({
                    messages: res.body.reverse()
                });

            });
    }

    componentDidUpdate() {
        request.get('/api/message')
            .end((err, res) => {
                this.setState({
                    messages: res.body.reverse()
                });

            });
    }

    render() {
        var number = 0;
        return <div className="container-fluid">
            <div className="page-header">
                <h4>留言板</h4>
            </div>
            <div>
                <form onSubmit={this._submitMessage.bind(this)}>

                    <div>
                        <div className="pull-left">
                            <label className="name" maxLength="10">昵称:</label>&nbsp;&nbsp;
                        </div>
                        <div className="pull-left nameInput">
                            <input type="text" className="form-control" required="required" placeholder="请输入昵称"
                                   value={this.state.name}
                                   onChange={this._onNameChange.bind(this)}/>
                        </div>
                    </div>
                    <textarea className="form-control" rows="3" maxLength="100" wrap="hard" placeholder="请输入内容"
                              required="required"
                              value={this.state.message}
                              onChange={this._onMessageChange.bind(this)}/>

                    <button type="submit" className="btn btn-primary pull-right">提交</button>
                </form>

            </div>
            <div>
                {
                    this.state.messages.map(message =><div>

                        <hr/>
                        <div className="panel panel-primary">
                            <div className="heading panel-heading  message-heading">
                                {--this.state.messages.length}楼
                                <span className="heading-name">From:{message.name}</span>
                            </div>
                            <div className="panel-body">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                            <div className="panel-footer">

                                <div className="pull-right">
                                    <span className="glyphicon glyphicon-thumbs-up" onClick={this._Vote.bind(this)}/>
                                </div>
                            </div>
                        </div>

                    </div>)

                }

            </div>
        </div>;
    }

    _Vote(event) {

    }

    _onNameChange(event) {
        this.setState({
            name: event.target.value
        });
        if (event.target.value.length === 10) {
            alert("超出字数限制,只能输入10个字");
        }
    }

    _onMessageChange(event) {
        this.setState({
            message: event.target.value
        });
        if (event.target.value.length === 100) {
            alert("超出10字数限制,只能输入100个字");
        }
    }


    _submitMessage() {
        event.preventDefault();
        request.post('/api/message')
            .send({
                name: this.state.name,
                message: this.state.message
            })
            .end((err, res) => {
                alert(res.text)
            });

    }
}
