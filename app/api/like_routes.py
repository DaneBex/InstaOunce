from crypt import methods
from flask import Blueprint
from app.models import Like, Post, db

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    likes = Like.query.all()
    return {"likes": [like.to_dict() for like in likes]}


@like_routes.route('/<int:user_id>/posts/<int:post_id>', methods=['POST'])
def addLike(post_id, user_id):
    likes_post = Like.query.filter_by(post_id=post_id).all()

    for like in likes_post:
        if(user_id == like.user_id):
            db.session.delete(like)
            db.session.commit()

            return {"message":'LIKE IS DELETED'}

    new_like = Like(post_id=post_id, user_id=user_id)
    db.session.add(new_like)
    db.session.commit()


    return {"post": [ like.to_dict() for like in likes_post]}
