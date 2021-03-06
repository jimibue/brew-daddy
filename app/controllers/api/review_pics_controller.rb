class Api::ReviewPicsController < ApplicationController
  before_action :set_review
  before_action :set_review_pic, only: [:show, :destroy]

  def show
    
  end

  def index
    render json: @review.review_pics
  end

  def create
    review_pic = @review.review_pics.new
    file = params[:file]

    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        review_pic[:image] = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end

    if review_pic.save
      render json: review_pic
    else
      render json: review_pic.errors, status: 422
    end
  end

  def destroy
    @review_pic.destroy
    render json: "Deleted Successfully"
  end

  private

  def set_review
    @review = Review.find(params[:review_id])
  end
  

  def set_review_pic
    @review_pic = @review.review_pics.find(params[:id])
  end
end
