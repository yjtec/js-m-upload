import React,{Component} from 'react';
import { connect } from 'dva';
import { ImagePicker } from 'antd-mobile';
import request from '@yjtec/request';
import {uploadAjax} from './utils';


class UploadImg extends Component {
  constructor(props){
    super(props);
    this.state={
      files: props.initialValue ? props.initialValue : [],
      len:'6',
      multiple: false,
      loading:false
    }
  }

  componentDidMount() {
    this.doChange()
  }


  onChange = (files, type, index) => {
    this.setState({
      loading: true,
      files: files
    })
    const {data, action, headers} = this.props;
    const that = this;
    const lastFile = files.slice(-1);
    const newFileUrl = lastFile[0].url;
    const upFile = lastFile[0].file;
    uploadAjax(action,{file:upFile,...data},headers)
    .then(res=>{      
      const {files} = this.state;
      const [lastFile] = files.slice(-1);
      const newFile = {
        ...lastFile,
        ...res.data
      }
      files[files.length-1] = newFile;
      this.setState({
        files: files,
        loading:false
      },()=>{
        this.doChange();
      });

      //catch
    });
  }

  doChange = () =>{
    const {length, onChange } = this.props;
    if(length === 1){
      onChange(this.state.files[this.state.files.length-1].path);
    }else{
      //
      const items = this.state.files.map(item=>(item.path));
    }
    
  }

  render(){
    const {files, len} = this.state;
    const {onChange,value,data,...rest} = this.props;
    return (
      <ImagePicker
        files={files}
        {...rest}
        onChange={this.onChange}
        // selectable={files.legnth < len}
      />
    )
  }
}
UploadImg.defaultProps = {
  onChange:()=>{},
  initialValue:{},
  action:'/',
  headers:{},
  loading:false,
  length:1
}
export default UploadImg