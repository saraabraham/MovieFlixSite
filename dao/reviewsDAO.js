import mongodb from "mongodb"
// Id from mongoDb is the ObjectID
import { ObjectId } from "mongodb";
// No need to redefine; you can directly use ObjectId


let reviews

export default class ReviewsDAO {
  //Since its static , no instantiation required
  static async injectDB(conn) {
    if (reviews) { //Checks for existing connection
      return
    }
    try {
      reviews = await conn.db("reviews").collection("reviews") 
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      }
      console.log("adding")
      return await reviews.insertOne(reviewDoc) //InsertOne is a mongoDB command for insertion
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      if (!ObjectId.isValid(reviewId)) {
        return { error: 'Invalid ID format' };  // Early validation of the ID format
      }
  
      const review = await reviews.findOne({ _id: new ObjectId(reviewId) });
  
      if (!review) {
        return { error: 'Review not found' };  // Handle case where review is not found
      }
  
      return review;  // Return the found review
    } catch (e) {
      console.error(`Unable to get review for ID ${reviewId}:`, e);  // Log the full error
      return { error: 'An error occurred while fetching the review' };
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId) {

    try {
      // Validate the ID format
      if (!ObjectId.isValid(reviewId)) {
          return { error: "Invalid ID format" };
      }

      // Attempt to delete the review
      const deleteResponse = await reviews.deleteOne({ _id: new ObjectId(reviewId) });

      // Handle cases where no review was deleted
      if (deleteResponse.deletedCount === 0) {
          return { error: "Review not found" };
      }

      return { success: true }; // Indicate a successful deletion
  } catch (e) {
      console.error(`Unable to delete review with ID ${reviewId}:`, e);
      return { error: "An error occurred while deleting the review" };
  }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

}