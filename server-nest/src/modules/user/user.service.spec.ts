import { Test, TestingModule } from '@nestjs/testing';
import { User, UserService } from './user.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name      | returnVal
    ${'john'} | ${{ userId: 1, username: 'john', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: User }) => {
      expect(await service.findOne(name)).toEqual(returnVal);
    },
  );
});
