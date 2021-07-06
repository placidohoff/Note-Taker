import React, {useState, useEffect} from 'react'
import './NewEntry.css'
import {TextField, Button} from '@material-ui/core'
import NewSection from './NewSection.js'
import { useStateValue } from './StateProvider.js';
import EntryBody from './EntryBody.js'


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
   const [isChapterTitleSet, setIsChapterTitleSet] = useState(true)
   const [sections, setSections] = useState(props.sections)
   const [thisChapter, setThisChapter] = useState({chapter: chapterTitle, sections:[]})
   const [makeNewSection, setMakeNewSection] = useState(false)
   const [{chapters}, dispatch] = useStateValue();
   const [isMinimized, setIsMinimized] = useState(props.isMinimized)
   const [subEntries, setSubEntries] = useState(props.content.subEntries)

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


   const makeNewEntry = (e) => {
       dispatch({
           type: 'ADD_NEW_SECTION',
           item:{
               chapterIndex: props.chapterIndex,
               content: '',
                
               isMinimized: false,
               isSet: false, 
               subEntries: [
                    
                ]
                
            
            
           }
       }) 
   }

   const maximize = (e) => {
        dispatch({
            type: 'MAXIMIZE_CHAPTER',
            item: {
                chapterIndex: props.chapterIndex
            }
        }) 
 
   }

   const minimize = (e) => {
        dispatch({
            type: 'MINIMIZE_CHAPTER',
            item: {
                chapterIndex: props.chapterIndex
            }
        }) 
   }

   useEffect(() => {
       //console.log(sections)
       setThisChapter(
           {
               chapter: chapterTitle,
               sections: sections
           }
       )
       setIsChapterTitleSet(true)
   }, [])
   
    return(
        <div className="newEntry">
           <div className="newEntry__chapterTitleContainer">
               {
                   isChapterTitleSet
                   ?
                   <div className="newEntry__chapterTitle"
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                        // flexGrow: '1',
                        // backgroundColor: 'red'
                    }}
                   >
                       <div onClick={e => {setIsChapterTitleSet(false)}}
                            style={{
                                flexGrow: '1'
                            }}
                       >
                           {chapterTitle}
                        </div>
                        <div
                            style={{
                                display:'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <div className="newEntry__minimizeButton"
                                    onClick={minimize}
                            >
                                &minus;
                            </div>
                            <div className="newEntry__maximizeButton"
                                    onClick={maximize}
                                    style={{marginTop: '1px', fontSize: 'small', fontWeight: '900'}}
                            >
                                &#x1f5d6;
                            </div>
                            <div className="newEntry__maximizeButton"
                            onClick={e => {
                                dispatch({
                                    type: 'DELETE_CHAPTER',
                                    item:{
                                        chapterIndex: props.chapterIndex
                                    }
                                })
                            }}
                            style={{
                                marginTop: '2px',
                                fontWeight: 'bold'
                            }}
                       >
                           X
                       </div>
                        </div>
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
                            className="newEntry__titleInputBox"
                        />
                        <button
                            type="submit"
                            onClick={makeChapterTitle}
                            className="newEntry__titleSetButton"
                        >
                            Set
                        </button>
               </form>
               }
            </div>
           <div>
               {
                   isMinimized 
                   ?
                    <div
                        style={{
                            marginLeft: '85px'
                        }}
                    >
                        . . .<br/>. . .<br/>
                    </div>
                   :
                   //console.log({thisChapter.sections[0]})
                   sections.map((section,index) => {
                    //if(section.title !== '' && section.body !== ''){
                        
                        if(section){
                            if(!props.isTesting){
                                return(
                                
                                    <NewSection
                                        isSet={section.isSet}
                                        title={section.title}
                                        body={section.content}
                                        //makeSection={makeBody}
                                        entryIndex={props.entryIndex}
                                        chapterIndex={props.chapterIndex}
                                        sectionIndex={index}
                                        key={Math.random()}  
                                        
                                    />
                                )
                            }
                            else{
                                return(
                                
                                    <EntryBody
                                        isSet={section.isSet}
                                        //title={section.title}
                                        //body={section.content}
                                        //makeSection={makeBody}
                                        // entryIndex={props.entryIndex}
                                        chapterIndex={props.chapterIndex}
                                        sectionIndex={index}
                                        key={Math.random()}
                                        content={section.content}
                                        subEntries={section.subEntries}
                                        isMinimized={section.isMinimized}
                                    />
                                )
                            }
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
                   //makeSection={makeBody}
                   entryIndex={props.entryIndex}
                   chapterIndex={props.chapterIndex}
                   sectionIndex={sections.length}
               /> 
               :
               <></>
               }
           </div>
           <br />
           {
               isMinimized
               ?
                <></>
                :
                // <>
                // <Button
                //     onClick={openNewSection}
                //     style={{
                //         marginLeft: '50px',
                //         fontSize:'30px'
                //         // float: 'left'
                //         // width: 'px'
                //     }}
                //     className="newEntry__addNewButton"
                //     color="primary"
                //     variant="outlined"
                //     size="small"
                    
                // >
                //     	&#65291;
                // </Button>
                <button
                // onClick={openNewSection}
                onClick={makeNewEntry}
                style={{
                    marginLeft: '20px',
                    marginTop: '15px'
                    // float: 'left'
                    // width: 'px'
                }}
                className="newEntry__addNewButton"
                >
                    add new
                </button>
                
            }
           
        </div>
    )
   
}

export default NewEntry;