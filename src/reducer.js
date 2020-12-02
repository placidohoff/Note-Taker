export const initialState = {
    // chapters: [
    //     {
    //         title: '',
    //         sections: [
    //             {
    //                 title: '',
    //                 body: ''
    //             }
    //         ]
    //     }
    // ]
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
        

    ]
}

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_CHAPTER':
            return{
                ...state,
                chapters:[...state.chapters, action.item]
            }
        default:
            return state;
    }
}

export default reducer;