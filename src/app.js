import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Frame from "layout/frame/Frame.js";

require('semantic/dist/semantic.min.css');
require('semantic/dist/semantic.min.js');

$.ajaxSetup({
  xhrFields: {withCredentials:true}
})

ReactDOM.render(
    <Router>
      <Route path='/' component={Frame} />
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
