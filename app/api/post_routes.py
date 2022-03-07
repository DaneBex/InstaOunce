from crypt import methods
from flask import Blueprint, request
from app.models import Post, db
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}

@post_routes.route('/upload-image', methods=['POST'])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "photo required"}, 400

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}, 400
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    new_post = Post(user=current_user, imageUrl=url)
    db.session.add(new_post)
    db.session.commit()
    return {'url': url}
