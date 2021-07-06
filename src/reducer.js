export const initialState = {
    chapters: [
        {
            title: 'First Chapter',
            isMinimized: false,
            bodies: [
                {
                    content: '',
                    isMinimized: false,
                    subEntries: [
                        
                    ],
                    isSet: false
                    
                
                }
            ]
        }
    ],
    user: '',
    bookTitle: 'New Book'

}

const reducer = (state, action) => {
    switch(action.type){
        case 'DELETE_SUB_BODY':
            let filtered = state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries.filter(section => {
                return section !== state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries[action.item.subEntryIndex]
            })
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries = filtered
        return{
            ...state,
            chapters: [...state.chapters]

        }
        //Parent: NewEntry.js
        case 'MINIMIZE_CHAPTER':
            state.chapters[action.item.chapterIndex].isMinimized = true;
            return{
                ...state,
                chapters: [...state.chapters]

            }
        //Parent: NewEntry.js
        case 'MAXIMIZE_CHAPTER':
            state.chapters[action.item.chapterIndex].isMinimized = false;
            return{
                ...state,
                chapters: [...state.chapters]

            }
        //Parent: EntryBody.js
        case 'MINIMIZE_ENTRY_BODY':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].isMinimized = true;
            return{
                ...state,
                chapters: [...state.chapters]

            }
        //Parent: EntryBody.js
        case 'MAXIMIZE_ENTRY_BODY':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].isMinimized = false;
            return{
                ...state,
                chapters: [...state.chapters]

            }
        //Parent: TestingBody.js
        case 'ADD_NEW_ENTRY':
            state.chapters = [...state.chapters, action.item]
            return{
                ...state,
                chapters: [...state.chapters]
      
            }
        //Parent: NewEntry.js
        case 'ADD_NEW_SECTION':
            state.chapters[action.item.chapterIndex].bodies = [...state.chapters[action.item.chapterIndex].bodies, action.item]
            return{
                ...state,
                chapters: [...state.chapters]
            }
        //Parent: SubEntry.js
        case 'SET_SUB_BODY':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries[action.item.subEntryIndex] = action.item
            //state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries[action.item.subEntryIndex] = [...state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries, action.item]

            return{
                ...state,
                chapters: [...state.chapters]

            }
        //Parent: EntryBody.js
        case 'ADD_SUB_BODY':
            // state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries[action.item.subEntryIndex] = action.item
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].isMinimized = false
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries = [...state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex].subEntries, action.item]
            
            return{
                ...state,
                chapters: [...state.chapters]

            }
        //Parent: EntryBody.js
        case 'SAVE_ENTRY_BODY':
            state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex] = action.item
            return{
                ...state,
                chapters: [...state.chapters]

            }
        case 'SAVE_TITLE':
            return{
                ...state,
                bookTitle: action.item.title
            }
        case 'SAVE_BOOK':
            
            
            state.chapters = action.item.chapters;
            state.bookTitle = action.item.bookTitle;
            console.log(state)
            console.log(state)
            return{
                ...state,
                chapters: action.item.chapters,
                

            }
        
        case 'ADD_CHAPTER':
            return{
                ...state,
                chapters:[...state.chapters, action.item]
            }
        case 'ADD_CHAPTER_TITLE':
            state.chapters[action.item.chapterIndex].title = action.item.title
            //console.log(state)
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