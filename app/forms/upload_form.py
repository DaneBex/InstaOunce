from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class UploadForm(FlaskForm):
    # imageUrl = StringField('Image Url', validators=[DataRequired()])
    caption = TextAreaField('Caption')
    # upload = SubmitField('Upload')
