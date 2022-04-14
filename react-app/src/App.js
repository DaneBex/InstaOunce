import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile/User";
import { authenticate } from "./store/session";
import UserEdit from "./components/UserEdit/UserEdit";
import SinglePost from "./components/SinglePost";
import { populatePosts } from "./store/post";
import { populateComments } from "./store/comment";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(populatePosts()); //
      await dispatch(populateComments()); //
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/posts/:postId" exact={true}>
          <NavBar />
          <SinglePost />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/edit" exact={true}>
          <NavBar />
          <UserEdit />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
