export interface CreatePostDto {
  description: string;
  title: string;
  user_id: string;
  files: {
    name: string;
    link: string;
  }[];
}
