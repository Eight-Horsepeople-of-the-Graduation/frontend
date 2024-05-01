export interface Challenge {
  goal: number;
  progress: number;
  id: number;
  type: "yearly" | "monthly" | "weekly";
  period: string;
}
