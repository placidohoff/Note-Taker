export const initialState = {
    chapters: [
        {
            title: 'First Subject',
            bodies: [
                {
                    title: 'First Body',
                    content: 'afasf afasfas asfasf afas fas afasf'
                
                }
            ]
        }
    ],
    user: '',
    bookTitle: 'New Book'

}

const reducer = (state, action) => {
    switch(action.type){
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
            console.log('DELETE')
            // let filteredChapters = state.chapters.filter(chapter => {
            //     return chapter !== chapter.bodies[action.item.sectionIndex]
            // })
            let filteredSections = state.chapters[action.item.chapterIndex].bodies.filter(section => {
                return section !== state.chapters[action.item.chapterIndex].bodies[action.item.sectionIndex]
            })
            state.chapters[action.item.chapterIndex].bodies = filteredSections
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
        default:
            return state;
    }
}

export default reducer;