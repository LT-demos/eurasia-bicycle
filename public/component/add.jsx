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


            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">
                Large modal
            </button>

            <div className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
                 aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <p>One fine body&hellip;</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


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
                            <button onClick={this._onFind(bicycle.noPasswordBicycleId)}>查找</button>
                            {count++}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {bicycle.noPasswordBicycleId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button onClick={this._onDelete(bicycle.noPasswordBicycleId)}>删除</button>
                            <br/>
                            </div>
                        )
                    }
                    共: {count} 辆
                </div>
            </div>
        </div>
    }

    _onFind(event) {
        return () => {
            request.get('/api/bicycle/findBicycleId')
                .query({bicycleId: event})
                .end((err, data) => {
                    alert(data.body.message);
                    alert('id:' + data.body.bicycleId+',password:' + data.body.password);
                });
            alert('查找:'+event);
        }
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
