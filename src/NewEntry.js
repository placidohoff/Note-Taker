 import React, {useState, useEffect} from 'react'
 import './NewEntry.css'
 import {TextField} from '@material-ui/core'
 import NewSection from './NewSection.js'
 import { useStateValue } from './StateProvider.js';


function NewEntry(props) {
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
    const [chapterTitle, setChapterTitle] = useState(props.title)
    const [isChapterTitleSet, setIsChapterTitleSet] = useState(props.isSet)
    const [sections, setSections] = useState(props.sections)
    const [thisChapter, setThisChapter] = useState({chapter: chapterTitle, sections:[]})
    const [makeNewSection, setMakeNewSection] = useState(false)
    const [{chapters}, dispatch] = useStateValue();


    const makeChapterTitle = (e) => {
        //alert(e.target.value)
        setIsChapterTitleSet(true)
        dispatch({
            type: 'ADD_CHAPTER_TITLE',
            item: {
                title: chapterTitle,
                entryIndex: props.entryIndex,
                chapterIndex: props.chapterIndex
            }

        })
    }

    const openNewSection = (e) => {
        setMakeNewSection(true)
    }

    const makeBody = (e) =>{
        alert('hello')
    }

    useEffect(() => {
        console.log(sections)
        setThisChapter(
            {
                chapter: chapterTitle,
                sections: sections
            }
        )
    }, [])
    
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
                    thisChapter.sections.map((section,index) => {
                        //if(section.title !== '' && section.body !== ''){
                            if(section){
                            return(
                            <NewSection
                                isSet={props.isSet}
                                title={section.title}
                                body={section.content}
                                makeSection={makeBody}
                                entryIndex={props.entryIndex}
                                chapterIndex={props.chapterIndex}
                                sectionIndex={index}
                                
                            />
                            )
                            }
                        //}
                        
                    })
                }
                {
                    makeNewSection
                    ?
                <NewSection 
                    isSet={false}
                    title=''
                    body=''
                    makeSection={makeBody}
                    entryIndex={props.entryIndex}
                    chapterIndex={props.chapterIndex}
                    sectionIndex={sections.length}
                /> 
                :
                <></>
                }
            </div>
            <br />
            <button
                onClick={openNewSection}
            >
                Add New
            </button>
            
         </div>
     )
    
 }

 export default NewEntry;