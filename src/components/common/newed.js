import React,{ Component} from 'react'
// import $ from 'jquery';
import {withRouter} from 'react-router-dom'

class Index extends Component{
    state={
        times:'',
        getDay:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
        day:this.props.day,

        startY:0,
        endY:0,
    }
    componentDidMount(){
        // console.log(this.props)
        var xq = new Date(this.props.day.substr(0,4) + "-" + this.props.day.substr(4,2) +
        "-" + this.props.day.substr(6,2) ).getDay();
        this.setState({
            times:xq
        })
    }
    start(e){
        this.setState({
            startY:e.touches[0].clientY,
            endY:0
        })
    }
    move(e){
        this.setState({
            endY:e.touches[0].clientY,
        })
    }
    newList(id){
        if(this.state.endY == 0){ //点击
            this.props.history.push('/list/'+id);
        }else{ //滑动
            return 
        }
    }
        render(){
            return(
                <div className='newed'>
                    <h2>{this.state.day.substr(4,2) + "月" + this.state.day.substr(6,2) + "日"} {this.state.getDay[this.state.times]}</h2> 
                    {  
                        this.props.item.map(item=>{
                           return (
                               <div key={item.id}>
                                   <div className="newbox clearfix" 
                                   onTouchStart={(e)=>this.start(e)}
                                   onTouchMove={(e)=>this.move(e)}
                                     onTouchEnd={()=>this.newList(item.id)}
                                   >
                                       <p>{item.title}</p>
                                       <div className="newright">
                                           <img src={item.images} alt="."/>
                                       </div>
                                   </div>
                               </div>
                           )
                        })
                       
                    }
                </div>
            )
        }
}
export default withRouter(Index)