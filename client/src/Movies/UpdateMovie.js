import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovieValues = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateMovie(props) {
  const [movieValues, setMovieValues] = useState(initialMovieValues);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovieValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valueToUse =
      name === "stars"
        ? value.split(",")
        : value || name === "metascore"
        ? parseInt(value, 10)
        : value;
    setMovieValues({ ...movieValues, [name]: valueToUse });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieValues)
      .then((res) => {
        props.getMovieList();
        setMovieValues(initialMovieValues);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={movieValues.title}
        placeholder="Movie Title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="director"
        value={movieValues.director}
        placeholder="Movie Director"
        onChange={handleChange}
      />
      <input
        type="number"
        name="metascore"
        value={movieValues.metascore}
        placeholder="Movie Metascore"
        onChange={handleChange}
      />
      <input
        type="text"
        name="stars"
        value={movieValues.stars}
        placeholder="Movie Stars"
        onChange={handleChange}
      />
      <button type="submit">Update Movie</button>
    </form>
  );
}
