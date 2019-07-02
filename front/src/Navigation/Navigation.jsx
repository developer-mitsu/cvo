import React from 'react'
import styled from 'styled-components'
import tags from '../tags'
import {connect} from 'react-redux'
import Tree from './Tree'

import {GetIndex} from '../actions/search'

import { DirLink, Link } from './links'

const Wrapper = styled.div`
    width: 20%;
    height: calc( 100vh - 50px );
    background-color: #f9f9f9;
    border-right: 1px solid #efefef;
    border-top: 1px solid #efefef;
    padding: 1vw;

    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 50px;
`

class Navigation extends React.Component {
    
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.props.GetIndex()
    }

    componentDidMount () {
        console.log(this.props.index.type)
            
        }

    render() {
        return ( 
            <Wrapper>
                <Tree item = {this.props.index}></Tree>
            </Wrapper>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetIndex: () => {
            dispatch(GetIndex())
        }
    }
}
  


export default connect(state=>({index: state.searchReducer.index, isFetching: state.searchReducer.isFetching}), mapDispatchToProps)(Navigation)