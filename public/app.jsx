import React from 'react';
import Bicycle from './component/bicycle.jsx'
import Bottom from './component/bottom.jsx';
import Message from './component/message.jsx';

export default class Index extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid">
                    <div className="conta">
                        <Bicycle/>
                    </div>
                    <div>
                        {/*<Message/>*/}
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
                {/*<Bottom/>*/}
            </div>
        );
    }
}
