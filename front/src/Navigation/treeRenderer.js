import React from 'react'

import Tree from './Tree'
import styled from 'styled-components'
import './treeIcon.scss'

const TreeUl = styled.ul`
    list-style: none;
    margin: 0;
    padding-inline-start: 1em;
`

const DirLink = styled.div`
    font-size: 0.8rem;
    line-height: 1.8

    &:hover {
        color: darkgray;
        cursor: pointer;
    }
    span {
        margin-left: 10px;
    }
`

const FileLink = styled.div`
    font-size: 0.8rem;
    line-height: 1.5
    &:hover {
        color: darkgray;
        cursor: pointer;
        
    }
`


export function renderFolder( component ) {
    var children  = null;
    if( component.state.children ) {
        children = component.state.children.map( function( item, index ) {
            return ( <li key={index}><Tree item={item} /></li> );
        } );
    }

    var style = component.state.expanded ? {} : { display: 'none' };
    var mark  = component.state.expanded ? 'fas fa-chevron-down' : 'fas fa-chevron-right';
    var icon  = 'icon-folder';
    return (
        <div>
            <DirLink onClick={component.onClick}>
                <i className={mark}></i>
                <i className={icon}></i>
                <span>{component.props.item.name}</span>
            </DirLink>
            <TreeUl style={style}>
                {children}
            </TreeUl>
        </div>
    );
}


export function renderFile( component ) {
    var icon = 'icon-file';
    return (
        <FileLink onClick={component.onClick}>
            <i className={icon}></i>
            <span>{component.props.item.title}</span>
        </FileLink>
    );
}