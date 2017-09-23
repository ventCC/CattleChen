import {Link,withRouter} from "react-router-dom";
import S from "./style.scss";
import cfg from "config/config.json";

let propTypes = {
  userInfo: PT.object,
  initMyPage:PT.func
}

function AutoInfo({userInfo,initMyPage,history}){
  let {avatar,user_name,user_id} = userInfo;
  //console.log(userInfo);
  console.log(userInfo);
  if(avatar.substring(0,4) == 'http'){
    avatar = avatar;
  }else{
    avatar  = cfg.url + avatar;
  }
  return(
    <div className={S.author_info}>
      <Link
        to='/my_page'
        className={S.avatar}
        onClick={ev=>{
          ev.preventDefault();
          ev.stopPropagation();

          history.push('/my_page',{userInfo})
          initMyPage(user_id,{user_id},'所有文章')
        }}
      >
        <img src={avatar} alt='' />
      </Link>
      <div className={S.title}>
          <Link
              to="/my_page"
              className={S.name}
          >
              {user_name}
          </Link>
      </div>
    </div>
  )
}

AutoInfo.propTypes = propTypes;

export default withRouter(AutoInfo);
