import Panel from "./Panel";
import S from "./style.scss";
import Validation from "util/validation.js";

let propTypes = {
  signUpAjax: PT.func,
  signUpMsg: PT.object,
  clearInfo: PT.func
}

class SignUpPanel extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      passw:'',
      cfPassw:'',
      nameErr:false,
      passwErr:false,
      cfPasswErr:false
    }

    this.nameChange = this.nameChange.bind(this);
    this.passwChange = this.passwChange.bind(this);
    this.cfPasswChange = this.cfPasswChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.validator = new Validation();

    this.validator.addByValue('username',[
      {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
      {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
      {strategy: 'maxLength:6', errorMsg: '最大长度不能超过6'}
    ]);

    this.validator.addByValue('passw',[
      {strategy: 'isEmpty', errorMsg: '密码不能为空'},
      {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
      {strategy: 'maxLength:6', errorMsg: '最大长度不能超过6'}
    ]);



  }
  nameChange(ev){
    let {target} = ev;

    let msg = this.validator.valiOneByValue('username',target.value);

    //console.log(msg);

    this.setState({
      name: target.value,
      nameErr: msg
    })
  }
  passwChange(ev){

    let {target} = ev;

    let msg = this.validator.valiOneByValue('passw',target.value);

    //先拿到确认密码框有没有出错

    let {cfPasswErr} = this.state;

    this.setState({
      passw: target.value,
      passwErr: msg
    })

    if(cfPasswErr){
      console.log(1);
      this.cfPasswChange();
    }

  }
  cfPasswChange(){
    let {passwDom, cfPasswDom} = this.refs;

    let cfPasswErrMsg = (passwDom.value === cfPasswDom.value) ? '' : '密码不一致'

    //console.log(passwDom.value,cfPasswDom.value);

    this.setState({
      cfPassw:cfPasswDom.value,
      cfPasswErr:cfPasswErrMsg
    })
  };

  onSubmit(ev){
    ev.preventDefault();
    ev.stopPropagation();

    let {validator} = this;

    let {name,passw,cfPassw} = this.state;

    let nameErr = this.validator.valiOneByValue('username',name);
    let passwErr = this.validator.valiOneByValue('passw',passw);

    //console.log(name,passw);
    let cfPasswErr = (cfPassw === passw) ? '' : '密码不一致';

    this.setState({
      nameErr,
      passwErr,
      cfPasswErr
    })

    if(!nameErr && !passwErr && !cfPasswErr){

      this.props.signUpAjax({
        name,passw,cfPassw
      })
    }
  }
  render(){
    let {nameChange, passwChange, cfPasswChange, onSubmit} = this;

    let {name, passw, cfPassw, nameErr, passwErr, cfPasswErr} = this.state;

    let{signUpMsg} = this.props;

    let refInfo = null;

    if(signUpMsg){
      if(signUpMsg.code === 0){
        refInfo = (
          <div className="ui message positive">
            <p>{signUpMsg.msg}</p>
            <p>马上帮您登陆</p>
          </div>
        );
      }else{
        refInfo = (
          <div className="ui message error">
            <p>{signUpMsg.msg}</p>
          </div>
        );
      }
    }


    let nameErrMsg = nameErr ? (
      <p className={S.err}>{nameErr}</p>
    ) : null;

    let passwErrMsg = passwErr ? (
      <p className={S.err}>{passwErr}</p>
    ) : null;

    let cfPasswErrMsg = cfPasswErr ? (
      <p className={S.err}>{cfPasswErr}</p>
    ) : null;

    return(
      <div className={S.sign_panel}>
        {refInfo}
        <form className="ui form" onSubmit={onSubmit}>
          <div className={`field ${nameErr ? 'error' : ''}`}>
            <input
              type='text'
              placeholder="用户名"
              value={name}
              onChange={nameChange}
              ref="nameDom"
            />
            {nameErrMsg}
          </div>
          <div className={`field ${passwErr ? 'error' : ''}`}>
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
            <input
              type='text'
              value={cfPassw}
              onChange={cfPasswChange}
              placeholder="确认密码"
              ref="cfPasswDom"
            />
            {cfPasswErrMsg}
          </div>
          <div className={`field`}>
            <button
              type='submit'
              className="ui button fluid primary"
            >注册</button>
          </div>
        </form>
      </div>
    )
  }
};
SignUpPanel.propTypes = propTypes;
export { SignUpPanel as default};
