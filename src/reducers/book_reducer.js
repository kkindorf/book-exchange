import {
   FETCH_ALL_BOOKS,
   FETCH_BOOK_RESULT_GOOGLE,
   ADD_BOOK_TO_LIST,
   SUCCESSFUL_REQUEST,
   USER_BOOK_SHELF,
   APPROVE_REQUEST,
   RETURN_BOOK
} from '../actions/types';
export default function(state = {books: [], loadingBook: true, allBooksList: [], bookShelfLoaded: false, userBookShelf: [], userTradeRequests: [], requestorData: {email: ""}, bookSaveError: ""}, action) {
    switch(action.type){
        case FETCH_ALL_BOOKS:
            return {...state, books: [], allBooksList: action.payload, loadingBook: false}
        case FETCH_BOOK_RESULT_GOOGLE:
        console.log(action.payload); 
            return {...state, books: action.payload, loadingBook: false};
        case ADD_BOOK_TO_LIST:
            if(typeof action.payload === "string") {
                return {...state, bookSaveError: action.payload}
            }
            return {...state, allBooksList:[...state.allBooksList, action.payload]};
        case SUCCESSFUL_REQUEST:
                
                let updatedBookList = state.allBooksList.map((book) => {
                    //use this function to always check if book is a valid request and not being requested by owner
                    if(book._id !== action.payload._id) {
                        return book;
                    }
                    else {
                       if(action.payload.tradeRequested == false && !action.payload.badRequest) {
                            book.errorMessage = "You cannot request a book you already own";
                        }
                        else if(action.payload.badRequest) {
                            book.errorMessage = action.payload.badRequest;
                        }
                        else if(action.payload.tradeRequested === true) {
                            book.tradeRequested = action.payload.tradeRequested;
                        }
                        return book;
                    }
                })
                return {...state, allBooksList: updatedBookList};
            
            
            
        case USER_BOOK_SHELF: 
        return {...state, books: [], userBookShelf: action.payload['ownedBooks'], userTradeRequests: action.payload['myTradeRequests'], tradeRequestsFromOther: action.payload['tradeRequestsFromOther'], bookShelfLoaded: true};

        case APPROVE_REQUEST:
        let updatedOwnerBookList = state.userBookShelf.map((book) => {
            if(book._id === action.payload._id) {
                book.tradeAccepted = action.payload.tradeAccepted;
                return book;
            }
            else {
                return book;
            }

        })
        let updatedUserTradeRequests = state.userTradeRequests.map((book) => {
            if(book._id === action.payload._id) {
                book = action.payload;
                return book;
            }
            else {
                return book;
            } 
        })

        let updatedAllBooksList = state.allBooksList.map((book) => {
            if(book._id === action.payload) {
                book = action.payload;
                return book;
            }
            else {
                return book;
            }
        })



        return {...state, allBooksList: updatedAllBooksList, userTradeRequests: updatedUserTradeRequests, userBookShelf: updatedOwnerBookList};

        case RETURN_BOOK:
            let updatedRequests = state.userTradeRequests.map((book) => {
                if(book._id === action.payload.returnedBook._id) {
                    book = action.payload.returnedBook;
                    return book;
                }
                else {
                    return book;
                }
            })

            let updatedBooksList = state.allBooksList.map((book) => {
                if(book._id == action.payload.returnedBook._id) {
                    book = action.payload.returnedBook._id;
                    return book;
                }
                else {
                    return book;
                }
            })


            return {...state, allBooksList: updatedBooksList, userTradeRequests: updatedRequests};

        
    }

    return state;
}