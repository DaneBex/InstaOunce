from urllib.robotparser import RequestRate
from aiohttp import request
from flask import Blueprint
from app.forms.comment_form import CommentForm
import json

from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=["POST"])
def create_comment():
    print(request)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(user_id=form.data["user_id"],post_id=form.data["post_id"],comment=form.data["comment"])

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
