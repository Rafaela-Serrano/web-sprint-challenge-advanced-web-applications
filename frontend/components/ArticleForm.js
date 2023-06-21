import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import axios from 'axios'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {

  const [values, setValues] = useState(initialFormValues)

  // ✨ where are my props? Destructure them here
  const {postArticle, updateArticle, deleteArticle, setCurrentArticleId, currentArticleId, currentArticle} = props ; 

 

  useEffect( (e) => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    if(currentArticle !== undefined ){
      setValues({...values,
        title:currentArticle.title,
        text:currentArticle.text,
        topic:currentArticle.topic})
  } 
   else ( 
    setValues({title:'', text:'', topic:''})
    )

}, [currentArticle] )

  const onChange = (evt) => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value }) } 

  

  const onSubmit = evt => {

    evt.preventDefault()
    
    if (currentArticle !== undefined ) {
      updateArticle({article_id:currentArticle.article_id,article:currentArticle})
      setValues({title:'', text:'', topic:''})
      console.log("I'm currentArticle inside onSubmit", currentArticle)
      console.log("I'm values inside onSubmit", values)
    } else {
      postArticle(values)  
      setValues({title:'', text:'', topic:''})
    }
      
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
  }

  const isDisabled = () => {
    // ✨ implement
    if( currentArticle !== undefined ) 
    { return false } 
    else if (currentArticle === undefined)
    { return false }
    else return true 

  }

  const cancelFunction = () => {
    setValues({title:'', text:'', topic:''})
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      { props.currentArticle === undefined ? <h2>Create Article</h2> : <h2>Edit Article</h2> }
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        name="title"
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        name="text"
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" name="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>

      { currentArticle === undefined ? 
        <div className="button-group">
           <button disabled={isDisabled()} id="submitArticle" >Submit</button>
        </div> 
        : 
       <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={cancelFunction}>Cancel edit</button>
       </div> 
      }

    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
