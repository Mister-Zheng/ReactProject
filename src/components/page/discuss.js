import React,{ Component } from 'react'
import '../css/discuss.css' 
import {Icon} from 'antd'
import { Collapse } from 'antd';

import Imgs from '../common/img/shafa.png'

class Discuss extends Component {
   state = {}
    goBack(){
        this.props.history.go(-1) 
    }
   render(){
         return(
             <div className='discuss'>
                 <header>
                    <Icon type="left" className="top_logo1" onClick={()=>this.goBack()} /> 
                    <span>...?条点评</span>
                    <div>   
                    <Icon type="form" className="top_logo3"/>   
                    </div>
                 </header>
                    {/* 长评论 */}
                 <div className="longpl">
                    <div className="longpl_top"> 
                        <span>...? 条长评</span> 
                    </div>

                    <div className="longpl_bottom">
                         <img src={Imgs} alt="."/>
                    </div>
                 </div>
                    {/* 短评论 */}
                <div className="shortPl">
                    <div className="shortPl_top"> 
                        <span>...? 条短评</span> 
                    </div>

                    <div className="shortPl_bottom">
                         
                    </div>
                </div>

             </div>
   )}
}
export default Discuss