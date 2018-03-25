var React = require('react');
var ReactDOM = require('react-dom');

var FinanceApp = require('./components/finance-app/FinanceApp.jsx');

ReactDOM.render(
    <FinanceApp />,
    document.getElementById('point_mount')
);