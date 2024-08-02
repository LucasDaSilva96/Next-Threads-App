export interface UserInfo {
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded: boolean;
  communities: string[];
  threads: string[];
}
