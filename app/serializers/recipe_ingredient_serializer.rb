class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :unit, :ingredient
  has_one :recipe
  has_one :ingredient
end
