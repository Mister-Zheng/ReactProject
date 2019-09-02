import React,{ Component } from 'react'
import '../css/discuss.css' 
import {Icon} from 'antd'
import Login from '../common/lodin'
import API from '../../assets/js/api'
import Imgs from '../common/img/shafa.png'
// import moment from 'moment';
import ShortPl from '../common/view/shortPl'
import Longpl from '../common/view/longPl'
class Discuss extends Component {
   state = {
       longPl:[],  //长评论数组
       longlens:'', //长评论数量
       shortPl:[], //短评论数组
       login:false,
   }
    goBack(){
        this.props.history.go(-1) 
    }
    componentDidMount(){
        // console.log(this.props.match.params.id)
        this.setState({
            login:true
        })
        this.axios({
            url:API.longpl + this.props.match.params.id + "/long-comments"
        }).then(d=>{
            // console.log(d);
            // moment.unix(d.data.comments[0].time).format('MM-DD HH:mm')
           // eslint-disable-next-line react/no-direct-mutation-state
           this.setState({
            login:false
        })
           var lengths = d.data.comments.length;
           this.setState({
            longPl : d.data.comments,
            longlens:lengths
           })
        //    console.log(this.state.longPl)
        })
    }
    // 短评论请求
    shortPl(){
        this.setState({
            login:true
        })
        this.axios({
            url:API.longpl + this.props.match.params.id + "/short-comments"
        }).then(d=>{
            console.log(d,"短评论");
            this.setState({
                shortPl:d.data.comments,
                login:false
            })
        })
    }
   render(){
         return(
             <div className='discuss'>
                 <header>
                    <Icon type="left" className="top_logo1" onClick={()=>this.goBack()} /> 
                    <span>{this.props.match.params.comments} 条点评</span>
                    <div>   
                    <Icon type="form" className="top_logo3"/>   
                    </div>
                 </header>
                    {/* 长评论 */}
                 <div className="longpl">
                    <div className="longpl_top"> 
                        <span>{this.state.longlens} 条长评</span> 
                    </div>
                    {this.state.longPl.map(item=>{
                        return <Longpl items={item} key={item.id}></Longpl>
                    })}
            
                    {/* 沙发图片 */}
                    {this.state.longlens?null:<div className="longpl_bottom"><img src={Imgs} alt="."/></div>}
                 </div>
                    {/* 短评论 */}
                <div className="shortPl">
                     <div className="shortPl_top"> 
                     <span>{this.state.shortlens}{Number(this.props.match.params.comments) - Number(this.state.longlens)} 条短评</span>
                     <i onClick={()=>this.shortPl()}><Icon type="up" /></i> 
                </div>
                {/* 加载中 */}
                {this.state.login? <Login></Login>: null}

                {this.state.shortPl.map(item=>{
                    return <ShortPl items={item} key={item.id}></ShortPl>
                })}
                </div>
                    {/* 长短评论 */}
                {/* {this.state.longPl.map(item=>{
                   return  <div className='isLongPl' key={item.id}>
                   <div className="lpleft">
                       <img src={item.avatar} alt='.'/>
                   </div>
                   <div className="lpright">
                       <h2>{item.author}</h2>
                       <p>{item.content}</p>
                       <span>{moment.unix(item.time).format('MM-DD HH:mm')}</span>
                       <strong><Icon type="like" />&nbsp;{item.likes}</strong>
                   </div>
               </div>
                 })} */}
                    {/* {this.state.shortPl.map(item=>{
                   return  <div className='isLongPl' key={item.id}>
                   <div className="lpleft">
                       <img src={item.avatar} alt='.'/>
                   </div>
                   <div className="lpright">
                       <h2>{item.author}</h2>
                       <p>{item.content}</p>
                       <span>{moment.unix(item.time).format('MM-DD HH:mm')}</span>
                       <strong><Icon type="like" />&nbsp;{item.likes}</strong>
                   </div>
               </div>
                 })} */}
             </div>
   )}
}
export default Discuss