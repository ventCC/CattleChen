import Panel from "./Panel";
import S from "./style.scss";
import Validation from "util/validation.js";

let propTypes = {
  signInAjax: PT.func,
  signInMsg: PT.object,
  clearInfo: PT.func
}


class SignInPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      passw: '',
      nameErr: false,
      passwErr: false
    }

    this.validator = new Validation();

    this.validator.addByValue('username',[
      {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
      {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
      {strategy: 'maxLength:6', errorMsg: '长度最大为6'}
    ]);

    this.validator.addByValue('passw',[
      {strategy: 'isEmpty', errorMsg: '密码不能为空'},
      {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
      {strategy: 'maxLength:6', errorMsg: '长度最大为6'}
    ]);

    this.usernameChange = this.usernameChange.bind(this);
    this.passwChange = this.passwChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  usernameChange(ev){
    let {target} = ev;

    let msg = this.validator.valiOneByValue('username',target.value);

    this.setState({
      username: target.value,
      nameErr: msg
    })
  }
  passwChange(ev){
    let {target} = ev;

    let msg = this.validator.valiOneByValue('passw',target.value);

    this.setState({
      passw: target.value,
      passwErr: msg
    })
  }

  onSubmit(ev){
    ev.preventDefault();
    ev.stopPropagation();

    let {signInAjax} = this.props;

    let{nameDom,passwDom} = this.refs;

    let nameErr = this.validator.valiOneByValue('username',nameDom.value);
    let passwErr = this.validator.valiOneByValue('passw',passwDom.value);

    this.setState({
      nameErr,
      passwErr
    });

    if( !nameErr && !passwErr){
      signInAjax({
        username:nameDom.value,
        passw:passwDom.value
      });
    }
  }

  render(){
    let {passwChange,usernameChange,onSubmit} = this;

    let {username, passw, nameErr, passwErr} = this.state;

    let {signInMsg} =this.props;

    let resInfo = null;

    if(signInMsg && signInMsg.code !==0){
      resInfo=(
        <div className="ui message error">
          <p>{signInMsg.msg}</p>
        </div>
      )
    };

    let nameErrMsg = nameErr ? (
      <p className={S.err}>{nameErr}</p>
    ) : null;

    let passwErrMsg = passwErr ? (
      <p className={S.err}>{passwErr}</p>
    ) : null;

    return(
      <div className={S.sign_panel}>
        {resInfo}
        <form className="ui form" onSubmit={onSubmit}>
          <div className={`field ${nameErr ? 'error':''}`}>
            <input
              type='text'
              placeholder="用户名"
              value={username}
              onChange={usernameChange}
              ref="nameDom"
            />
            {nameErrMsg}
          </div>
          <div className={`field ${passwErr ? 'error':''}`}>
            <input
              type='text'
              placeholder="密码"
              value={passw}
              onChange={passwChange}
              ref="passwDom"
            />
            {passwErrMsg}
          </div>
          <div className={`field`}>
            <button
              type='submit'
              className="ui button fluid primary"
            >登录</button>
          </div>
        </form>
      </div>
    )
  }
};
SignInPanel.propTypes = propTypes;
export { SignInPanel as default};
