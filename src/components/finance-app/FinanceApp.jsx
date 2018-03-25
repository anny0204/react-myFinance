var React = require('react');

require('./FinanceApp.css');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Table = require('react-bootstrap/lib/Table');

var Action = require('../action/Action.jsx');
var NewIncoming = require('../new-incoming/NewIncoming.jsx');
var NewOutcoming = require('../new-outcoming/NewOutcoming.jsx');

var FinanceApp = React.createClass({
    getInitialState: function() {
        return {
            actions: []
        }
    },

    componentDidMount: function () {
        var actions = JSON.parse(localStorage.getItem('actions'));
        if (actions)
            this.setState({actions: actions});
        this.refs.newIncoming.className="hide";
        this.refs.newOutcoming.className="hide";
    },

    componentDidUpdate: function() {
        localStorage.setItem('actions', JSON.stringify(this.state.actions));
        this.countMoney();
    },

    handleAddAction: function(newAction) {
        if (!newAction) {
            if (this.refs.newIncoming.className == 'show')
                this.refs.newIncoming.className='hide';
            if (this.refs.newOutcoming.className == 'show')
                this.refs.newOutcoming.className='hide';
            return;
        };
        var newActions = this.state.actions.slice();
        newActions.unshift(newAction);
        this.setState({actions: newActions});
        if (this.refs.newIncoming.className == 'show')
            this.refs.newIncoming.className='hide';
        if (this.refs.newOutcoming.className == 'show')
            this.refs.newOutcoming.className='hide';
    },

    handleAddIncoming: function() {
        this.refs.newIncoming.className = 'show';
    },
    
    handleAddOutcoming: function() {
        this.refs.newOutcoming.className = 'show';
    },

    countMoney: function() {
        var amounts = [];
        this.state.actions.forEach(action => {
            if (action.isAdd)
                amounts.push(+action.amount)
            else
            amounts.push(0 - +action.amount);
        });
        return amounts.reduce(function(sum, current){
            return sum + current
        }, 0);
    },

    render: function() {
        return (
            <div>
                <Row className="well">
                    <Col xs={6}>
                        <Button className="operation_btn" bsStyle="primary" bsSize="large" onClick={this.handleAddIncoming}>Add new expense</Button>
                    </Col>
                    <Col xs={6}>
                        <Button className="operation_btn" bsStyle="primary" bsSize="large" onClick={this.handleAddOutcoming}>Add new receipt</Button>
                    </Col>
                </Row>
                <div ref="newIncoming">
                <Row>
                    <NewIncoming addAction={this.handleAddAction}/>
                </Row>
                </div>
                <div ref="newOutcoming">
                <Row>
                    <NewOutcoming addAction={this.handleAddAction}/>
                </Row>
                </div>
                <Row className="well">
                    <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Comments</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.actions.map(function(action){
                                    return <Action key={action.id}
                                    isAdd={action.isAdd}
                                    date={action.date}
                                    comment={action.comment}
                                    amount={action.amount}
                                    currency={action.currency}
                                    category={action.category} />
                                })
                            }
                    </tbody>
                    </Table>
                </Row>
                <Row className="well">
                    <div className="money">Money in my pocket: <span className="sum">{this.countMoney()}</span> pln</div>
                </Row>
            </div>
        )
    }
});

module.exports = FinanceApp;