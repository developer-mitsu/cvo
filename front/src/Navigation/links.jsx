import React from 'react'
import styled from 'styled-components'

const DirLinkStyle = styled.div`
    color: black;
    cursor: pointer;
`

const FileLinkStyle = styled.div`
`

export class DirLink extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activeFlg: false 
        }
    }
    render() {
        const dirName = this.props.dirName
        return (
            <DirLinkStyle id={dirName} key={this.props.dirName} onClick={()=>{this.setState({activeFlg: !this.state.activeFlg})}}>
                {dirName}
                {this.state.activeFlg?this.props.mkDom(this.props.item):false}
            </DirLinkStyle>
        )
    }
}

// export default connect(state=>{index: state.searchReducer.index})(Navigation)


export class Link extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <FileLinkStyle>{this.props.title}</FileLinkStyle>
        )
    }
}