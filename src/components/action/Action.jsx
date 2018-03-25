var React = require('react');

var Action = React.createClass({
    render: function () {
        var bkBlue = {color: 'blue'};
        var bkGray = {color: 'gray'};
        return (
            <tr className="action" style={this.props.isAdd ? bkBlue : bkGray}>
                <td>{this.props.date}</td>
                <td>{this.props.comment}</td>
                <td>{this.props.isAdd ? '+' : '-'}{this.props.amount}</td>
                <td>{this.props.currency}</td>
                <td>{this.props.category}</td>
            </tr>
        )
    }
});

module.exports = Action;