var React = require('react');

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Button = require('react-bootstrap/lib/Button');

require('./NewOutcoming.css');

var NewOutcoming = React.createClass({
    handleCancelAction: function() {
        this.props.addAction();
    },

    handleSaveAction: function() {
        if (!this.date)
            this.date = Date.now();
        if (!this.amount)
            this.amoun = 0;
        if (!this.currency)
            this.currency = "PLN";
        if (!this.category)
            this.category = "Salary";
        
        var action = {
            id: Date.now(),
            isAdd: true,
            date: this.date,
            comment: this.comment,
            amount: this.amount,
            currency: this.currency,
            category: this.category
        };

        this.props.addAction(action);

        this.date = this.comment = this.amount = this.currency = this.category = "";
    },

    getInitialState: function(){
        return {
            action: {}
        }
    },

    handleDateChange: function(e) {
        this.date = e.target.value;
    },

    handleCommentChange: function(e) {
        this.comment = e.target.value;
    },

    handleAmountChange: function(e) {
        this.amount = e.target.value;
    },

    handleCurrencyChange: function(e) {
        this.currency = e.target.value;
    },

    handleCategoryChange: function(e) {
        this.category = e.target.value;
    },

    render: function(){
        return (
            <div className="new_outcoming well">
                <FormGroup>
                    <Row className="row">
                        <Col xs={2}>
                            <label>Date: </label>
                        </Col>
                        <Col xs={8}>
                            <FormControl type="date" value={this.date} onChange={this.handleDateChange}></FormControl>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className="row">
                        <Col xs={2}>
                            <label>Comment: </label>
                        </Col>
                        <Col xs={8}>
                            <textarea className="textarea" value={this.comment} onChange={this.handleCommentChange}></textarea>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className="row">
                        <Col xs={2}>
                            <label>Amount: </label>
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" value={this.amount} onChange={this.handleAmountChange}></FormControl>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className="row">
                        <Col xs={2}>
                            <label>Currency: </label>
                        </Col>
                        <Col xs={8}>
                            <select onChange={this.handleCurrencyChange}>
                                <option>PLN</option>
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className="row">
                        <Col xs={2}>
                            <label>Category: </label>
                        </Col>
                        <Col xs={8}>
                            <select onChange={this.handleCategoryChange}>
                                <option>Salary</option>
                                <option>Else</option>
                            </select>
                        </Col>
                    </Row> 
                </FormGroup>
                <FormGroup className="btn_holder">
                    <Button bsStyle="primary" className="save_btn" onClick={this.handleSaveAction}>Save</Button>
                    <Button bsStyle="primary" className="save_btn" onClick={this.handleCancelAction}>Cancel</Button>
                </FormGroup>            
            </div>
        )
    }
});

module.exports = NewOutcoming;