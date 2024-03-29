class Api::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]
  before_action :authorize, only: [:update, :destroy]
  # GET /comments
  def index
    @comments = Comment.all
    render json: @comments
  end

  # POST /comments
  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    
    
      if @comment.update(comment_params)
      
        render json: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    
      
  end

  # DELETE /comments/1
  def destroy
    
       @comment.destroy
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:recipe_id, :comment, :rating)
    end

    def authorize
      user_can_modify = session[:user_id] == @comment.user_id
      return render json: {error: "not authorized for this action"}, status: :unauthorized unless user_can_modify
    end
   
end
