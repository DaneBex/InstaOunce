from flask import Blueprint, request
from app.models import Post, db
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.upload_form import UploadForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
    print("HAAPPPENNIINGGG!!!!!")
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/upload', methods=['POST'])
@login_required
def upload_image():
    # print('This is the upload image.asljsdljaslfjaslj;al')

    post_form = UploadForm()
    # post_form['csrf_token'].data = request.cookies['csrf_token']

    # data = request.get_json(force=True)
    image = request.files['image']

    # if post_form.validate_on_submit():

    #     if "image" not in request.files:
    #         return {"errors": "photo required"}, 400

    #     # image = request.files['image']
    print('\n\n Before image processing \n\n')
    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}, 400
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print('\n\n After image processing:: \n\n', image.filename, upload, '\n\n')
    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    print('\n\n Printing data from request object, url:: \n', url, '\n\n')

    # new_post = Post(user=current_user.id, imageUrl=url, caption=post_form.data['caption'])
    # db.session.add(new_post)
    # db.session.commit()
    # return new_post.to_dict()
        # {'url': url}
    return {'url': url}


# @post_routes.route('/', methods=['POST'])
# @login_required
# def add_image():
#     post_form = UploadForm()

#     if post_form.validate_on_submit():
#         new_post = Post(imageUrl=post_form.data['imageUrl'], caption=post_form.data['caption'])
#         db.session.add(new_post)
#         db.session.commit()
#         return new_post.to_dict()
#     if post_form.errors:
#         return post_form.errors
#     return f'No image added'


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
