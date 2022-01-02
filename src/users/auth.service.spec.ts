import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeUsersService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email:string, password:string) => 
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

  it('shouls create a user with a salted and hashed passwors', async () => {
    const user = await service.signup('random@email.com', 'pass13');

    const [salt, hash] = user.password;
    expect(user.password).not.toEqual('pass13');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});