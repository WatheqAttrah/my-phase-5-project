#!/usr/bin/env python3
from flask import jsonify, make_response, session, request, render_template
from sqlalchemy.ext.associationproxy import association_proxy
from flask_restful import Resource
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from config import app, db, api, bcrypt
from models import Password, User, Review, Car


# ============#============#============#============#============
# API's Starts Here


@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

# ClearSession


class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['user_id'] = None
        return {}, 204


api.add_resource(ClearSession, '/clear', endpoint='clear')

# ============#============#============#============#============

# Check_Session


class CheckSession(Resource):
    def get(self):
        if session.get('user_id') == None:
            return {}, 204
        user = User.query.filter(User.id == session.get('user_id')).first()
        return user.to_dict(), 200


api.add_resource(CheckSession, '/check_session', endpoint='check_session')

# ============#============#============#============#============


class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


api.add_resource(Login, '/login', endpoint='login')

# ============#============#============#============#============


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204


api.add_resource(Logout, '/logout', endpoint='logout')
# ============#============#============#============#============


class Signup(Resource):
    def post(self):

        username = request.get_json()['username']
        email = request.get_json()['email']
        password = request.get_json()['password']

        if len(username) < 10 and len(password) > 6:

            hashed_password = bcrypt.generate_password_hash(
                password).decode('utf-8')
            password_record = Password(_password_hash=hashed_password)
            db.session.add(password_record)
            db.session.commit()

            new_user = User(username=username, email=email,
                            password_id=password_record.id)
            try:
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(), 201

            except IntegrityError as e:
                db.session.rollback()
                return {'errors': 'username already taken'}, 400
        return {'errors' 'unproceessable entity'}, 422


api.add_resource(Signup, '/signup', endpoint='signup')

# ============#============#============#============#============


class Cars(Resource):
    def get(self):
        cars = []
        for car in Car.query.all():
            car = {
                "id": car.id,
                "make": car.make,
                "model": car.model,
                "year": car.year,
                "image": car.image,
                "price": car.price,
                "vin": car.vin,
                "engine": car.engine,
                "miles": car.miles,
            }
            cars.append(car)
        return make_response(jsonify(cars), 200)


api.add_resource(Cars, '/cars', endpoint='cars')
# ============#============#============#============#============


class CarByID(Resource):
    # get reviews for a specific car
    def get(self, id):
        reviews = Review.query.filter_by(car_id=id)
        reviews_data = {'reviews': [
            {'id': review.id, 'review': review.review, 'user': review.user.username} for review in reviews]}
        return make_response(jsonify(reviews_data), 200)

    # add a review for a specific car
    def post(self, id):
        data = request.get_json()
        user_id = data['user_id']
        car_id = data['car_id']
        review_text = data['review_text']

        car = Car.query.get(id)
        if car:
            review = Review(review=review_text, car_id=car_id, user_id=user_id)
            db.session.add(review)
            db.session.commit()
        return {'message': 'Review added successfully'}, 201


api.add_resource(CarByID, '/cars/<int:id>')

# ============#============#============#============#============


class UserByUsername(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if user:
            return user.to_dict(), 200
        return {'errors': 'user not found'}, 404

    def delete(self, username):
        user = User.query.filter_by(username=username).first()
        active_user = User.query.filter_by(id=session.get('user_id')).first()
        if active_user and user:
            if active_user.admin == True and user.id != active_user.id:
                db.session.delete(user)
                db.session.commit()
                return {'message': 'successfully deleted'}, 204
            if active_user.id == user.id:
                db.session.delete(user)
                db.session.commit()
                session.pop('user_id', default=None)
                return {'message': 'successfully deleted'}, 204
            return {'errors': 'unauthorized'}, 401
        return {'errors': 'user not found'}, 404

    def patch(self, username):
        active_user = User.query.filter_by(id=session.get('user_id')).first()
        user = User.query.filter_by(username=username).first()
        if user and active_user:
            if user.id == active_user.id:
                new_password = request.get_json()['password']
                user.password = new_password
                db.session.add(user)
                db.session.commit()
                return user.to_dict(), 200
            return {'errors': 'unauthorized'}, 401
        return {'errors': 'user not found'}, 404


api.add_resource(UserByUsername, '/users/<string:username>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
