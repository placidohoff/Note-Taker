export const initialState = {
    chapters: [
        {
            title: 'First Subject',
            bodies: [
                {
                    title: 'First Body',
                    content: '.............'
                    
                
                }
            ]
        }
    ],
    user: '',
    bookTitle: 'New Book'

}

const reducer = (state, action) => {
    switch(action.type){
        case 'SAVE_TITLE':
            return{
                ...state,
                bookTitle: action.item.title
            }
        case 'SAVE_BOOK':
            
            let chaps = action.item.chapters;
            let title = action.item.bookTitle;
            state.chapters = action.item.chapters;
            state.bookTitle = action.item.bookTitle;
            console.log(state)
            console.log(state)
            return{
                
                chapters: action.item.chapters,
                bookTitle: action.item.bookTitle,
                user: action.item.user

            }
        case 'ADD_CHAPTER':
            return{
                ...state,
                chapters:[...state.chapters, action.item]
            }
        case 'ADD_CHAPTER_TITLE':
            state.chapters[action.item.chapterIndex].title = action.item.title
            console.log(state)
            return{
                ...state,
                //chapters:[action.item.entryIndex].title:
                
            }
        case 'MAKE_SECTION':
            //console.log(state)
            console.log(state.chapters[action.item.entryIndex].bodies)
            //if(action.item.entryIndex==0)
            state.chapters[action.item.chapterIndex].bodies = [...state.chapters[action.item.chapterIndex].bodies, action.item]
            //state.chapters[action.item.entryIndex].bodies[action.item.entryIndex] = action.item
            // for(let i = 0; i < state.chapters.length; i++){
            //     console.log('yo')
            // }
            return{
                 ...state,
               // newSection: action.item,
                // chapters: [
                //     {
                //         title: state.chapters[action.item.entryIndex].title,
                //         bodies: [...state.chapters[action.item.entryIndex].bodies, action.item]
                    
                //     }
                // ]
                chapters: [...state.chapters]
            }
        case 'EDIT_SECTION':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex] = action.item
            return{
                ...state,
                chapters: [...state.chapters]

            }
        case 'DELETE_SECTION':
            let filteredSections = state.chapters[action.item.chapterIndex].bodies.filter(section => {
                return section !== state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex]
            })
            state.chapters[action.item.chapterIndex].bodies = filteredSections
            return{
                ...state,
                chapters: [...state.chapters]
            }
        case 'DELETE_CHAPTER':
            let filteredChapters = state.chapters.filter(chapter => {
                return chapter !== state.chapters[action.item.chapterIndex]
            })
            state.chapters = filteredChapters
            return{
                ...state,
                chapters: [...state.chapters]
            }
        case 'SET_USER':
            return{
                ...state,
                user: action.item.user
            }
        case 'LOAD_BOOK':
            return{
                ...state,
                chapters: action.item.chapters,
                bookTitle: action.item.bookTitle
            }
        case 'SIGN_OUT':
            return{
                ...state,
                user: ''
            }
        default:
            return state;
    }
}

export default reducer;