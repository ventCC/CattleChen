
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


require('../semantic/dist/semantic.css');
require('./common/style/main.css');

class Nav extends React.Component{
  render(){
    return(
      <div className="ui menu">
        <div className='header item'>Nodes</div>
        <div className='item'>List</div>
        <div className='item'>Home</div>
      </div>
    )
  }
}

class Body extends React.Component{
  render(){
    return(
      <div>
        <img className='img' src={require('./common/img/128H.jpg')} alt='' />
      </div>
    )
  }
}


ReactDOM.render(
    <div className='ui container'>
      <div className='dividing'></div>
      <Nav />
      <Nav />
      <Nav />
      <Nav />
      <Body />
    </div>,
    document.getElementById('root')
);



if(module.hot){ 
    module.hot.accept()
}
