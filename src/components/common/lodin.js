import React  from 'react'
import {Spin, Alert } from 'antd'
import './login.css'
function Login(){
    return (
    <div className="login">
        <div className="example">
            <Spin tip="加载中..." size="large">
                
            </Spin>
        </div>
    </div>
    )
}
export default Login