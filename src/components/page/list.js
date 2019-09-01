import React,{ Component } from 'react'
import '../css/list.css' 
import {Icon} from 'antd'
import API from '../../assets/js/api'
// import $ from 'jquery';
class List extends Component {
   state = {
       id:this.props.match.params.id,
       obj:{},
       isColl:'',
       pingL:'',
       dianz:'',
   }
   componentDidMount(){
        // console.log(this.props)
        var arrs = JSON.parse(localStorage.getItem("collect"));
        var iscollok = arrs.some(item=>item.id == this.props.match.params.id)
        this.setState({
            isColl:iscollok
        })

        this.axios({
            url:API.list+this.state.id,
        }).then(d=>{
            // console.log(d);
            this.setState({
                obj:d.data
            },()=>{
                this.refs.body.innerHTML = this.state.obj.body;
            })
        })
        this.axios({
            url:API.dianz + this.state.id,
        }).then(d=>{
            //点赞popularity 评论comments
            this.setState({
                pingL:d.data.comments,
                dianz:d.data.popularity
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
       this.props.history.push('/discuss');
   }
   render(){
         return(
             <div className='list'>
                 <header>
                    <Icon onClick={()=>this.goBack()} type="arrow-left"className="top_logo1" /> 
                    
                        <span className="top_logo1" ><Icon type="branches" /></span> 
                        <span className={this.state.isColl?"top_logos":"top_logo"} onClick={()=>this.collect()}><Icon type="star"  /></span> 
                        <span onClick={()=>this.plun()} className="top_logo2"><Icon type="message" />&nbsp; {this.state.pingL}</span>
                        <span className="top_logo3"><Icon type="like" />&nbsp;{this.state.dianz}</span>
                 
                 </header>
                 <div className="imgs">
                 <img className="top_img" src={this.state.obj.image} alt="."/>  
                  <span className="spans">{this.state.obj.title}</span>  
                  <p>{this.state.obj.image_source} </p>
                 </div>

                {this.state.obj.css?<link rel="stylesheet" href={this.state.obj.css[0]}/>:null}

                 <div ref="body" className="texts"></div>
             </div>
   )}
}
export default List