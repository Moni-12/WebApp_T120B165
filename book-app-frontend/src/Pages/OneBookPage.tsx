import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Book } from "../Models/Book";
import { Review } from "../Models/Review";

const OneBookPage: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const accessToken = localStorage.getItem('authJwt');
  const { authorid, bookid } = useParams<{ authorid: string; bookid: string }>();

  const [book, setBook] = useState<Book>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<string>('');

  const fetchBook = async () => {
    try {
      const responseBook = await axios.get<Book>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}`);
      setBook(responseBook.data);
    } catch (error) {
      // Handle error
    }
  };

  const fetchReviews = async () => {
    try {
      const responseReviews = await axios.get<Review[]>(`https://whale-app-4h4zj.ondigitalocean.app/api/authors/${authorid}/books/${bookid}/reviews`);
      setReviews(responseReviews.data);
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
      console.log('Review created:', response.data);
      setReviews((prevReviews) => [...prevReviews, response.data]); // Handle response data here
    } catch (error) {
      console.error('Error creating review:', error); // Handle error here
    }
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview(e.target.value);
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
                     <div className="ml-3">
                      
            <p className="text-sm font-medium text-gray-900">username</p>
            <p className="text-sm text-gray-500">{review.content}</p>
          </div>
          </li>
        ))}
        {reviews.length === 0 && (
          <li 
            className="flex justify-between gap-x-6 py-5"
            >
                     <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">There are no reviews</p>
            {/* <p className="text-sm text-gray-500">{review.content}</p> */}
          </div>
          </li>
        )}
        {/* <li className="flex justify-between gap-x-6 py-5"> */}
          <div className="ml-3">
          {!isLoggedIn ? (
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg ">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment"  className="w-full px-0 text-sm text-gray-900 bg-white border-0 " placeholder="To leave a review you have to login" 
                      value={userReview}
                      disabled
                      onChange={handleReviewChange}
                      ></textarea>
                </div>
            </div>
              ) : (
                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                      <div className="px-4 py-2 bg-white rounded-t-lg ">
                          <label htmlFor="comment" className="sr-only">Your comment</label>
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
                              Post comment
                          </button>
                          <div className="flex pl-0 space-x-1 sm:pl-2">
                          </div>
                      </div>
                  </div>
              )}
          
          </div>
          {/* </li> */}
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