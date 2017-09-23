import {Link} from "react-router-dom";
import Preview from "./Preview";
import S from "./style.scss";
import cfg from 'config/config.json'

let propTypes = {
  initMyPage: PT.func,
  previews:PT.array,
  collectionClick:PT.func
}

export default function PreviewList(props){
  let {previews,initMyPage,collectionClick} = props;


  previews = previews.map((elt,i)=>{
    let{
      id: article_id,
      article_title,
      createdAt,
      preview: previewContent,
      collection_name,
      user_id,
      collection_id,
      user
    } = elt;

    let{avatar, user_name, user_intro} = user;

    //avatar开始只是目标服务器的一段根目录地址，直接访问avatar的地址就是(我们自己的测试服务器+根目录地址)
    //我们自己的服务器根本没有这个地址，所以要在前面加上目标服务器的地址前缀
    avatar = cfg.url + avatar;

    return(
      <Preview
        {...{
          article_id,
          article_title,
          previewContent,
          user_id,
          user_name,
          createdAt,
          avatar,
          user_intro,
          initMyPage
        }}
        key={i}
      >
        {
          collection_name?(
            <Link
              to=""
              className={S.tag}
              onClick={
                ev=>{
                  ev.preventDefault();
                  ev.stopPropagation();

                  collectionClick && collectionClick(
                    collection_id,
                    collection_name,
                    {
                      user_id,
                      user_name,
                      avatar,
                      user_intro
                    }
                  )
                }
              }
            >
              {collection_name}
            </Link>
          ):null
        }
      </Preview>
    )
  });
  return(
    <div>
      {previews}
    </div>
  )
}

PreviewList.propTypes = propTypes;
