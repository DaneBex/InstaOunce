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


@post_routes.route('/upload', methods=['POST'])
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
    caption = request.form['caption']

    new_post = Post(user=current_user, imageUrl=url, caption=caption)
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()


@post_routes.route('/<int:id>')
def display_image(id):
    post = Post.query.get(id).first_or_404(description=f'Image {id} does not exist.')
    return {'single post': post}


@post_routes.route('/<int:id>', methods=['POST'])
@login_required
def update_image(id):
    new_caption = request.form.get('new_caption')
    post = Post.query.get(id).first_or_404(description=f'Image {id} does not exist.')
    post.caption = new_caption
    db.session.add(post)
    db.session.commit()
    return {'updated post': post}


@post_routes.route('/<int:id>', methods=['POST'])
@login_required
def delete_image(id):
    post = Post.query.get(id).first_or_404(description=f'Image {id} does not exist.')
    db.session.delete(post)
    db.session.commit()
    return f'Deleted post {id}'


@post_routes.route('/users/<int:id>')
def getUserPosts(id):
    posts = Post.query.filter_by(user_id = id).all()
    postToDict = []
    for post in posts:
        postToDict.append(post.to_dict())
    return {"posts": postToDict}

@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    one_post = Post.query.get(id)
    db.session.delete(one_post)
    db.session.commit()
    return {"id": id}


@post_routes.route('/<int:id>', methods=["PUT"])
def update_post(id):
    one_post = Post.query.get(id)
    one_post.caption = request.json
    db.session.add(one_post)
    db.session.commit()
    return one_post.to_dict()
