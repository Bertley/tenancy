import React from 'react' 
import { connect } from 'react-redux';
import ResponsiveContainer from '../_components/Container'

class ProductPage extends React.Component {
    componentDidMount() {}

    render() {
        const {user} = this.props; 
        return (
            <ResponsiveContainer>
                <h1>Hello World</h1>
            </ResponsiveContainer>
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

const connectedProductPage = connect(mapStateToProps)(ProductPage);
export { connectedProductPage as ProductPage };