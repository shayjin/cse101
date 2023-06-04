import { useState, useEffect } from 'react';
import { NavBar } from '../navbar/NavBar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

type Course = {
    number: string;
    name: string;
    rating: number;
    tech: string[];
    description: string;
}

type Review = {
    selectInput: string;
    difficulty: number;
    textInput: string;
    user: string;
    date: string;
}

export const Review = () => {

    var url = window.location.href;
    url = url.substring(url.lastIndexOf("/") + 1);
    
    var numberIndex = 0;

    for (var i = 0; i < url.length; i++) {
        var parsedInt = parseInt(url.charAt(i));
        if (!isNaN(parsedInt) && Number.isInteger(parsedInt)) {
            numberIndex = i;
            break;
        }
    }

    var courseName = url.substring(0, numberIndex) + " " + url.substring(numberIndex);

    const [course, setCourse] = useState<Course>();

    const fetchItems = async (): Promise<void> => {
        const response = await fetch('/getClasses');
        const courses: Course[] = await response.json();
        const c = courses.find((c) => c.number === courseName);
      
        if (c) setCourse(c);
    };

    useEffect(() => {
      fetchItems();
    }, []);

  
    var tech = [];

    if (course?.tech && course.tech.length > 0) {
        var techs = "";

        for (var t of course!.tech) {
            techs += t + ", ";
        }

        techs = techs.substring(0, techs.length - 2);

        tech.push(
            <div><b>Tools Used:</b> {techs}</div>
        );
    }

    var reviewList: any[] = [];
    const [reviews, setReview] = useState<Review[]>();

    const fetchItems2 = async (): Promise<void> => {
        const response = await fetch('/getReviews');
        const r = await response.json();
        setReview(r);
    };


    if (reviews && reviews.length > 0) {
        for (var i = 0; i < reviews!.length; i++) {
            var review = reviews![i];
            if (review.selectInput === course?.number) {
                var pepper: string[] = [];
                for (var j: number = 1; j <= review!.difficulty; j++) {
                    pepper.push("☆");
                } 
                reviewList.push(
                    <div className='review'>
                        <div className="info">
                            <div id="author">Review by: {review.user}</div>
                            <div id="course"><b>{review.selectInput}</b></div>
                            <div id="review-date">{review.date}</div>
                        </div>
                        <div className="bottom">
                            <div className="review-rating">
                                <div className="subRating">
                                    <div id="difficulty"><b>Difficulty Rating</b></div>
                                    <div id="num-difficulty"><b>{review.difficulty}</b></div>
                                    <div id="star-difficulty" style={{ color: "rgb(203, 25, 25)" }}>{pepper}</div>
                                </div>
                            </div>
                            <div className="cont">
                                <div className="subCont">
                                    <p>{review.textInput}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            }
        }

        if (reviews!.length <= 0) {
            reviewList.push(
                <div className="review-buttons">
                    <Link to="/courses">
                    <Button variant="success">View All Reviews</Button>
                    </Link>
                    <Link to={`/write/any`}>
                    <Button variant="warning" style={{ marginLeft: "10px" }}>Write a Review</Button>                
                    </Link>
              </div>
            );
        }
    }

    useEffect(() => {
      fetchItems2();
    }, []);

    return(
        <>
            <NavBar/>
            <div className="courseInfo">
                <div><b><h3>{course?.number} - {course?.name}</h3></b></div>
                <div><b>Avg. Difficulty (0-5):</b> {course?.rating}</div>
                {tech}
            </div>
            <div className="courseDes">
                <div>
                    <p><b>Contents: </b> {course?.description} </p>
                </div>
            </div>
            <div className="reviews">
                <h3>Reviews</h3>    
                {reviewList}
            </div>
        </>
    );
}