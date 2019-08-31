import React,{ Component } from 'react'
import '../css/coll.css' 
import {Icon} from 'antd'
// import { Link} from 'react-router-dom'
import Colllist from '../common/view/colllist'
class Aaa extends Component {
   state = {
       date:JSON.parse(localStorage.getItem("collect")),
   }
   componentDidMount(){
    //    console.log(this.state.date)
   }
   render(){
         return(
             <div className='coll'>
                 <header> 
                    <Icon type="menu" className="top_logo1" />
                    <span>..?条收藏</span>
                    <div>   
                    </div>
                 </header>
                 <div className="nulls"></div>

                {this.state.date?<Colllist items={this.state.date}></Colllist>:null}
                
                
             </div>
   )}
}
export default Aaa