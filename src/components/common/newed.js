import React,{ Component} from 'react'
// import $ from 'jquery';

class Index extends Component{
    state={
        times:'',
        getDay:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    }
    componentDidMount(){
        // console.log(this.props)
        var xq = new Date(this.props.day.substr(0,4) + "-" + this.props.day.substr(4,2) +
        "-" + this.props.day.substr(6,2) ).getDay();
        this.setState({
            times:xq
        })
    }
    
        render(){
            return(
                <div className='newed'>
                    <h2>{this.props.day.substr(4,2) + "月" + this.props.day.substr(6,2) + "日"} {this.state.getDay[this.state.times]}</h2> 
                    {  
                        this.props.item.map(item=>{
                           return (
                               <div key={item.id}>
                                   <div className="newbox clearfix"  onClick={()=>this.props.onNewList(item.id)}
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
export default Index