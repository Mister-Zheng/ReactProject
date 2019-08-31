import React,{ Component } from 'react'
// import '.css' 
import { Link} from 'react-router-dom'
class Aaa extends Component {
   state = {}
    componentDidMount(){
        console.log(this.props,111)
    }
   render(){
         return(
             <div className='collist'>
                 {this.props.items.map(item=>{
                    return <Link to={"/list/"+ item.id} key={item.title}>
                    <div className="newbox clearfix" 
                           >
                           <p>{item.title}</p>
                           <div className="newright">
                               <img src={item.imges} alt="."/>
                           </div>
                       </div>
                   </Link>
                })}
             </div>
   )}
}
export default Aaa