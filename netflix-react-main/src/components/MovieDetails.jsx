import { useState, useEffect } from "react";

const MovieDetails = ({ history, location, match }) => {
  console.log(match.params.movieID);
  //thanks to the movieID parameter we're receiving inside the component
  //the id of the movie we clicked on!
  //now let's retrieve the details of the movie and its comments
  //and store them into state variables
  const [details, setDetails] = useState(null);
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    //fetch the details
    const fetchDetails = async () => {
      try {
        let response = await fetch(
          "http://www.omdbapi.com/?i=tt3896198&apikey=1dcfbf0b&i=" +
            match.params.movieID
        );
        if (response.ok) {
          let data = await response.json();
          setDetails(data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
    const FetchComments = async () => {
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" +
            match.params.movieID,

          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUwNmRlY2RhMzE2MzAwMTVkNTEyM2YiLCJpYXQiOjE2MzI2NjA5NzIsImV4cCI6MTYzMzg3MDU3Mn0.vzSXzuRnbhUs7NjBPeeIiCBg6REuTwnoXE-R7Y-zU9Y",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          let data = await response.json();
          setcomments(data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };
    //fetch comments
    FetchComments();
  }, []);

  return (
    <div className="text-white text-center">
      {details && (
        <div>
          <h2>{details.Title}</h2>
          <img src={details.Poster} alt="movie poster" />
          {comments.map((c) => (
            <li key={c._id} className="my-3">
              {c.comment}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
