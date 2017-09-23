import {Link} from "react-router-dom";
import cfg from "config/config.json";

export default function Author({user,initMyPage,history}){
  //console.log(user);
  let {user_name, avatar, id:user_id} = user;

  avatar = cfg.url + avatar;

  //console.log(avatar);

  return(
    <div className="item">
      <Link
        to='/'
        className="ui mini avatar image"
        onClick={ev=>{
          ev.stopPropagation();
          ev.preventDefault();

          history.push('/my_page',{userInfo:user})

          initMyPage(user_id,{user_id},'所有文章')

        }}
      >
        <img src={avatar} alt=""/>
      </Link>
      <div className="content">
        <div className="header">
          {user_name}
        </div>
      </div>
    </div>
  )
}
