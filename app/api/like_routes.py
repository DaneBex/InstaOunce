from flask import Blueprint
from app.models import Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    likes = Like.query.all()
    return {"likes": [like.to_dict() for like in likes]}
