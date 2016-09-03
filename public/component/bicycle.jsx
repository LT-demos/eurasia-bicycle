import React, {Component} from "react";
import request from 'superagent';
require("../css/bicycle.css");

export default class Bicycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bicycleId: '',
        }
    }

    render() {
        return <form onSubmit={this._onSubmit.bind(this)}>
            <div className="register">
                <div className="title"><h3>Eurasia-Bicycle</h3></div>
                <div className="form-group">
                    <label>车牌号:</label>
                    <input type="bicycleId" className="form-control" id="bicycleId"
                           placeholder="请输入车牌号" required
                           value={this.state.bicycleId}
                           onChange={this._onNameChange.bind(this)}/>
                </div>
                <input type="submit" value="获取密码" className="btn btn-primary"/>
                <div id="div1"></div>
            </div>
        </form>
    }

    _onNameChange(event) {
        this.setState({
            bicycleId: event.target.value
        });
    }


    _onSubmit(event) {
        event.preventDefault();
        request.get('/api/bicycle')
            .query({bicycleId:this.state.bicycleId})
            .end((err,res) => {
                // alert(res.body.password);
                this.setState({
                    password:res.body.password
                });
                $("#div1").html('你懂的:' + this.state.password + '</a>');
            });
    }
}
