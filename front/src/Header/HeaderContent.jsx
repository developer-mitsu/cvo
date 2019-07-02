import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 80%;
    height: 50px;
    background-color: #262626;
    position: relative;
`

const UserIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    background-color: white;
`

export default class HeaderContent extends React.Component {
    render() {
        return (
            <Container>
                {/* <UserIcon></UserIcon> */}
            </Container>
        )
    }
}