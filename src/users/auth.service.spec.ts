import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile();

    service = module.get(AuthService);
  });

  it('should create an instance of Auth Service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a user with a salted and hashed passwors', async () => {
    const user = await service.signup('random@email.com', 'pass13');

    const [salt, hash] = user.password;
    expect(user.password).not.toEqual('pass13');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if a user signup with an existant email', async () => {
    await service.signup('a@a.com', 'v');

    try {
      await service.signup('a@a.com', 'b');
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Email is already in use'));
    }
  });

  it('should throw an error if a user signin with a non existant email', async () => {
    try {
      await service.signin('b@b.com', 'b');
    } catch (error) {
      expect(error).toEqual(new BadRequestException('No user found'));
    }
  });

  it('should throw an error if password is incorrect', async () => {
    await service.signup('anything@b.com', 'mypassword');    

    try {
      await service.signin('anything@b.com', 'mypasswor');
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Incorrect password'));
    }
  });

  it('should create a user if password is correct', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');
      
    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined()
  });
});