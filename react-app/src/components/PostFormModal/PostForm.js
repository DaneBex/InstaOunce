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
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const s3Url;
    const formData = new FormData();
        formData.append("image", imageUrl);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/posts/upload-image', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            s3Url = await res.json();
            setImageLoading(false);
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    return dispatch(
      postActions.createPost({
        caption,
        imageUrl: s3Url,
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

      <button className="post-form-btn" type="submit">
        Post
      </button>
    </form>
  );
}

export default PostForm;
