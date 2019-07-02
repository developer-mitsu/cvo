import React from 'react'
import { renderFolder, renderFile } from './treeRenderer'
import {GetDocument, SetTitle} from '../actions/search'
import {connect} from 'react-redux'

const ITEM_TYPE_FOLDER = 'DIR';
const ITEM_TYPE_FILE = 'FILE';

class Tree extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expanded: false,
            enumerated: false
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        if( this.props.item.type === ITEM_TYPE_FOLDER ) {
            if( !this.state.enumerated ) {
                this.setState( { enumerated: true } );
                this.setState( { children: this.props.item.children } );
            }

            this.setState( { expanded: !this.state.expanded } );
        } else {
            const path = this.props.item.parent.match(/public\/(.*)/)[1]+'/'+this.props.item.file
            this.props.GetDocument(path)
            this.props.SetTitle(this.props.item.title)
        }
    }

    render() {
        return (
            this.props.item.type === ITEM_TYPE_FOLDER ? renderFolder( this ) : renderFile( this )
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      GetDocument: (url) => {
        dispatch(GetDocument(url));
      },
      SetTitle: (title) => {
        dispatch(SetTitle(title));
      }
    }
}

export default connect(state=>({index: state.searchReducer.index, isFetching: state.searchReducer.isFetching}), mapDispatchToProps)(Tree)