import React , {Component}from 'react';
import { connect } from 'react-redux';
import { authService } from '../../utils/authentication';
import { getUser } from '../../Actions/UserAction';

class Restricted extends Component  {
  async componentWillMount(){

    const user = await authService.decodeToken();
    if(user){
      this.props.getUser(user.userId);
    }
  }

  render(){
    const { children , roles, currentUser} = this.props;
    let isAuthorized;

    if (currentUser){
      isAuthorized = roles.includes(currentUser.role.name);

    }
    return (
      <div hidden = {!isAuthorized}>
        {children}
      </div>
    );}
}
const mapStateToProps = state => ({

  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Restricted);
