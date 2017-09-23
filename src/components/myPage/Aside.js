import cfg from "config/config.json";
import S from "./style.scss";

let propTypes={
  noteBooks:PT.array,
  userInfo:PT.object,
  notebookClick:PT.func,
  isMe:PT.bool,
  updateUserInfo:PT.func
}

export default class Aside extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isEdit:false,
      editVal:''
    }
    this.editMe = this.editMe.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editDone = this.editDone.bind(this);
  };

  editMe(ev){
    ev.stopPropagation();
    ev.preventDefault();

    let {user_intro} = this.props.userInfo;

    this.setState({
      isEdit:true,
      editVal:user_intro
    })
  }
  changeContent(ev){
    this.setState({
      editVal:ev.target.value
    })
  }
  cancelEdit(){
    this.setState({
      isEdit:false
    })
  }
  editDone(ev){
    ev.stopPropagation();
    ev.preventDefault();
    //console.log(1);
    let {editVal} = this.state;

    let {userInfo:{user_id},updateUserInfo} = this.props;

    $.post(`${cfg.url}/editIntro`,{user_intro:editVal,user_id})
    .done(({code})=>{           //这里取code的值得时候，外面要套一层{} code是请求返回的对象里面的一个元素
      //console.log(code);
      if(code===0){
        updateUserInfo(editVal)
        this.setState({isEdit:false})
      }
    })
  }
  render(){
    let {noteBooks,userInfo,notebookClick,isMe,updateUserInfo} =this.props;

    let {isEdit,editVal} = this.state;

    let {editMe,changeContent,cancelEdit,editDone} = this;
    //console.log(noteBooks);
    noteBooks = noteBooks.map((elt,i)=>{
      let {id:collection_id,collection_name} = elt;
      return (
        <div
          className="itme"
          key={i}
          onClick={ev=>{
            notebookClick(collection_id,collection_name)
          }}
        >
          <i className="book icon"></i>
          <span className="content">
            {collection_name}
          </span>
        </div>
      )
    })
    return(
      <div className={S.aside}>
        <div className="introduce">
          <div className="title">
            个人介绍
            {
              isMe ? (
                <div
                  className="ui button tiny basic right floated"
                  onClick = {editMe}
                >
                  <i className="icon write"></i>
                  编辑
                </div>
              ) : null
            }
            <div className="ui divider hidden"></div>
            {
              isEdit ? (
                <from
                  action=""
                  className="ui from"
                >
                  <div className="filed">
                    <textarea
                      value={editVal}
                      onChange={changeContent}
                    ></textarea>
                  </div>
                  <button className="ui positive button" type="submit" onClick={editDone}>提交</button>
                  <button
                    className="ui negative button"
                    type="submit"
                    onClick={cancelEdit}
                  >取消</button>
                </from>
              ):(
                <p>{userInfo.user_intro}</p>
              )
            }
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div className={S.volume}>
          <div className={S.title}>
            我的文集
          </div>
          <div className="ui list ">
            {noteBooks}
          </div>
        </div>
      </div>
    )
  }
};
Aside.propTypes = propTypes;
