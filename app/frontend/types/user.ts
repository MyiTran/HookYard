export type Tenant = { id: string; name: string };

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "support";
  tenant: Tenant | null;
};
