/**
 * Created by linxuekai on 2017/8/3.
 */
import axios from 'axios'
let instance = axios.create({
  // baseURL: '/api',
  timeout: 1000 * 30,
  withCredentials: true
})

export default instance
