import SignInPanel from "components/user/SignInPanel";
import EntryPanel from "components/user/Panel";

let propTypes = {
  signInAjax : PT.func,
  signInMsg: PT.object,
  clearInfo: PT.func
}

class SignIn extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillUnmount(){
    this.props.clearInfo();
  }
  render(){

    let {signInAjax,signInMsg,clearInfo} = this.props;

    return(
      <EntryPanel>
        <SignInPanel
          {...{
            signInAjax,
            signInMsg,
            clearInfo
          }}
        />
      </EntryPanel>
    )
  }
};

SignIn.propTypes = propTypes;

export { SignIn as default};
