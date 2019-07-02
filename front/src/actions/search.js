import axios from 'axios'

import marked from 'marked'
import hljs from 'highlightjs'


export const CHANGE_KEYWORD = 'CHANGE_KEYWORD'
export const REQUEST_DOCUMENT = 'REQUEST_DOCUMENT'
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS'
export const REQUEST_INDEX = 'REQUEST_INDEX'
export const GET_INDEX_SUCCESS = 'GET_INDEX_SUCCESS'
export const SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE'

const RequestDocument = () => {
    return {
        type: REQUEST_DOCUMENT,
        keyword: ''
    }
}
const GetDocumentSuccess = (data) => {
    return {
        type: GET_DOCUMENT_SUCCESS,
        data: data
    }
}

const RequestIndex = () => {
    return {
        type: REQUEST_INDEX
    }
}

const GetIndexSuccess = (data) => {
    return {
        type: GET_INDEX_SUCCESS,
        index: data
    }
}

export const SetTitle = (title) => {
    return {
        type: SET_DOCUMENT_TITLE,
        title: title
    }
}

marked.setOptions({
    // code要素にdefaultで付くlangage-を削除
    langPrefix: '',
    // highlightjsを使用したハイライト処理を追加
    highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value
    }
})

const renderer = new marked.Renderer()

renderer.code = function(code, fileInfo, escaped) {   
    var delimiter = ':'
    var info = fileInfo.split(delimiter)
    var lang = info.shift()
    var fileName = info.join(delimiter) // 2つ目以降のdelimiterはファイル名として扱う
    var fileTag = ''
    var UniqueId = uniqueId()

    var copyBtn = '<button class="copyBtn" id="btn-'+UniqueId+'"><i class="far fa-copy"></i></button>'

    if (fileName) {
        fileTag = '<code class="filename">'+fileName+'</code>'
    }
  
    if (this.options.highlight) {
        var out = this.options.highlight(code, lang)
        if (out != null && out !== code) {
            escaped = true
            code = out
        }
    }
  
    if (!lang) {
        return '<div class="code-header">'+fileTag+'</div><pre>'+copyBtn+'<code id="code'+UniqueId+'">'
        + (escaped ? code : escape(code, true))
        + '\n</code></pre>'
    }
  
    return '<div class="code-header">'+fileTag+copyBtn+'</div><pre><code id="code-'+UniqueId+'" class="'
      + this.options.langPrefix
      + escape(lang, true)
      + '">'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>\n'

    function uniqueId(digits) {
        var strong = typeof digits !== 'undefined' ? digits : 1000
        return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16)
    }
  
}

export function GetDocument(url) {
    return dispatch => {
        dispatch(RequestDocument())
        axios.get(`${process.env.PUBLIC_URL}/${url}`).then(res => {
            dispatch(GetDocumentSuccess(marked(res.data, {renderer: renderer})))
        })
    }
}

export function GetIndex() {
    return dispatch => {
        dispatch(RequestIndex())
        axios.get(`${process.env.PUBLIC_URL}/test.json`).then(res =>{
            
            dispatch(GetIndexSuccess(res.data))
        })
    }
}

var result = {type: CHANGE_KEYWORD, data: []}

export function ChangeKeyword(index , keyword) {
    if (keyword === '') {
        result.data = []
        result.keyword = ''
        return result
    }
    const regexp = new RegExp(keyword)
    result.keyword = keyword
    if (index === undefined) {
        return
    } else {
        index.forEach(item => {
            if (item.children) {
                ChangeKeyword(item.children, keyword)
            } else if (item.title.search(regexp) !== -1) {
                let existFlg = false
                for (var i of result.data) {
                    if (i['title'] == item.title){
                        existFlg = true
                    }
                }
                if (!existFlg) {
                    const path = item.parent.match(/public\/(.*)/)[1]+'/'+item.file
                    let record = {
                        title: item.title,
                        path: path
                        // path: item.parent.match(/public\/(.*)/)[1]+'/'+item.file
                    }
                    result.data.push(record)
                }
                
                
            } 
        })
    
        return result    
    }
    
}

