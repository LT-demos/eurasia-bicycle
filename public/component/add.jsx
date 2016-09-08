import React, {Component} from "react";
import request from 'superagent';
require("../css/bicycle.css");

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bicycleId: '',
            password: '',
            noPasswordBicycle: []
        }
    }


    componentDidMount() {
        request.get('/api/bicycle/noPasswordBicycle')
            .end((err, res) => {
                this.setState({
                    noPasswordBicycle: res.body
                });
            });
    }

    // componentWillUpdate() {
    //     request.get('/api/bicycle/noPasswordBicycle')
    //         .end((err, res) => {
    //             this.setState({
    //                 noPasswordBicycle: res.body
    //             });
    //         });
    // }

    render() {
        var count = 0;
        return <div>
            <div className="register container-fluid">
                <form onSubmit={this._onSubmit.bind(this)}>
                    <div className="title"><h3>Eurasia-Bicycle</h3></div>
                    <div className="form-group">
                        <label>车牌号:</label>
                        <input type="bicycleId" className="form-control" id="bicycleId"
                               placeholder="请输入车牌号" required
                               value={this.state.bicycleId}
                               onChange={this._onBicycleIdChange.bind(this)}/>
                        <input className="form-control" id="password"
                               placeholder="请输入密码" required
                               value={this.state.password}
                               onChange={this._onPasswordChange.bind(this)}/>
                    </div>
                    <input type="submit" value="录入" className="btn btn-primary"/>
                    <div id="div1"></div>


                </form>
                没密码的车牌号:
                <div>
                    {

                        this.state.noPasswordBicycle.map(bicycle => <div>
                                {count++}&nbsp;|&nbsp;&nbsp;&nbsp;
                                {bicycle.noPasswordBicycleId}&nbsp;&nbsp;&nbsp;
                                <button onClick={this._onDelete(bicycle.noPasswordBicycleId)}>删除</button>
                            </div>
                        )
                    }
                    共: {count} 辆
                </div>
            </div>
        </div>
    }

    _onDelete(event) {
        return () => {
            request.delete('/api/bicycle/delete')
                .send({noPasswordBicycleId: event})
                .end((err, res) => {
                    this.setState({
                        noPasswordBicycle: res.body
                    });
                });
            alert(event);
        };
    }

    _onBicycleIdChange(event) {
        this.setState({
            bicycleId: event.target.value
        });
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }


    _onSubmit(event) {
        event.preventDefault();
        request.post('/api/bicycle')
            .send({
                bicycleId: this.state.bicycleId,
                password: this.state.password
            })
            .end((err, res) => {
                alert(res.text)
            });
    }
}
