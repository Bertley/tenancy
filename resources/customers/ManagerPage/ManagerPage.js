import React from 'react' 
import { connect } from 'react-redux';
import ResponsiveContainer from '../_components/Container'

class ManagerPage extends React.Component {
    componentDidMount() {}

    render() {
        const {user} = this.props; 
        return (
            <h1>ManagerPage</h1>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedManagerPage = connect(mapStateToProps)(ManagerPage);
export { connectedManagerPage as ManagerPage };