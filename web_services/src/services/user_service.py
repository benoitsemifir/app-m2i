from dto.user_dto import UserDto
from dto.user_dto_full import UserDtoFull
from models.user import User
import repositories.user_repo as ur


def get_users():
    result = ur.get_users()
    print(result)
    users = []
    for user in result:
        users.append(model_to_dto(user))
    return users


def get_user_by_login(login):
    result = ur.get_user_by_login(login)
    users = []
    for user in result:
        users.append(model_to_dto(user))
    return users


def create_user(json):
    print('coucou')
    print(json)
    user_dto = json_to_dto(json)
    result = ur.create_user(dto_to_model(user_dto))
    user = model_to_dto(result)
    return user


def update_user(user_id, json):
    user_dto = json_to_dto(json)
    result = ur.update_user(user_id, user_dto)
    user = model_to_dto(user)
    return user


def delete_user(user_id):
    ur.delete_user(user_id)


def json_to_dto(json):
    return UserDto(json['lastname'], json['firstname'],
                   json['birth'], json['email'], json['login'], json['password'])


def model_to_dto(model):
    return UserDtoFull(model.id, model.lastname, model.firstname, model.birth, model.email, model.login, model.password)


def dto_to_model(dto):
    return User(dto.lastname, dto.firstname, dto.birth, dto.email, dto.login, dto.password)
