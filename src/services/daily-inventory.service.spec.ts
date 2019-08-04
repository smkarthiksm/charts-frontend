import { TestBed } from '@angular/core/testing';

import { DailyInventoryService } from './daily-inventory.service';

describe('DailyInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyInventoryService = TestBed.get(DailyInventoryService);
    expect(service).toBeTruthy();
  });
});
