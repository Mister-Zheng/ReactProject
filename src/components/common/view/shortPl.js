import React,{ Component } from 'react'
// import '.css' 
import moment from "moment"
import {Icon} from 'antd'
class Aaa extends Component {
   state = {}

   render(){
         return(
            <div className='isLongPl'>
            <div className="lpleft">
                <img src={this.props.items.avatar} alt='.'/>
            </div>
            <div className="lpright">
                <h2>{this.props.items.author}</h2>
                <p>{this.props.items.content}</p>
                <span>{moment.unix(this.props.items.time).format('MM-DD HH:mm')}</span>
                <strong><Icon type="like" />&nbsp;{this.props.items.likes}</strong>
            </div>
        </div>
   )}
}
export default Aaa