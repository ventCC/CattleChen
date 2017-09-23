import AutoInfo from "components/myPage/AutoInfo";
import Aside from "components/myPage/Aside";
import PreviewList from "preview/PreviewList";

let propTypes = {
  previewsName:PT.string,
  noteBooks: PT.array,
  myPagePreview: PT.array,
  previewsName: PT.string,
  changePreview: PT.func,
  initMyPage:PT.func,
  myInfo:PT.object,
  updateUserInfo:PT.func
}

export default class Mypage extends React.Component{
  constructor(props){
    super(props);
    this.collectionClick=this.collectionClick.bind(this);
    this.notebookClick=this.notebookClick.bind(this);
  };

  collectionClick(collection_id,collection_name){
    this.props.changePreview({collection_id},collection_name)
  }

  notebookClick(collection_id,collection_name){
    this.collectionClick(collection_id,collection_name)
  }

  render(){
    let {noteBooks, myPagePreview,previewsName,location,initMyPage,myInfo,updateUserInfo} = this.props;

    let {userInfo} = location.state;

    let {collectionClick,notebookClick} =this;

    let isMe = false;

    if(myInfo){
      isMe = (myInfo.user_id == userInfo.user_id);
      userInfo = myInfo;
    }
    //console.log(myInfo,userInfo);

    //console.log(location);
    console.log(location.state);
    return(
      <div className="ui container grid">
        <div className="twelve wide column">
          <AutoInfo
            {...{
              userInfo,
              initMyPage
            }}
          />
          <div className="ui secondary pointing menu">
            <span className="active item">
              {previewsName}
            </span>
          </div>
          <PreviewList
            {...{
              previews:myPagePreview,
              collectionClick,
              initMyPage
            }}
          />
        </div>
        <div className="four wide column">
          <Aside
            {...{
              noteBooks,
              userInfo,
              notebookClick,
              isMe,
              updateUserInfo
            }}
          />
        </div>
      </div>
    )
  }
};

Mypage.propTypes = propTypes;
