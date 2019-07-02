import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import './markdown.scss'
import './hljs.css'
import { GetDocument } from '../actions/search'
import Loading from '../loading/loading'

import search from './search'

const ContentContainer = styled.div`
    padding: 100px 150px;
    width: 80%;
    box-sizing: border-box;
    float: right;
    margin-left: 20%;
`

const DocumentHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const DocumentTitle = styled.h1`
    font-size: 2em;
`

const OGPBtn = styled.button`
    padding: 10px;
    background-color: #ccb5af;
    border-radius: 50%;
    color: white;
    box-shadow: 0 2px 6px gray;
    border: 0;
    outline: none;
    &:hover {
        cursor: pointer;
        background-color: #e2c0c0;
    }
    &:active {
        box-shadow: 0 0 0 gray;
        transform: translateY(5px);
    }
`

const SearchKeyword = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    span {
        font-weight: normal;
        font-size: 1.2rem;
    }
`

const Link = styled.div`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
        color: darkgray;
    }
`
class DocumentArea extends React.Component {
    componentDidMount() {
        //md取得、パース、描写
        this.props.GetDocument()
    }
    componentDidUpdate() {
        setTimeout(()=>{
            for (var i = 0; i < document.getElementsByClassName('copyBtn').length; i++){
                document.getElementsByClassName('copyBtn')[i].addEventListener('click', function(){
                    const UniqueId =  this.id.split('-')[1]
                    execCopy(document.getElementById('code-'+UniqueId).textContent)
                    console.log(document.getElementById('code-'+UniqueId).textContent)
                })
            }
        }, 1000)
    }
    render() {
        const RenderContent = () => {
            if (this.props.isFetching) { // 取得中はローディング画面を表示
                return(<Loading></Loading>)
            } else if (this.props.keyword) {

                if (this.props.result.length>0) {
                    var dom = []
                    dom.push(<p>検索結果は{this.props.result.length}件です</p>)
                    this.props.result.forEach(element => {
                        dom.push(<Link key={element.title} onClick={()=>{this.props.GetDocument(element.path)}}><span>{element.title}</span></Link>
                        )})
                    return dom
                } else {
                    return <p>検索結果は0件です。</p>
                    
                }
                
            } else {
                return(<div id="markdown" dangerouslySetInnerHTML={{__html: this.props.data}}></div>)
            }
        }

        const RenderHeader = () => {
            if (this.props.keyword) {
                return(
                    <DocumentHeader>
                        <SearchKeyword><span>検索キーワード: </span>{this.props.keyword}</SearchKeyword>
                    </DocumentHeader>
                )
            } else {
                return(
                    <DocumentHeader>
                        <DocumentTitle>{this.props.title}</DocumentTitle>

                    </DocumentHeader>
                )
            }
        }
        

        return (
            
            <ContentContainer>
                {RenderHeader()}
                {RenderContent()}
            </ContentContainer>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetDocument: (url) => {
            dispatch(GetDocument(url))
        }
    }
}




export default connect(state=>({keyword: state.searchReducer.keyword,
    data: state.searchReducer.data,
    isFetching: state.searchReducer.isFetching, 
    title: state.searchReducer.title, 
    index: state.searchReducer.index,
    result: state.searchReducer.result
}), mapDispatchToProps)(DocumentArea)

function execCopy(string){
    var tmp = document.createElement('div')
    var pre = document.createElement('pre')
    pre.style.webkitUserSelect = 'auto'
    pre.style.userSelect = 'auto'
    tmp.appendChild(pre).textContent = string
    var s = tmp.style
    s.position = 'fixed'
    s.right = '200%'
    document.body.appendChild(tmp)
    document.getSelection().selectAllChildren(tmp)
    var result = document.execCommand('copy')
    document.body.removeChild(tmp)
    return result
}


