from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = IntegerField("user_id")
    post_id = IntegerField("post_id")
    comment = TextField("Comment", validators=[DataRequired()])
    submit = SubmitField("Post")
