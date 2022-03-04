from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcER6jA6UyjOg493z1uj8WRa0v_5A5sADg1vMY9Dl898hXsE0UIkpo7WtgoEFzPkOESw&usqp=CAU')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_pic="https://i.guim.co.uk/img/media/3b076eacf3af3ba9594a6786f72bd4b236df0eec/651_940_3450_2070/master/3450.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=f32d63ad41960ada2cf0e3993298caf6")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_pic="https://cdn.britannica.com/55/2155-050-604F5A4A/lion.jpg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
