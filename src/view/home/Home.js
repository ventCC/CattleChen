import PreviewList from "preview/PreviewList";
import Recommend from "components/home/Recommend";

import cfg from "common/config/config.json";

let propTypes = {
  initMyPage: PT.func
}

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      previews: [],
      authors: []
    };
    this.collectionClick = this.collectionClick.bind(this);

  }

  collectionClick(collection_id,collection_name,userInfo){
    let {history,initMyPage} = this.props;
    history.push('/my_page',{userInfo});
    //console.log(history);
    initMyPage(userInfo.user_id,{collection_id},collection_name)

    //console.log(collection_id,userInfo.user_id)
  }

  componentDidMount(){
    $.post(`${cfg.url}/getPreview`)
    .done(ret=>{
      if(ret.code === 0){
        this.setState({
          previews:ret.data
        })
      }
    });
    $.post(`${cfg.url}/getAuthor`)
    .done(ret=>{
      if(ret.code === 0){
        this.setState({
          authors:ret.data
        })
      }
    })
  }

  render(){

    let {previews, authors} = this.state;

    let {initMyPage,history} = this.props;

    let {collectionClick} = this;
    //console.log(authors);
    return(
      <div className="ui container grid">
        <div className="column twelve wide">
          <PreviewList
            {...{
              previews,
              initMyPage,
              collectionClick
            }}
          />
        </div>
        <div className="column four wide">
          <Recommend
            {...{
              authors,
              initMyPage,
              history
            }}
          />
        </div>
      </div>
    )
  }
};

Home.propTypes = propTypes;

export { Home as default};
