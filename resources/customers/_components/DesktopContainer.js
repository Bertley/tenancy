import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react' 

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true }) 

    render() {
      const { fixed } = this.state

      const LoginButton = ({exit=false}) => {
        let history = useHistory(); 
        const handleClick = () => history.push("/login"); 
        
        return (
          <Button 
            as='a' 
            inverted={!fixed}
            onClick={handleClick}
            >
            {exit == true ? "Log Out" : "Log In"}
          </Button>
        )
      }

      const AdminButton = () => {
        let history = useHistory(); 
        const handleClick = () => window.push("/manager"); 
        
        return (
          <Button 
            as='a' 
            inverted={!fixed} 
            primary={fixed} 
            style={{ marginRight: '0.5em' }}
            href={`/manager`}
            >
            Manager
          </Button>
        )
      }

      const SignupButton = () => {
        let history = useHistory(); 

        const handleClick = () => history.push("/signup"); 
        
        return (
          <Button 
            as='a' 
            inverted={!fixed} 
            primary={fixed} 
            style={{ marginLeft: '0.5em' }}
            onClick={handleClick}
            >
            Sign Up
          </Button>
        )
      }


      const logged_out_nav = (
        <>
          <LoginButton/>
          <SignupButton/>
        </>
      );
    
      const logged_in_nav = () =>{
        if(this.props.user.user.is_staff) {
          return(
            <>
            <AdminButton/>
            <LoginButton exit={true}/>
            </>
          )
        }

        return (<LoginButton exit={true}/>)
      }

      const StyledMenu = (href, title) => {
        if(this.props.match.path == href) {
          return  (<Menu.Item as='a' href={href} active>{title}</Menu.Item>)
        }
        return (<Menu.Item as='a' href={href}>{title}</Menu.Item>)
      }

      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              // textAlign='center'
              // style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  {StyledMenu('/', 'Home')}
                  {StyledMenu('/products', 'Products')}
                  <Menu.Item position='right'>
                    {this.props.user ? logged_in_nav() : logged_out_nav}
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
          {this.props.children}
        </Responsive>
      )
    }
  }
  
DesktopContainer.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object
}   

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user, 
  };
}



export default withRouter(connect(mapStateToProps)(DesktopContainer)); 