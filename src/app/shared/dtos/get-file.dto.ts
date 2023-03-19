import { CurrentItem } from '../interfaces/current-item-interface';

export interface GetFileDto extends CurrentItem {
  id: string;
  url: string;
  selected: boolean;
  comment: string;
  name: string;
}
