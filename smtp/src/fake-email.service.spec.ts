import { Test, TestingModule } from '@nestjs/testing';
import { FakeEmailService } from './fake-email.service';

describe('FakeEmailService', () => {
  let service: FakeEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeEmailService],
    }).compile();

    service = module.get<FakeEmailService>(FakeEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
