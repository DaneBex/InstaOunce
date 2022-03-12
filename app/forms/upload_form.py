from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class UploadForm(FlaskForm):
    caption = TextAreaField('Caption')
