import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
    fakeUsersService.find = () => Promise.resolve([
      { email: 'a@a.com', password: 'a' } as User
    ]);

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
    fakeUsersService.find = () => Promise.resolve([
      { email: 'test@test.com', password: '12f45657c0b2f698.04623b120858e533c12c5496286cfe9202db33f171f8151b96977915b013b05c' } as User
    ]);

    try {
      await service.signin('anything@b.com', 'mypasswor');
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Incorrect password'));
    }
  });

  it('should create a user password is correct', async () => {
    // const user = await service.signup('asdf@asdf.com', 'mypassword');
    // console.log(user);
    fakeUsersService.find = () => Promise.resolve([
      { email: 'test@test.com', password: '12f45657c0b2f698.04623b120858e533c12c5496286cfe9202db33f171f8151b96977915b013b05c' } as User
    ]);
      
    const user =await service.signin('test@test.com', 'mypassword');
    expect(user).toBeDefined()
  });
});