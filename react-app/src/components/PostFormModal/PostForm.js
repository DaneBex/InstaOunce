import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as postActions from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css";
import { addPost } from "../../store/post";

function PostForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false); //

  useEffect(() => {
    const validationErrors = [];
    setErrors(validationErrors);
  }, [imageUrl, caption])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let s3Url;
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageUrl);

        setImageLoading(true); //
        // setShowModal(true)
        const res = await fetch('/api/posts/upload', {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            s3Url = await res.json();
            dispatch(addPost(s3Url));
            setImageLoading(false); //
            setShowModal(false);
            history.push(`/`);
        }
        else {
            setShowModal(false)
            setImageLoading(false); //
            console.log("error");
        }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
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
      <div className="image-input">
        <label htmlFor="image">
          <h3>Image</h3>
        </label>
        <input
          className={imageUrl ? "green" : "red"}
          type="file"
          accept="image/*"
          name="image"
          onChange={updateImage}
        />
      </div>

      <div className="content-input">
        <label htmlFor="caption">
          <h3>Caption</h3>
        </label>
        <textarea
          className="add-post-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
      </div>

      <button className="post-form-btn" type="submit"
      onSubmit={handleSubmit}>
        Post
      </button>
      {(imageLoading) && <p>Loading...</p>}
    </form>
  );
}

export default PostForm;
