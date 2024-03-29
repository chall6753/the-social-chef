import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Comment from '../comments/Comment'
import AddComment from '../comments/AddComment'

function RecipeDetail({currentUser, handleDeleteRecipe}) {
  const[recipe,setRecipe]=useState('')
  const[showForm, setShowForm]=useState(0)
  const[comments,setComments]=useState([])
 
  
  let recipeId = useParams().id
  
  useEffect(()=>{
    fetch(`/api/recipes/${recipeId}`)
    .then((res => res.json()))
    .then((data)=> {
      setRecipe(data)
      setComments(data.comments)
    } )
  },[])
  
  function toggleCommentForm(){
    setShowForm(!showForm)
  }
  function handleAddComment(e,comment,rating){
    e.preventDefault()
    console.log(comment)
    fetch('/api/comments',{
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({
        recipe_id: recipe.id,
        comment: comment,
        rating: rating
      }) 
    })
    .then(res=>{
      if(res.ok) {
        res.json().then(res=> setComments([res,...comments]))
        toggleCommentForm() //hides comment form after they submit their comment
        }
        else{
          res.json().then(res=>window.alert(res.comment))
        }
      })
    }

  // delete comment
  function handleDeleteComment(e,commentId){
    e.preventDefault()
    fetch(`/api/comments/${commentId}`,{
      method: 'DELETE',
    })
    .then(res=>{
      if (res.ok){
        setComments(comments.filter(c=> c.id != commentId)) //r.id of type number while recipeId type string 
        
      }
    })
  }

  // Edit comment
  function handleEditComment(e,commentId, updatedComment, updatedRating){
    e.preventDefault()
    fetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        comment: updatedComment,
        rating: updatedRating
      })
    })
    .then(res=> {
      if(res.ok){
        res.json().then(updatedComment => {
          console.log(commentId)
          console.log(updatedComment)
          let filteredComments = comments.filter(c => c.id != commentId)
          setComments([updatedComment,...filteredComments])
        })
      }
    })
  }
  
  
  if(recipe != ''){
    return (
    <div>
      <h1>{recipe.name}</h1>
      <h3>By: {recipe.user.username} </h3>
                <h3>Ingredients</h3>
                    <ul>
                        {recipe.recipe_ingredients.map((ingredient)=>{
                            return <li key={ingredient.id}>{ingredient.quantity + ' ' + ingredient.unit + ' ' + ingredient.ingredient.name}</li>
                        })}
                    </ul>
                <h3>Cooking Instructions</h3>
                <p>{recipe.instructions}</p>
                {recipe.can_modify_recipe? <Button onClick={e=> handleDeleteRecipe(e, recipe.id)}>Delete Recipe</Button>:null}
                <h3>Comments</h3>
                {currentUser != '' ? <button type='button' onClick={toggleCommentForm}>Add Comment</button> : ""}
                {showForm == 1 ? <AddComment handleAddComment={handleAddComment} toggleCommentForm={toggleCommentForm}/>:null}
                       
                <ul>

                  {comments.map((comment) => {
                    
                    return <Comment currentUser={currentUser} comment={comment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment}/>
                  })}
                </ul>
        
    </div>
  );
  }
  else{return <p>loading...</p>}
  
}

export default RecipeDetail;