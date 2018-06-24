import axios from 'axios';
import config from '../../config';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE,
    FETCH_BOOK_RESULT_GOOGLE,
    ADD_BOOK_TO_LIST,
    FETCH_ALL_BOOKS,
    SUCCESSFUL_REQUEST,
    USER_BOOK_SHELF,
    APPROVE_REQUEST,
    UPDATE_PROFILE,
    GET_ADDRESS,
    RETURN_BOOK

} from './types';

const GOOGLE_BOOKS_KEY = config.api;
const GOOGLE_BOOKS_REQUEST ="https://www.googleapis.com/books/v1/volumes?q=intitle:the+girl+with+&maxResults=1&printType=books&projection=lite&key="+config.api;
//create a search bar component that returns one book with it's details. You have to be signed in to save the book to the database
const ROOT_URL = 'https://still-beyond-77590.herokuapp.com';

export function signinUser({email, password}) {
    //redux thunk is allowing us to return a function from an action creator instead of an action object
    return function(dispatch) {
        //submit email/password to server
        //{ email: email, password: password }
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //if request is good....
                //-update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                //-save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id);
                //-redirect to the route '/'
                browserHistory.push('/');
            })
            .catch(() => {
            //If request is bad...
            //-Show an error to the user
            dispatch(authError('Bad login Info'))
            })
    }  
}

export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
        .then(response => {
            //if request is good....
            //-update state to indicate user is authenticated
            dispatch({type: AUTH_USER});
            //-save the JWT token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            //-redirect to the route '/'
            browserHistory.push('/');
        })
        .catch(e => dispatch(authError(e.response.data.error)));
            
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    browserHistory.push('/signout');
    
    return {type: UNAUTH_USER};
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}

export function fetchBookResult(searchTerm) {
    return function(dispatch) {
        axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:"+searchTerm+"&maxResults=20&printType=books&key="+config.api)
        .then(response => {
            const books = [];
            
            response.data.items.forEach(function(book) {
              
                let bookData = book.volumeInfo;
                
                //need to pass default image here
                if(!bookData.imageLinks) {
                    books.push({
                        
                        title: bookData.title,
                        authors: bookData.authors,
                        publishedDate: bookData.publishedDate,
                        previewLink: bookData.previewLink
                    });
                }
                else {
                    books.push({
                        
                        title: bookData.title,
                        authors: bookData.authors,
                        image: bookData.imageLinks.thumbnail,
                        publishedDate: bookData.publishedDate,
                        previewLink: bookData.previewLink
                    });
                }
               
            })
            dispatch({
                type: FETCH_BOOK_RESULT_GOOGLE,
                payload: books
            })
        })
    }
}

export function saveBookData(bookData) {
    return function(dispatch) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token) {
            browserHistory.push('/signup');
        }
        axios.post(`${ROOT_URL}/save-book`, {bookData, userId}, {
            headers: { authorization: token }})
            .then(response => {
                console.log(response.data['data']);
                dispatch({
                    type: ADD_BOOK_TO_LIST,
                    payload: response.data['data']
                })
            })
    }
}

export function fetchAllBooks() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/all-books`)
            .then((response) => {
                dispatch({
                    type: FETCH_ALL_BOOKS,
                    payload: response.data['data']
                })
            })
    }
}

export function sendBookRequest(bookId) {
    return function(dispatch) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token) {
            browserHistory.push('/signup');
        }
        axios.post(`${ROOT_URL}/make-request`, {bookId, userId}, {
            headers: { authorization: token }})
            .then(response => {
                dispatch({
                    type: SUCCESSFUL_REQUEST,
                    payload: response.data['data']
                })
            })
        }
    }

export function getUserBookShelf() {
    return function(dispatch) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        axios.get(`${ROOT_URL}/user/${userId}`, {
            headers: { authorization: token }})
            .then(response => {
                
                dispatch({
                    type: USER_BOOK_SHELF,
                    payload: response.data['data']
                })
            })
        }
    }
    

    export function approveBookRequest(bookId) {
        return function(dispatch) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            axios.post(`${ROOT_URL}/approve-request`, {bookId, userId}, {
                headers: { authorization: token }})
                .then(response => {
                    dispatch({
                        type: APPROVE_REQUEST,
                        payload: response.data['data']
                    })
                })

        }
    }

    export function updateProfile(stateAndAddress) {
        return function(dispatch) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            axios.post(`${ROOT_URL}/update-profile`, {stateAndAddress, userId}, {
                headers: { authorization: token }})
                .then(response => {
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: response.data['data']
                    })
                })
        }
    }

    export function getUserAddress() {
        return function(dispatch) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            axios.get(`${ROOT_URL}/get-address/${userId}`, {
                headers: { authorization: token }})
                .then(response => {
                    
                    dispatch({
                        type: GET_ADDRESS,
                        payload: response.data['data']
                    })
                })
        }
    }
    
    export function returnBook(bookId) {
        return function(dispatch) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            axios.post(`${ROOT_URL}/return-book`, {bookId, userId}, {
                headers: { authorization: token }})
                .then(response => {
                    dispatch({
                        type: RETURN_BOOK,
                        payload: response.data
                    })
                })

        }
    }