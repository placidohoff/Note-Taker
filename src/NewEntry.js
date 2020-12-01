 import React, {useState} from 'react'
 import './NewEntry.css'
 import {TextField} from '@material-ui/core'
 import NewSection from './NewSection.js'

 class NewEntry extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chapterTitle: '',
            isChapterTitleSet: false,
            sections: [],
            thisChapter: {chapter: 'hggjhgjhgjg', sections:[{title: 'gghjghjgggk', body:'jhgjhgjhgjg'}]}
        }
        this.makeBody = this.makeBody.bind(this)
    }

    // const [section]

    makeChapterTitle = (e) => {
        //alert(e.target.value)
        this.setState({isChapterTitleSet:true})
    }

    makeBody(e){
        alert('hello')
    }
    render(){
     return(
         <div className="newEntry">
            <div className="newEntry__chapterTitle">
                {
                    this.state.isChapterTitleSet
                    ?
                    <div className="newEntry__chapterTitle">
                        <div onClick={e => {this.setState({isChapterTitleSet:false})}}>{this.state.chapterTitle}</div>
                    </div>
                    :
                    <form
                    onSubmit={e => {e.preventDefault()}}
                    //className="newEntry__title"
                >
                <input 
                    placeholder="Enter Title"
                    value={this.state.chapterTitle}
                    onChange= {e => {{this.setState({chapterTitle: e.target.value})}} }
                />
                <button
                    type="submit"
                    onClick={this.makeChapterTitle}
                >
                    Set
                </button>
                </form>
                }
             </div>
            <div>
                {
                    this.state.thisChapter.sections.map(section => {
                        return<NewSection
                            title={section.title}
                            body={section.body}
                            makeSection={this.makeBody}
                        />
                    })
                }
                <NewSection 
                    title='jhjkhk'
                    body='hkkhkh'
                    makeSection={this.makeBody}
                />
            </div>
            
         </div>
     )
    }
 }

 export default NewEntry;