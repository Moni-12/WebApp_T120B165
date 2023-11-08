import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Book } from "../Models/Book";
import { Review } from "../Models/Review";

const OneBookPage: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const accessToken = localStorage.getItem('authJwt');
  const currentUserId = localStorage.getItem('userId');
  const currentUsername = localStorage.getItem('userTitle');
  const userRolesJson = localStorage.getItem('roles');
  const isAdmin = userRolesJson?.includes('Admin');

  const { authorid, bookid } = useParams<{ authorid: string; bookid: string }>();

  const [book, setBook] = useState<Book>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editableReviewId, setEditableReviewId] = useState<number | null>(null);

  const fetchBook = async () => {
    try {
      const responseBook = await axios.get<Book>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}`);
      setBook(responseBook.data);
    } catch (error) {
      window.location.href = '/notfound';
    }
  };

  const fetchReviews = async () => {
    try {
      const responseReviews = await axios.get<Review[]>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}/reviews`);
      setReviews(responseReviews.data);
      console.log(responseReviews.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, []);
  
  const submitReview = async () => {
    try {
      const response = await axios.post(
        `https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}/reviews`,
        { Content: userReview },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
          },
        }
      );
      setUserReview("");
      let review = response.data;
      review.userId = currentUserId;
      review.userName = currentUsername;
      console.log('Review created:', review);
      setReviews((prevReviews) => [...prevReviews, review]); // Handle response data here
    } catch (error) {
      console.error('Error creating review:', error); // Handle error here
    }
  };

  const handleEditClick = (initialReview: Review) => {
    setEditedContent(initialReview.content);
    setEditableReviewId(initialReview.id);
    setIsEditing(true);
  };

  const handleSaveUpdate = async (review : Review) => {
    // Save logic here
    try {
      const response = await axios.put(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}/reviews/${review.id}`, 
        { Content: editedContent },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
          },
        },
      );
      updateReviewContent(review.id, editedContent);

      // Handle the response if necessary
      console.log('Review updated successfully:', response.data);
      setEditableReviewId(null);
      setIsEditing(false);
    } catch (error) {
      // Handle any errors
      console.error('Error updating the review:', error);
      setEditableReviewId(null);
      setIsEditing(false);
    }

    // Call API to update the review content with the editedContent
  };

  const updateReviewContent = (reviewIdToUpdate: number, newContent: string) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewIdToUpdate) {
        return {
          ...review,
          content: newContent,
        };
      }
      return review;
    });
  
    setReviews(updatedReviews);
  };

  const handleCancel = () => {
    setEditableReviewId(null);
    setIsEditing(false);
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview(e.target.value);
  };

  const deleteReview = async (reviewId: number) => {
    try {
      const response = await axios.delete(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      // Handle the response if necessary
      console.log('Review deleted successfully:', response.data);
    } catch (error) {
      // Handle any errors
      console.error('Error deleting the review:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
  <div className="px-4 py-5 sm:px-6">
    <h3 className="text-lg font-medium leading-6 text-gray-900">{book?.title}</h3>
    <p className="mt-1 max-w-2xl text-sm text-gray-500">Written by {book?.author.firstName} {book?.author.lastName}</p>
  </div>
  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Genre</dt>
        <dd className="mt-1 text-sm text-gray-900">{book?.genre}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Release date</dt>
        <dd className="mt-1 text-sm text-gray-900">{book?.releaseDate.toLocaleString("lt-LT").split('T')[0]}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-sm font-medium text-gray-500">Description</dt>
        <dd className="mt-1 text-sm text-gray-900">{book?.description}</dd>
      </div>
      <div className="sm:col-span-2">

      <dt className="text-sm font-medium text-gray-500">Reviews</dt>
      <dd className="mt-1 text-sm text-gray-900">
      <ul role="list" className="divide-y divide-gray-200">
        {reviews.length > 0 && reviews.map((review) => (
          <li key={review.id}
            className="flex justify-between gap-x-6 py-5"
            >
            <div className="ml-3 w-full">
              <p className="text-sm font-medium text-gray-900">
                Review written by {review.userName}
              </p>
              {isEditing && editableReviewId === review.id ? (
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <textarea
                    id="comment"
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0"
                    placeholder="Write a review..."
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end px-3 py-2 border-t">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 mr-2"
                    onClick={() => handleSaveUpdate(review)}
                  >
                    Update review
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              ) : (
                <p className="text-sm text-gray-500 whitespace-normal">{review.content}</p>
              )}
            </div>
            {(isAdmin || currentUserId === review.userId) && (
            <div className="flex flex-end items-center ml-auto max-w-md">
              <div className="text-gray-500" onClick={() => handleEditClick(review)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.5 14.999V17.5a1 1 0 001 1h2.501a1 1 0 00.7-.3l8.5-8.5a1 1 0 00.3-.7v-2.501a1 1 0 00-1-1H3.5a1 1 0 00-1 1v9.999a1 1 0 001 1zm3.2-.7l7.1-7.1 2.1 2.1-7.1 7.1H6.7v-2.1zM14.5 4l1.7-1.7a1 1 0 011.4 0l2.3 2.3a1 1 0 010 1.4l-8.5 8.5H6v-8.5L14.5 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-gray-500"
                onClick={() => deleteReview(review.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            )}
          </li>
        ))}
        {reviews.length === 0 && (
          <li 
            className="flex justify-between gap-x-6 py-5"
            >
                     <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">There are no reviews</p>
          </div>
          </li>
        )}
          <div className="ml-3">
          {!isLoggedIn ? (
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg ">
                    <textarea id="comment"  className="w-full px-0 text-sm text-gray-900 bg-white border-0 " placeholder="To leave a review you have to login" 
                      disabled
                      ></textarea>
                </div>
            </div>
              ) : (
                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                      <div className="px-4 py-2 bg-white rounded-t-lg ">
                          <textarea id="comment"  className="w-full px-0 text-sm text-gray-900 bg-white border-0 " placeholder="Write a review..." 
                            value={userReview}
                            required
                            onChange={handleReviewChange}
                            ></textarea>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 border-t">
                          <button type="submit" 
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                            onClick={submitReview}
                          >
                              Post review
                          </button>
                          <div className="flex pl-0 space-x-1 sm:pl-2">
                          </div>
                      </div>
                  </div>
              )}
          
          </div>
      </ul>
      </dd>
        
      </div>
    </dl>
  </div>
</div>
</div>
</div>
  );
};

export default OneBookPage;