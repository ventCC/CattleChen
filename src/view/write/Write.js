
import {Component} from 'react';
import cfg from 'config/config.json';
import S from './style.scss';

let propTypes = {
  myInfo:PT.object
}

export default class Write extends Component{
    constructor(props){
        super(props);
        this.state={
          collections:[],
          titleVal:'',
          cltVal:'',
          contentVal:''
        }
        this.titleValChange=this.titleValChange.bind(this);
        this.cltValChange=this.cltValChange.bind(this);
        this.contentValChange=this.contentValChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.addCollection=this.addCollection.bind(this);

        this.collectionNames = {};
    }
    titleValChange(ev){
      this.setState({titleVal:ev.target.value})
    }
    cltValChange(ev){
      this.setState({cltVal:ev.target.value})
    }
    contentValChange(ev){
      this.setState({contentVal:ev.target.value})
    }
    onSubmit(ev){
      ev.stopPropagation();
      ev.preventDefault();

      let {value:cltId} = this.refs.cltIdInput;

      if(!cltId) return;

      let {
        titleVal:article_title,
        contentVal:article_content
      } = this.state;

      let {user_id} = this.props.myInfo;

      let collection_name = this.collectionNames[cltId];

      //console.log(this.refs.cltIdInput);
      //console.log(this.collectionNames);


      $.post(`${cfg.url}/addArticle`,{
        article_content,
        article_title,
        user_id,
        collection_name,
        collection_id:cltId
      })
      .done(({code})=>{
        if(code===0){
          this.setState({
            titleVal:'',
            contentVal:''
          })
        }
      })
      //console.log(collection_name,article_content,article_title,user_id);
    }

    addCollection(ev){
      //console.log(this.state.cltVal);
      if(ev.keyCode === 13){
        $.post(`${cfg.url}/addCollection`,{
          name:this.state.cltVal,
          user_id:this.props.myInfo.user_id
        })
        .done(({code,data})=>{
          if(code===0){
            this.setState({
              cltVal:'',
              collections:data
            })
          }
        })
      }
    }
    componentDidMount(){
      let {user_id} = this.props.myInfo;

      $.post(`${cfg.url}/getCollection`,{user_id})
      .done(({code,data})=>{
        if(code===0){
          this.setState({
            collections:data
          })
        };
      })
      $(this.refs.dropdown).dropdown();
    }
    componentWillUnmount(){
      $(this.refs.dropdown).off();
    }

    render(){
      let {collections,titleVal,cltVal,contentVal} = this.state;

      let {titleValChange,cltValChange,contentValChange,onSubmit,addCollection} = this;

      let {collectionNames} = this;



      collections = collections.map(({id,collection_name},i)=>{
        collectionNames[id] = collection_name;
        return(
          <div
            className="item"
            key={i}
            //让input的value的值，变为相应的一个id
            data-value={id}
            >
            {collection_name}
          </div>
        )
      })

      //console.log(collectionNames);

        return(
            <div className="ui container">
                <header className="ui header dividing">
                    <h1>写文章</h1>
                </header>
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className="field">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="标题"
                            value={titleVal}
                            onChange={titleValChange}
                        />
                    </div>
                    <div className="fields">
                        <div className="field five wide column required">
                            <div
                              className="ui selection dropdown"
                              id="writeArtical"
                              ref="dropdown"
                            >
                                <input
                                    type="hidden"
                                    name="album"
                                    ref="cltIdInput"
                                />
                                <div className="default text">选择一个文集</div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  {collections}
                                </div>
                            </div>
                        </div>
                        <div className="field eleven wide column">
                            <input
                                type="text"
                                className=""
                                placeholder="回车, 添加文集"
                                value={cltVal}
                                onChange={cltValChange}
                                onKeyDown={addCollection}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <textarea
                            rows="16"
                            className=""
                            placeholder="随便写点文字. . ."
                            value={contentVal}
                            onChange={contentValChange}
                        >
                        </textarea>
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button primary"
                        >保存</button>
                    </div>

                </form>
            </div>
        )
    }
}

Write.propTypes = propTypes;
