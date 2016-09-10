import React, {Component} from "react";
import {hashHistory} from 'react-router'
import request from 'superagent';

export default class Message extends Component {
    render() {
        return <div className="container-fluid">
            <div className="page-header">
                <h1>留言板</h1>
            </div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">
                点击留言
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

        </div>;
    }
}
