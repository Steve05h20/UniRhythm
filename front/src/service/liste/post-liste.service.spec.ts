import { TestBed } from '@angular/core/testing';

import { PostListeService } from './post-liste.service';

describe('PostListeService', () => {
  let service: PostListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
