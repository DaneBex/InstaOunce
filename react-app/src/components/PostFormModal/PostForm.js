import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as postActions from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css";

function PostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      postActions.createPost({
        caption,
        imageUrl,
        user_id: sessionUser.id,
      })
    )
      .then((data) => {
        history.push(`/`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <label className="content-input">
        <h3>Content</h3>
        <textarea
          rows={10}
          columns={25}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
      </label>

      <label className="image-input">
        <h3>Image</h3>
        <input type="file" accept="image/*" onChange={updateImage} />
      </label>

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
