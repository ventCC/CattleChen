import {Link} from "react-router-dom";
import Author from "./Author";
import S from "./style.scss";



export default function Recommend({authors,initMyPage,history}){
  //console.log(authors);
  return(
    <div className={S.recommend}>
      <div className={S.title}>
        <span>作者列表</span>
      </div>
      <div className="ui items">
        {
          authors.map((elt,i)=>{
            return(
              <Author
                {...{
                  user:elt,
                  initMyPage,
                  history
                }}
                key={i}
              />
            )
          })
        }
      </div>
    </div>
  )
}
