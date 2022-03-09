from flask import Blueprint, request
from app.forms.comment_form import CommentForm
from app.models import Comment
import json

from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def comments():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=["POST"])
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(user_id=form.data["user_id"],post_id=form.data["post_id"],comment=form.data["comment"])

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
