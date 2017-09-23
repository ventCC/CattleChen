import {Route, Redirect} from "react-router-dom";
import Nav from "nav/Nav.js";
import S from "./style.scss";
import Home from "view/home/Home.js";
import SignIn from "view/user/SignIn.js";
import SignUp from "view/user/SignUp.js";
import cfg from "config/config.json";
import Mypage from "view/user/Mypage.js";
import Write from "view/write/Write";
import LoginHint from "layout/LoginHint";

class Frame extends React.Component{
  constructor(props){
    super(props);
    this.state={
      myInfo:null,
      signInMsg:null,
      signUpMsg:null,
      hasLogin:false,
      previewsName:'所有文章',
      noteBooks:[],
      myPagePreview:[]
    };
    this.signInAjax = this.signInAjax.bind(this);
    this.signUpAjax = this.signUpAjax.bind(this);
    this.clearInfo = this.clearInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.initMyPage = this.initMyPage.bind(this);
    this.changePreviewName = this.changePreviewName.bind(this);
    this.changePreview = this.changePreview.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }
  updateUserInfo(intro){
    let {myInfo} = this.state;

    myInfo.user_intro = intro;

    this.setState({
      myInfo
    })
  }

  initMyInfo(myInfo){
    //console.log(myInfo);
    if(myInfo){
      let {id,avatar,user_intro,username} = myInfo;
      avatar = cfg.url + avatar;

      myInfo = {
        user_id:id,
        user_intro,
        user_name:username,
        avatar
      }
    };

    this.setState({myInfo})

  }

  clearInfo(){
    this.setState({
      signInMsg:null,
      signUpMsg:null
    })
  }

  signInAjax(reqDate){
    $.post(`${cfg.url}/login`, reqDate)
    .done(ret=>{
      //console.log(ret);
      let {code,data} = ret;

      if(code === 0){
          this.initMyInfo(ret.data)
          //console.log(this.state.myInfo);
      }else{
        this.setState({
          signInMsg:ret
        })
      };

    })
  }

  signUpAjax(reqDate){
    $.post(`${cfg.url}/register`,reqDate)
    .done(ret=>{

      let {data,code} = ret;

      console.log(ret);

      if(code===0){
        setTimeout(()=>{
          this.initMyInfo(ret.data)
        },1000)
      }
      this.setState({
        signUpMsg:ret
      })
    })
  }
  logOut(){
    $.post(`${cfg.url}/logout`)
    .done(({code})=>{
      if(code===0){
        this.initMyInfo(null);
      }
    })
  }

  //通过传入一个用户的reqDate--用户的id，然后post方法，通过这个id，拿到相应的数据，.done
  //后，设置组件的myPagePreview,[object...],然后通过层层传入到Previews组件，进行渲染
  getPreview(reqDate,previewsName){
    $.post(`${cfg.url}/getPreview`,reqDate)
    .done(({code,data})=>{
      if(code===0){
        this.setState({
          myPagePreview:data,
          previewsName
        })
        //console.log(this.state.myPagePreview,reqDate);

      }
    })
  }
  changePreview(reqDate,previewsName){
    this.getPreview(reqDate,previewsName);
  }
//previewName 是文集名称
//通过user_id(在post中，user_id是一个对象格式)，拿到数据，然后设置组件的状态notebooks，
//previewsName，进行初始化页面，在previews这个组件中，点击时，调用这个方法
  initMyPage(user_id,previewPage,previewsName){
    this.getPreview(previewPage,previewsName);
    $.post(`${cfg.url}/getCollection`,{user_id})
    .done(({code,data})=>{
      if(code===0){
        this.setState({
          noteBooks:data
        })
      }
    })
  }

  changePreviewName(previewsName){
    this.setState({
      previewsName
    })
  }

  componentDidMount(){
    //console.log(11)
    $.post(`${cfg.url}/autologin`)
    .done(({data,code})=>{
      if(code===0){
        this.initMyInfo(data);
      }
      //console.log(this.state.myInfo);
      this.setState({hasLogin:true})

      let {state,pathname} = this.props.location;

      if(state){
        let {user_id} = state.userInfo;

        //当location有state这个对象的时候，并且当页面在my_page页面的时候，再进行页面初始化
        if(pathname==='/my_page'){
          this.initMyPage(user_id,{user_id},'所有文章')
        }
      }

    })
  }

  render(){
    let {signInAjax,signUpAjax,clearInfo,logOut,initMyPage,getPreview,changePreview,updateUserInfo} = this;

    let {signInMsg,signUpMsg,myInfo,hasLogin,previewsName,noteBooks,myPagePreview} = this.state;

    let {history} = this.props;
    //console.log(myInfo);
    //console.log(noteBooks);

    //刚开始的时候，hasLogin的值为false，组件返回这个div，等所有的组件componentDidMount，
    //并且从服务器请求到数据的完成的时候，开始设置hasLogin的值，设置状态之后，组件刷新，跳
    //过下面的判断，直接渲染Frame这个组件，这样就避免了，每次一开始，组件还没有渲染完成的时候，
    //myInfo的值为null，组件会加载登陆和注册这个原始界面
    if(!hasLogin){
      return (<div></div>)
    }

    return(
      <div className={S.layout}>
        <Nav
          {...{
            myInfo,
            logOut,
            history,
            initMyPage
          }}
        />
        <Route exact path='/' render={
          (props)=>(
            <Home
              {...{
                initMyPage
              }}
              {...props}
            />
          )
        }></Route>
        <Route path='/sign_in' render={
          (props)=>(
            myInfo ? (
              <Redirect to='/' />
            ) : (<SignIn
              {...{
                signInAjax,
                signInMsg,
                clearInfo
              }}
            />)
          )
        }></Route>
        <Route path='/sign_up' render={
          (props)=>(
            myInfo ? (
              <Redirect to='/' />
            ) : (
              <SignUp
                {...{
                  signUpAjax,
                  signUpMsg,
                  clearInfo
                }}
              />
            )
          )
        }></Route>
        <Route path='/my_page' render={
          (props)=>(
            //当直接输入地址locallhost:9001/my_page的时候，location没有state这个对象
            //的，所以在这儿进行判断，有state就渲染Mypage组件，没有就重定向到首页
            props.location.state?(
              <Mypage
                {...{
                  previewsName,
                  noteBooks,
                  myPagePreview,
                  initMyPage,
                  changePreview,
                  myInfo,
                  updateUserInfo
                }}
                //这里要加上props属性，不然后面Mypage组件使用location时，是未定义
                {...props}
              />
            ):(
              <Redirect to='/' />
            )

          )
        }></Route>
        <Route path='/write' render={
          (props)=>(
            myInfo?(
              <Write
                {...{
                  myInfo
                }}
              />
            ):(
              <Redirect to='/login_hint' />
            )
          )
        }/>

        <Route path='/login_hint' component={LoginHint} />
      </div>
    )
  }
};

export { Frame as default};
