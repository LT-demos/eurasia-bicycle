import React, {Component} from "react";
import request from 'superagent';
// require("../css/bicycle.css");

export default class Bicycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bicycleId: '',
            password: ''
        }
    }

    render() {
        return <form onSubmit={this._onSubmit.bind(this)}>
            <div className="bicycle">
                <div className="title col-md-12">
                    <h2>Eurasia-Bicycle(测试版)</h2>
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
                <div id="div1" className="result "></div>
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
            .query({bicycleId: this.state.bicycleId})
            .end((err, res) => {
                if (res.statusCode === 401) {
                    $("#div1").html(res.text);
                } else {
                    this.setState({
                        password: res.text
                    });
                    $("#div1").html('<h2>' + '你懂的:' + '<br/>' + this.state.password + '</h2>');

                }
            });
    }
}
