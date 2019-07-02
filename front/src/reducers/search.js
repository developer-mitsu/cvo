import { 
    CHANGE_KEYWORD,
    REQUEST_DOCUMENT, 
    GET_DOCUMENT_SUCCESS, 
    REQUEST_INDEX,
    GET_INDEX_SUCCESS,
    SET_DOCUMENT_TITLE
} from '../actions/search'

const initialState = {
    keyword: '',
    data: '',
    isFetching: false,
    index: {},
    result: []
}
  
export function searchReducer(state = initialState, action){
    switch(action.type) {
    case CHANGE_KEYWORD:
        return {
            ...state,
            keyword: action.keyword,
            result: action.data
        }
    case REQUEST_DOCUMENT:
        return {
            ...state,
            isFetching: true,
            keyword: action.keyword
        }
    case GET_DOCUMENT_SUCCESS:
        return {
            ...state,
            data: action.data,
            isFetching: false
        }
    case REQUEST_INDEX:
        return {
            ...state,
            isFetching: true
        }
    case GET_INDEX_SUCCESS:
        return {
            ...state,
            isFetching: false,
            index: action.index
        }
    case SET_DOCUMENT_TITLE:
        return {
            ...state,
            title: action.title
        }
    default:
        return state
    }
}