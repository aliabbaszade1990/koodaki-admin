import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable()
export class InitializationService {
  constructor(private storage: StorageService) {}

  initializeApp() {}
}
