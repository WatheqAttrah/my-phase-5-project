"""Create Migrations DB Tables

Revision ID: cfb59b3ae5b2
Revises: 
Create Date: 2023-10-15 13:49:41.086296

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfb59b3ae5b2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('make', sa.String(length=20), nullable=True),
    sa.Column('model', sa.String(length=20), nullable=True),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(length=50), nullable=True),
    sa.Column('price', sa.Float(precision=2), nullable=True),
    sa.Column('vin', sa.String(length=17), nullable=True),
    sa.Column('engine', sa.Integer(), nullable=True),
    sa.Column('miles', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('vin')
    )
    op.create_table('passwords',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('admin', sa.String(), nullable=True),
    sa.Column('password_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['password_id'], ['passwords.id'], name=op.f('fk_users_password_id_passwords')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('car_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['car_id'], ['cars.id'], name=op.f('fk_reviews_car_id_cars')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('users')
    op.drop_table('passwords')
    op.drop_table('cars')
    # ### end Alembic commands ###