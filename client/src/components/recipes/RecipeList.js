import React, {useState} from 'react';
import RecipeCard from './RecipeCard'

function RecipeList({recipes}) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  function filterRecipes(e){
      if (e.target.value == ''){
        setFilteredRecipes(recipes)
      } 
      else{
        let r = recipes.filter(recipe => e.target.value.toLowerCase() == recipe.name.toLowerCase())
      
      setFilteredRecipes(r)
      }
      
      
  }
  return (
    <div >
      <h1>Recipe List</h1>
      <label>Search for a recipe</label>
      <input type='text' onChange={filterRecipes}></input>
        
      <ul>
        {filteredRecipes.map(recipe => {
          return <RecipeCard recipe={recipe}/> 
        })
        }
      </ul>
    </div>
  );
}

export default RecipeList;