import React from 'react'
import FileUpload from './react-fileupload.jsx'

class FileUpLoader extends React.Component {
  render() {
    const options = {
      baseUrl: '/manage/product/upload.do',
      fileFieldName: 'upload_file',
      chooseAndUpload: true,
      dataType: 'json',
      uploadSuccess: (res) => {
        this.props.onSuccess(res.data)
      },
      uploadError: (error) => {
        this.props.onError(error.message || '上传图片出错了')
      },
    }
    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload" className="btn btn-primary">选择图片</button>
      </FileUpload>
    )
  }
}
export default FileUpLoader