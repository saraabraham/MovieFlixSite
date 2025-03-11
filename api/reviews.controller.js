import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
          const movieId = parseInt(req.body.movieId)
          const review = req.body.review
          const user = req.body.user
          console.log('movieid', movieId)
          const reviewResponse = await ReviewsDAO.addReview(
            movieId,
            user,
            review
          )
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }
      static async apiGetReview(req, res, next) {
        try {
          let id = req.params.id || {}
          let review = await ReviewsDAO.getReview(id)
          if (!review) {
            res.status(404).json({ error: "Not found" })
            return
          }
          res.json(review)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
    
      static async apiUpdateReview(req, res, next) {
        try {
          const reviewId = req.params.id
          const review = req.body.review
          const user = req.body.user
    
          const reviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            user,
            review
          )
    
          var { error } = reviewResponse
          if (error) {
            res.status(400).json({ error })
          }
    
          if (reviewResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update review",
            )
          }
    
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }
    
      static async apiDeleteReview(req, res, next) {
        try {
          // Extract reviewId from request parameters
          const reviewId = req.params.id;
  
          // Log the incoming request
          console.log("Received DELETE request for reviewId:", reviewId);
  
          // Validate the review ID
          if (!ObjectId.isValid(reviewId)) {
              res.status(400).json({ error: "Invalid ID format" });
              return;
          }
  
          // Perform the delete operation
          const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
  
          // Handle cases where the review does not exist
          if (!reviewResponse.success) {
              res.status(404).json({ error: "Review not found" });
              return;
          }
  
          // Respond with success
          res.json({ status: "success" });
      } catch (e) {
          // Log and handle the error
          console.error(`Error while deleting review with ID ${reviewId}:`, e);
          res.status(500).json({ error: "An error occurred while deleting the review" });
      }
  }
      
    
      static async apiGetReviews(req, res, next) {
        try {
          let id = req.params.id || {}
          let reviews = await ReviewsDAO.getReviewsByMovieId(id)
          if (!reviews) {
            res.status(404).json({ error: "Not found" })
            return
          }
          res.json(reviews)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
    }