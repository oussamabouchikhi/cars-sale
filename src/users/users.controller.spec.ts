import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id: 1, email: 'a@a.com', password: 'ac12' } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      },
      // remove: () => {},
      // update: () => {}
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('(findAllUsers) should return a list of users with the given email', async () => {
    const users = await controller.findAllUsers('a@a.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('a@a.com');
  });

  it('(findUser) should return a  user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });

  it('(findUser) should throw an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findUser('1');
    } catch (error) {
      expect(error).toEqual(new NotFoundException('No user with id 1 found'));
    }
  });

  it('(signin) should update session object and return user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'a@a.com', password: 's12' },
      session,
    );
  
    expect(user.id).toEqual(1); // because in mock function we set an id of 1
    expect(session.userId).toEqual(1);
  })
});
