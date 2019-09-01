import React,{ Component} from 'react'
import '../css/index.css' 
import {Icon,Carousel,} from 'antd'
import Login from '../common/lodin'
import $ from 'jquery';
import moment from 'moment';
import Newed from '../common/newed'
import { Link} from 'react-router-dom'
// moment().format('YYYYMMDD')
class Index extends Component {
    menu(){
        $("#cbl").css({"left":"0"});
        $("#right").css({"opacity":0.5});
    }
    right(){
        $("#cbl").css("left","-100%");
        $("#right").css({"opacity":0});
    }
    newList(id){
        this.props.history.push('/list/'+id);
    }
   state = {
       imgs:[], //轮播图片
       newlist:[], //首页新闻列表
       login:false, //登录显示
       newsEd:[], //新闻
       isNewsEd:false, //是否显示加载
       day:moment().format('YYYYMMDD'), //日期
    //    numm:Number(moment().format('YYYYMMDD')) 
   } 
   componentWillUnmount(){
    this.source.cancel('1234')
   }
   componentDidMount(){
    let CancelToken = this.axios.CancelToken;
    this.source = CancelToken.source();
    this.setState({
        login:true
    })
       this.axios({
           url:'/news/latest',
           method:"get",
           cancelToken: this.source.token
       }).then(d=>{
        //    console.log(d);
        this.setState({
            login:false
        })
           this.setState({
               imgs : d.data.stories,
               newlist: d.data.top_stories,
               day:d.data.date,
           })
       });

    //    滑动到底部时
       $(window).scroll(()=>{
        var doc_height = $(document).height();
        var scroll_top = $(document).scrollTop(); 
        var window_height = $(window).height();

        if(scroll_top + window_height >= doc_height){
            this.axios({
                url:'/news/before/'+ this.state.day,
                method:'get',
                cancelToken: this.source.token
            }).then(d=>{
             var ned = this.state.newsEd;
             ned.push(d.data.stories)
             this.setState({
                newsEd:ned,
                day:d.data.date
             })
            //  console.log(this.state.newsEd)
            })
        }
    });
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
                        return <div key={item.id}  className="bana_text">
                        <img className="ban_img" src={item.image} alt="."/>
                        </div>
                    })}
                </Carousel>
                 </div>
                
                 {this.state.login? <Login></Login>: false}

                 <footer>
                    <h2>今日热文</h2> 
                    {this.state.imgs.map(item=>{
                        return <Link to={"/list/"+item.id} key={item.id}>
                         <div className="newbox clearfix" onClick={()=>this.newList(item.id)}
                        >
                        <p>{item.title}</p>
                        <div className="newright">
                            <img src={item.images} alt="."/>
                        </div>
                    </div>
                    </Link>
                    })}
                   {this.state.newsEd.map((item,index)=>{
                       return <Newed key={index} day={this.state.day} item={item} onNewList={(e)=>this.newList(e)}></Newed>
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
                            <Link to="/coll"><Icon type="heart" className="sc"/><span  className="aas">我的收藏</span></Link> 
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