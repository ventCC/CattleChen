import SignUpPanel from "components/user/SignUpPanel";
import EntryPanel from "components/user/Panel";

let propTypes = {
  signUpAjax: PT.func,
  signUpMsg: PT.object,
  clearInfo: PT.func
}

class SignUp extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillUnmount(){
    this.props.clearInfo();
  }
  render(){
    let {signUpAjax,signUpMsg,clearInfo} =this.props;
    return(
      <EntryPanel>
        <SignUpPanel
          {...{
            signUpAjax,
            signUpMsg,
            clearInfo
          }}
        />
      </EntryPanel>
    )
  }
};

SignUp.propTypes = propTypes;
export { SignUp as default};
