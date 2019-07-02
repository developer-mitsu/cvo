import React from 'react'
import { render } from 'react-dom'
import DocumentSearch from './DocumentSearch'
import HeaderContent from './HeaderContent'
import styled from 'styled-components'

// Headerの高さを子にお渡ししたい
const HeaderWrapper = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 9999;
`


export default class Header extends React.Component {    

    render() {
        return (
            <HeaderWrapper>
                <DocumentSearch></DocumentSearch>
                <HeaderContent></HeaderContent>
            </HeaderWrapper>
        )
    }
}