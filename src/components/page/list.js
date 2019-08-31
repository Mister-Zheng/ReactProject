import React,{ Component } from 'react'
import '../css/list.css' 
import {Icon} from 'antd'
import API from '../../assets/js/api'
// import $ from 'jquery';
class List extends Component {
   state = {
       id:this.props.match.params.id,
       obj:{},
       isColl:false,
   }
   componentDidMount(){
        console.log(this.props)
        this.axios({
            url:API.list+this.state.id,
        }).then(d=>{
            console.log(d);
            this.setState({
                obj:d.data
            },()=>{
                this.refs.body.innerHTML = this.state.obj.body;
            })
        })
   }
   goBack(){
    this.props.history.go(-1)
   }
   collect(id){
    //    $("#top_logo3").css("color","yellow")
      
      var arr = localStorage.getItem('collect')? JSON.parse(localStorage.getItem("collect")):[];
           var isok = arr.some(item=>{
                return item.id == id
            })
            if(isok){
                return
            }else{
                arr.push({
                    id: this.state.obj.id,
                    imges: this.state.obj.image,
                    title: this.state.obj.title,
                    iscoll: this.state.isColl,
                })
                localStorage.setItem('collect',JSON.stringify(arr))
            }
            
     
   }
   render(){
         return(
             <div className='list'>
                 <header>
                    <Icon onClick={()=>this.goBack()} type="arrow-left"className="top_logo1" /> 
                    <div>
                        <span className="top_logo3" ><Icon type="branches" /></span> 
                        <span id="top_logo3" className="top_logo3" onClick={()=>this.collect(this.state.id)}><Icon type="star"  /></span> 
                        <span className="top_logo3"><Icon type="message" />&nbsp; 6</span>
                        <span className="top_logo3"><Icon type="like" />&nbsp; 25</span>
                    </div>
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