import React from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'

class RichEditor extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount () {
    this.loadEditor()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      this.simditor.setValue(nextProps.defaultDetail) 
    }
  }
  // 加载富文本编辑器
  loadEditor () {
    let element = this.refs['textarea']
    this.simditor = new Simditor({
      textarea: $(element),
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      },
      defaultValue: this.props.placehold || '请输入内容'
    })
    this.bindEditorEvent()
  }
  // 初始化富文本编辑器
  bindEditorEvent () {
    this.simditor.on('valuechanged', e => {
      this.props.onValueChange(this.simditor.getValue())
    })
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default RichEditor