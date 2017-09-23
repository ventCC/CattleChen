import {Link, withRouter} from "react-router-dom";
import S from "./style.scss";


let PropsType = {
  article_id: PT.number,
  article_title: PT.string,
  previewContent: PT.string,
  user_id: PT.number,
  user_name: PT.string,
  collection_id: PT.number,
  collection_name: PT.string,
  liked: PT.number,
  createdAt: PT.string,
  avatar: PT.string,
  initMyPage: PT.func,
  user_intro: PT.string
}

function Preview(props){
  let　{
    article_id,
    article_title,
    previewContent,
    user_id,
    user_name,
    history,
    liked,
    createdAt,
    avatar,
    initMyPage,
    viewer,
    user_intro
  } = props;

  //console.log(user_intro);

  //createdAt = new Date(createdAt).toLocaleString();
  createdAt = '今天';
  return(
    <div className={`${S.note}`}>
      <div className='ui divided hidden'></div>
      <div className={`${S.content}`}>
        <div className={`${S.author}`}>
          <Link
            to='/my_page'
            className="avatar"
            onClick={
              ev=>{
                ev.preventDefault();
                ev.stopPropagation();

                history.push('/my_page', {
                  userInfo: {
                    user_id,
                    user_name,
                    avatar,
                    user_intro
                  }
                });
                initMyPage(user_id,{user_id},'所有文章')
              }
            }
          >
            <img src={avatar} alt="" className="ui avatar image"/>
          </Link>
          <div className={`${S.name}`}>
            <Link to='/'>{user_name}</Link>
            <span className="item">{createdAt}</span>
          </div>
        </div>
        <Link to='/' className={S.title}>{article_title}</Link>
        <p className={S.abstract}>{previewContent}</p>
        <div className={S.meta}>{props.children}</div>
      </div>
    </div>
  )
}

Preview.PropsType = PropsType;

export default withRouter(Preview);
