export type Project = {
  id: string;
  name: string;
  description: string | null;
  owner?: boolean;
  owner_name: string;
  owner_email?: string;
  members_count: number;
};
