 import React, {useState} from 'react'
 import './NewEntry.css'
 import {TextField} from '@material-ui/core'
 import NewSection from './NewSection.js'

function NewEntry() {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         chapterTitle: '',
    //         isChapterTitleSet: false,
    //         sections: [],
    //         thisChapter: {chapter: 'hggjhgjhgjg', sections:[{title: 'gghjghjgggk', body:'jhgjhgjhgjg'}]}
    //     }
    //     this.makeBody = this.makeBody.bind(this)
    // }

    // const [section]
    const [chapterTitle, setChapterTitle] = useState('')
    const [isChapterTitleSet, setIsChapterTitleSet] = useState(false)
    const [sections, setSections] = useState([])
    const [thisChapter, setThisChapter] = useState({chapter: chapterTitle, sections:[]})

    const makeChapterTitle = (e) => {
        //alert(e.target.value)
        setIsChapterTitleSet(true)
    }

    const makeBody = (e) =>{
        alert('hello')
    }
    
     return(
         <div className="newEntry">
            <div className="newEntry__chapterTitle">
                {
                    isChapterTitleSet
                    ?
                    <div className="newEntry__chapterTitle">
                        <div onClick={e => {setIsChapterTitleSet(false)}}>{chapterTitle}</div>
                    </div>
                    :
                    <form
                    onSubmit={e => {e.preventDefault()}}
                    //className="newEntry__title"
                >
                <input 
                    placeholder="Enter Title"
                    value={chapterTitle}
                    onChange= {e => {setChapterTitle(e.target.value)}} 
                />
                <button
                    type="submit"
                    onClick={makeChapterTitle}
                >
                    Set
                </button>
                </form>
                }
             </div>
            <div>
                {
                    //console.log({thisChapter.sections[0]})
                    thisChapter.sections.map(section => {
                        return(
                        <NewSection
                            title={section.title}
                            body={section.body}
                            makeSection={makeBody}
                            
                        />
                        )
                        
                    })
                }
                <NewSection 
                    title=''
                    body=''
                    makeSection={makeBody}
                />
            </div>
            
         </div>
     )
    
 }

 export default NewEntry;