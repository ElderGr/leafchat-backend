export interface IFileParam {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}
