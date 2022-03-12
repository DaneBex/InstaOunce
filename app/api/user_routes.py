from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:user_id>/<int:follow_id>')
def follow_user(user_id, follow_id):
    user = User.query.get(user_id)
    follow_this = User.query.get(follow_id)
    print('YESESEREFSESR', follow_this.to_dict())

    for new_user in follow_this.following:
        if new_user.id == user.id:
            follow_this.following.remove(user)
            db.session.commit()
            return follow_this.to_dict()

    follow_this.following.append(user)
    db.session.commit()
    return {"user":follow_this.to_dict()}


@user_routes.route('/<int:user_id>/edit', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)
    user.username = request.json
    db.session.add(user)
    db.session.commit()
    return {"user": user.to_dict()}
