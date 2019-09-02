import React,{ Component } from 'react'
import '../css/list.css' 
import {Icon} from 'antd'
import API from '../../assets/js/api'
import Login from '../common/lodin'
// import $ from 'jquery';
class List extends Component {
   state = {
       id:this.props.match.params.id,
       obj:{},
       isColl:'', 
       pingL:'',  //评论
       dianz:'', //点赞数量
       shortComments:'', //短评论数量
       login:false, //加载中效果
   }
   componentDidMount(){
        // console.log(this.props)
        this.setState({
            login:true
        })
        var arrs = JSON.parse(localStorage.getItem("collect"));
        var iscollok = arrs.some(item=>item.id + "" === this.props.match.params.id)
        this.setState({
            isColl:iscollok
        })
        
        this.axios({
            url:API.list+this.state.id,
        }).then(d=>{
            // console.log(d);
            this.setState({
                obj:d.data,
                login:false
            },()=>{
                this.refs.body.innerHTML = this.state.obj.body;
            })
        })
        this.axios({
            url:API.dianz + this.state.id,
        }).then(d=>{
            //点赞popularity 评论comments
            this.setState({
                pingL : d.data.comments,
                dianz : d.data.popularity,
                shortComments : d.data.comments,
            })
        })
   }
   goBack(){
    this.props.history.go(-1)
   }
   collect(){
         //创建收藏数组
      var arr = localStorage.getItem('collect')?JSON.parse(localStorage.getItem("collect")):[];
           //是否被收藏过
        var iscoll = arr.some(item=>{
            return item.id == this.state.obj.id
        })
        if(iscoll){ //已收藏
            this.setState({
                isColl:false
            })
            //返回收藏的下标
            var idx = arr.findIndex(item=>item.id == this.state.obj.id)
            //设置该元素选中的类名
            
            //删除已收藏的元素
            arr.splice(idx,1)
            localStorage.setItem('collect',JSON.stringify(arr))

        }else{//未收藏
            this.setState({
                isColl: true,
            },()=>{
                arr.push({
                    id: this.state.obj.id,
                    imges: this.state.obj.image,
                    title: this.state.obj.title,
                    iscoll: true,
                })
                localStorage.setItem('collect',JSON.stringify(arr))
            })
        }     
   }
   plun(){
       this.props.history.push('/discuss/'+this.state.id+"/"+this.state.shortComments);
   }
   render(){
         return(
             <div className='list'>
                 <div className="header">
                    <Icon onClick={()=>this.goBack()} type="arrow-left"className="top_logo1" /> 
                    <div>
                        <Icon className="logo1" type="branches" />
                        <Icon className={this.state.isColl?"top_logos":"top_logo"} onClick={()=>this.collect()} type="star"  />
                        <Icon onClick={()=>this.plun()} className="logo2" type="message" /> {this.state.pingL}
                        <Icon type="like" className="logo3" />{this.state.dianz}
                    </div>
                 
                 </div>
                 <div className="imgs">
                 <img className="top_img" src={this.state.obj.image} alt="."/>  
                  <span className="spans">{this.state.obj.title}</span>  
                  <p>{this.state.obj.image_source} </p>
                 </div>
                {/* 加载中 */}
                {this.state.login? <Login></Login>: null}
                {this.state.obj.css?<link rel="stylesheet" href={this.state.obj.css[0]}/>:null}

                 <div ref="body" className="texts"></div>
             </div>
   )}
}
export default List