import { TestBed } from '@angular/core/testing';

import { BoardUtilsService } from './board-utils.service';

describe('BoardUtilsService', () => {
  let service: BoardUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
