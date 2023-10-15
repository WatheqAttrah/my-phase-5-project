#!/usr/bin/env python3
from datetime import datetime, timezone
import itertools
from random import randint, choice as random_choice
import bcrypt
from faker import Faker
from faker_vehicle import VehicleProvider
from app import app
from models import db, User, Review, Car
import string
import random


fake = Faker()
fake.add_provider(VehicleProvider)


def generate_fake_vin():
    # The first character in a VIN is typically a letter, so we'll start with that.
    vin = random.choice(string.ascii_uppercase)
    # Generate the remaining 16 characters, which can be letters and numbers.
    vin += ''.join(random.choice(string.ascii_uppercase + string.digits)
                   for _ in range(16))
    return vin
# fake_vin = generate_fake_vin()


if __name__ == '__main__':

    with app.app_context():
        print("~~~~~~Delete Old Seeding!...~~~~~~")
        Review.query.delete()
        User.query.delete()
        Car.query.delete()

        users = []
        print('~~~~~~Seeding Fake Users~~~~~~')
        for _ in range(5):
            user = User(
                username=fake.name(),
                email=fake.email()
            )
            user.password_hash = f'{user.username}password'
            users.append(user)

        db.session.add_all(users)

        cars = []
        print('~~~~~~Seeding Fake Cars~~~~~~')
        for _ in range(5):
            make = fake.vehicle_make()
            model = fake.vehicle_model()
            year = fake.random_int(min=1990, max=2023)
            image = fake.image_url()
            price = round(fake.random_int(min=1000, max=150000) / 100, 2)
            vin = generate_fake_vin()
            engine = fake.random_int(min=4, max=12)
            miles = fake.random_int(min=5000, max=170000)
            car = Car(
                make=make,
                model=model,
                year=year,
                image=image,
                price=price,
                vin=str(vin),
                engine=engine,
                miles=miles
            )
            cars.append(car)

        db.session.add_all(cars)

        reviews = []
        print('~~~~~~Seeding Fake Reviews ~~~~~~')
        for _, _ in itertools.product(users, range(6)):
            review = Review(
                review=fake.paragraph(),
                user=random_choice(users),
                car=random_choice(cars),
            )
            reviews.append(review)

        db.session.add_all(reviews)

        for car in cars:
            review = random_choice(reviews)
            car.review = review
            reviews.remove(review)

        db.session.commit()
        print('~~~~~Seeding Complete~~~~~')
