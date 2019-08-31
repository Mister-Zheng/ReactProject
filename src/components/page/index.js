import React,{ Component} from 'react'
import '../css/index.css' 
import {Icon,Carousel,} from 'antd'
import Login from '../common/lodin'
import $ from 'jquery';
import moment from 'moment';
import Newed from '../common/newed'
// moment().format('MM-DD')
class Index extends Component {
   state = {
       imgs:[],
       newlist:[],
       login:false,
       newsEd:[],
       isNewsEd:false,
       numm:Number(moment().format('YYYYMMDD'))
   }
   componentDidMount(){
    // console.log();
    this.setState({
        login:true
    })
       this.axios({
           url:'/news/latest',
           method:"get",
       }).then(d=>{
        this.setState({
            login:false
        })
           this.setState({
               imgs : d.data.stories,
               newlist: d.data.top_stories,
           })
       });
    //    滑动到底部时
       $(window).scroll(()=>{
        var doc_height = $(document).height();
        var scroll_top = $(document).scrollTop(); 
        var window_height = $(window).height();
        // 生成日期:moment().format('MM-DD') /08-30
        // var ingTime = Number(moment().format('YYYYMMDD'));
        // var n=0;
        if(scroll_top + window_height >= doc_height){
            var n = 0; n+=1;
            this.axios({
                url:'/news/before/'+ (this.state.numm - n),
                method:'get'
            }).then(d=>{
              console.log(d);
            })
        }
    });
   }
    menu(){
        $("#cbl").css({"left":"0"});
        $("#right").css({"opacity":0.5});
    }
    right(){
        $("#cbl").css("left","-100%");
        $("#right").css({"opacity":0});
    }
    newList(id){

    }
   render(){
         return(
            <div className='index'>
    
                 <header> 
                    <Icon type="menu" className="top_logo1" onClick={()=>this.menu()} />
                    <span>首页</span>
                    <div>   
                    <Icon type="bell" className="top_logo2" />
                    <Icon type="more" className="top_logo3" />
                    </div>
                 </header>

                 <div className="banner">
                 <Carousel autoplay  dots="true">
                    {this.state.newlist.map(item=>{
                        return <div key={item.id} className="bana_text">
                        <img className="ban_img" src={item.image} alt="."/>
                        </div>
                    })}
                </Carousel>
                 </div>
                
                 {this.state.login? <Login></Login>: false}

                 <footer>
                    <h2>今日热文</h2> 
                    {this.state.imgs.map((item,index)=>{
                        return  <div className="newbox clearfix" onChange={()=>this.newList(item.id)} 
                        key={item.id}>
                        <p>{item.title}</p>
                        <div className="newright">
                            <img src={item.images} alt="."/>
                        </div>
                    </div>
                    })}
                   {this.state.newsEd.map(item=>{
                       return <Newed item={item}></Newed>
                   })}
                </footer>

                    

                {/* 侧边栏 */}
                <div id="cbl" className="siabar">
                    <div className="left">
                        <div className="top">
                            <div className="dl">
                            <span className="imgs">
                                <img src="https://pic2.zhimg.com/v2-9ca47bbf75bf1aad37c084128396ad89.jpg" alt="."/>
                            </span>
                            <span className="text">
                                请登录
                            </span>
                            </div>
                            <div className="bottom">
                            <Icon type="heart" className="sc"/><span className="aas">我的收藏</span> 
                            <Icon type="vertical-align-bottom" className="xz" /> <span>离线下载</span>
                            </div>
                        </div>
                        <div className="sy">
                         <Icon type="home" className="shouye" /> 首页
                        </div>
                    </div>
                    <div id="right" className="right" onClick={()=>this.right()}></div>
                </div>
            </div>
   )}
}
export default Index