import React,{ Component } from 'react'
import '../css/coll.css' 
import {Icon} from 'antd'
import $ from 'jquery';
// import { Link} from 'react-router-dom'
import Colllist from '../common/view/colllist'
class Aaa extends Component {
   state = {
       date:JSON.parse(localStorage.getItem("collect")),
       collNum:''
   }
   componentDidMount(){
    //收藏数量
    var n = this.state.date.length;
    this.setState({
        collNum:n
    })
   }
   menu(){
    $("#cbl").css({"left":"0"});
    $("#right").css({"opacity":0.5});
   }
   render(){
         return(
             <div className='coll'>
                 <header> 
                    <Icon type="menu" className="top_logo1"  onClick={()=>this.menu()}/>
                    <span>{this.state.collNum} 条收藏</span>
                    <div>   
                    </div>
                 </header>
                 <div className="nulls"></div>

                {this.state.date?<Colllist items={this.state.date}></Colllist>:null}
                
                
             </div>
   )}
}
export default Aaa