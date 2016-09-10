import React, {Component} from "react";
import {hashHistory} from 'react-router'
import request from 'superagent';
import _ from 'lodash';


require("../css/message.css");

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            messages: [],
            page: 1,
            totalPage: ''
        };
    }

    componentDidMount() {
        request.get('/api/message/totalPage')
            .end((err, res) => {
                this.setState({
                    page: res.body.totalPage,
                    totalPage: res.body.totalPage
                });
                request.get('/api/message')

                    .query({page: this.state.totalPage})
                    .end((err, res) => {
                        this.setState({
                            messages: res.body.messages.reverse(),
                            totalPage: res.body.totalPage
                        });

                        // alert(this.state.totalPage);
                        console.log(res.body);
                    });
            });


        request.get('/api/message/vote')
            .end();
    }

    // componentDidUpdate() {
    //     request.get('/api/message')
    //         .query({page: this.state.page})
    //         .end((err, res) => {
    //             this.setState({
    //                 messages: res.body.reverse()
    //             });
    //
    //         });
    // }

    //同步点赞
    componentWillMount() {
        request.get('/api/message')
            .query({page: this.state.page})
            .end((err, res) => {
                this.setState({
                    messages: res.body.messages.reverse(),
                    totalPage: res.body.totalPage
                });

            });
    }

    render() {
        var number = this.state.messages.length;
        var pageCount = 0;
        var pageNum = 0;
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
                                {message.id}楼
                                <span className="heading-name">From:{message.name}</span>
                            </div>
                            <div className="panel-body">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                            <div className="panel-footer">

                                <div className="pull-right" onClick={this._Vote(message.id)}>
                                    <span className="glyphicon glyphicon-thumbs-up"/>
                                    <span>{message.votes}</span>
                                </div>
                            </div>
                        </div>

                    </div>)

                }
                <nav>
                    <ul className="pagination">
                        <li><a >&laquo;</a></li>
                        {

                        }
                        <li className={this.state.page === this.state.totalPage ? 'active' : ''}><a
                            onClick={this._pageChange(this.state.totalPage)}>1</a>
                        </li>
                        <li className={this.state.page === this.state.totalPage - 1 ? 'active' : ''}><a
                            onClick={this._pageChange(this.state.totalPage - 1)}>2</a>
                        </li>
                        <li className={this.state.page === this.state.totalPage - 2 ? 'active' : ''}><a
                            onClick={this._pageChange(this.state.totalPage - 2)}>3</a>
                        </li>
                        <li className={this.state.page === this.state.totalPage - 3 ? 'active' : ''}><a
                            onClick={this._pageChange(this.state.totalPage - 3)}>4</a>
                        </li>
                        <li className={this.state.page === this.state.totalPage - 4 ? 'active' : ''}><a
                            onClick={this._pageChange(this.state.totalPage - 4)}>5</a>
                        </li>
                        <li className={this.state.page === this.state.totalPage - 5 ? 'active' : ''}><a
                            onClick={this._pageChange(this.state.totalPage - 5)}>6</a>

                        </li>
                        <li><a >&raquo;</a></li>
                    </ul>
                </nav>

            </div>
        </div>;
    }

    _pageChange(event) {
        return () => {
            this.setState({
                page: event
            });
            request.get('/api/message')
                .query({page: event})
                .end((err, res) => {
                    this.setState({
                        messages: res.body.messages.reverse(),
                        totalPage: res.body.totalPage
                    });

                });
        };

    }

    _Vote(event) {
        return () => {
            request.post('/api/message/vote')
                .send({id: event})
                .end();
            request.get('/api/message')
                .query({page: this.state.page})
                .end((err, res) => {
                    this.setState({
                        messages: res.body.messages.reverse(),
                        totalPage: res.body.totalPage
                    });

                });
        };
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
        request.get('/api/message')
            .query({page: this.state.page})
            .end((err, res) => {
                this.setState({
                    messages: res.body.messages.reverse(),
                    totalPage: res.body.totalPage
                });

            });

    }
}
