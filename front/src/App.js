import React from 'react'
import Header from './Header/Header'
import Navigation from './Navigation/Navigation'
import DocumentArea from './DocumentArea/DocumentArea'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { ChangeKeyword } from './actions/search'

import styled from 'styled-components'
import firebase from 'firebase'

const DocumentContainer = styled.div`
  display: flex;
`




class App extends React.Component { 

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <DocumentContainer>
          <Navigation></Navigation>
          <DocumentArea></DocumentArea>
        </DocumentContainer>

      </React.Fragment>
    )
  }
}

// function mapStateToProps(state) {
//   return {state};
// }

// function mapDispatchToProps(dispatch) {
// return {
//   ChangeKeyword: (keyword) => { dispatch(ChangeKeyword(keyword)) }
// }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(state=>({index: state.searchReducer.index}))(App)
