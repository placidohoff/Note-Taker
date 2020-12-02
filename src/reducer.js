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
    newSection: {
        title:'',
        content:''
    }
}

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_CHAPTER':
            return{
                ...state,
                chapters:[...state.chapters, action.item]
            }
        case 'ADD_CHAPTER_TITLE':
            return{
                ...state,
                //chapters:[action.item.entryIndex].title:
            }
        case 'MAKE_SECTION':
            console.log(state)
            state.chapters[action.item.entryIndex].bodies = [...state.chapters[action.item.entryIndex].bodies, action.item]
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
                //chapters: ...state.chapters
            }
        default:
            return state;
    }
}

export default reducer;