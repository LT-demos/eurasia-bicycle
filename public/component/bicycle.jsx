import React, {Component} from "react";
import request from 'superagent';
// require("../css/bicycle.css");
import Bottom from './bottom.jsx';

export default class Bicycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bicycleId: '',
            password: '',
            userCount: '',
            userViewedCount: '',
            voteCount: ''
        }
    }

    componentDidMount() {
        request.get('/api/bicycle/userCount')
            .end((err, res) => {
                this.setState({
                    userCount: res.body.count
                });
            });
        request.get('/api/bicycle/vote')
            .end((err, res) => {
                this.setState({
                    voteCount: res.body.voteCount
                });
            });

    }

    componentWillMount() {
        request.get('/api/bicycle/userViewdCount')
            .end((err, res) => {
                this.setState({
                    userViewedCount: res.body.userViewedCount
                });
            });

    }

    render() {
        return <form onSubmit={this._onSubmit.bind(this)}>
            <div className="bicycle">
                <div className="title col-md-12">
                    <h2>UFO</h2>
                    <h4>(testing)</h4>
                    <hr/>
                </div>
                <div className="form-group">
                    <label>车牌号:</label>
                    <input type="Number" min="0" className="form-control" id="bicycleId"
                           placeholder="请输入车牌号" required
                           value={this.state.bicycleId}
                           onChange={this._onNameChange.bind(this)}/>
                </div>
                <input type="submit" value="获取密码" className="btn btn-primary btn-bicycle"/>
                <hr/>
                <label>
                    <div id="div2">
                        累计成功 <span className="userCount">{this.state.userCount}</span> 次
                    </div>
                </label>
                <div className="pull-right userViewedCount">
                    阅读:{this.state.userViewedCount}&nbsp;&nbsp;&nbsp;
                    <span className="vote" onClick={this._vote.bind(this)}>
                        &nbsp;
                        <span className="glyphicon glyphicon-thumbs-up"/>
                        <span>{this.state.voteCount}</span>
                    </span>
                </div>
                <div id="div1" className="result"></div>
            </div>
        </form>
    }

    _vote(event) {
        request.post('/api/bicycle/vote')
            .end((err, res) => {
                this.setState({
                    voteCount: res.body.voteCount
                });
            });

    }

    _onNameChange(event) {
        $("#div1").html('');
        this.setState({
            bicycleId: event.target.value
        });
    }


    _onSubmit(event) {
        event.preventDefault();
        request.get('/api/bicycle')
            .query({bicycleId: this.state.bicycleId})
            .end((err, res) => {
                if (res.statusCode === 401) {
                    $("#div1").html(res.text + '<br/>');
                } else {
                    this.setState({
                        password: res.body.password,
                        userCount: res.body.count
                    });
                    $("#div1").html('<h2>' + '你懂的:' + '<br/>' + this.state.password + '</h2>');
                    // alert('点个赞吧!');

                }
            });
    }
}
