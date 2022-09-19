import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHandleService } from './error-handle.service';

describe('ErrorHandleService', () => {
  let service: ErrorHandleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorHandleService],
    }).compile();

    service = module.get<ErrorHandleService>(ErrorHandleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
