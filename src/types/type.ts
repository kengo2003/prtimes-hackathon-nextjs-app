export interface BBDataType {
  id: number;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  slug?: number;
  createdAt: Date;
  published?: boolean;
  authorId?: string;
  content: string;
  title: string;
  thumbnailURL?: string;
  tagIDs?: string[];
  categoryIDs?: string[];
}
