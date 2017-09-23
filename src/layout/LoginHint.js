import {Component} from "react";

export default class LoginHint extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    //console.log(1);
    let {history} = this.props;
    setTimeout(()=>{
      history.push('/sign_in')
    },2000)
  };
  render(){
    return(
      <div className="ui aligned center header">
        先登录，即将跳转
      </div>
    )
  }
};
