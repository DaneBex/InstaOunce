from app.models import db, Post


def seed_posts():
    p1 = Post(
        userId=1, imageUrl='https://images.unsplash.com/photo-1646282014691-620f9af448a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', caption='Iceberg straight ahead!')
    p2 = Post(
        userId=1, imageUrl='https://images.unsplash.com/photo-1645904836022-17bf58ad21c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Morning fog')
    p3 = Post(
        userId=1, imageUrl='https://images.unsplash.com/photo-1645037201328-de8b1b048993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Checkout the mountains')
    p4 = Post(
        userId=2, imageUrl='https://images.unsplash.com/photo-1645651758223-32f82d99c43d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Somebody is going to die on this walk...')
    p5 = Post(
        userId=2, imageUrl='https://images.unsplash.com/photo-1635176594802-47012d05932b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', caption='Moving at the speed of light')
    p6 = Post(
        userId=3, imageUrl='https://images.unsplash.com/photo-1645027979535-e71366388599?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Let\'s go to the Paramount tonight')
    p7 = Post(
        userId=3, imageUrl='https://images.unsplash.com/photo-1644929771938-44387fe50e66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fF9oYi1kbDRRLTRVfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Race you to the top!')
    p8 = Post(
        userId=4, imageUrl='https://images.unsplash.com/photo-1630370447856-d0343305e234?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', caption='Breakfast for one.')
    p9 = Post(
        userId=4, imageUrl='https://images.unsplash.com/photo-1644939160448-3e23e8e97b8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='Lunchtime!')
    p10 = Post(
        userId=5, imageUrl='https://images.unsplash.com/photo-1645382883577-e7a09cc1f014?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHJuU0tESHd3WVVrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', caption='House')


    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
