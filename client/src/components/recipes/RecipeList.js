import React from 'react';
import RecipeCard from './RecipeCard'

function RecipeList({recipes}) {


  return (
    <div>
      <h1>Recipe List</h1>
        
      <ul>
        {recipes.map(recipe => {
          return <li><RecipeCard recipe={recipe}/></li>  
        })
        }
      </ul>
    </div>
  );
}

export default RecipeList;