import { CurrentItem } from '../interfaces/current-item-interface';

export interface GetFileDto extends CurrentItem {
  id: string;
  src: string;
  selected: boolean;
  comment: string;
}
