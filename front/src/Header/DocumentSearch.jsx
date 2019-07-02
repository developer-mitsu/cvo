import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {ChangeKeyword} from '../actions/search'
import {bindActionCreators} from 'redux'

const Input = styled.input`
    width: 20%;
    height: 50px;
    border: none;
    padding: 0 10px;
    font-size: 10px;
    outline: none;

    box-sizing: border-box;
`

class DocumentSearch extends React.Component {
    
    render() {
        return (
            <Input placeholder="入力して検索" onInput={(e)=>this.onInput(e.target.value)}></Input>
            
        )
    }

    onInput(keyword) {
        this.props.dispatch(ChangeKeyword(this.props.index.children, keyword))
    }
}

export default connect(state=>({keyword: state.searchReducer.keyword, index: state.searchReducer.index}))(DocumentSearch)