export interface ChecklistItem {
  id: number;
  step: string;
  completed: boolean;
  resource_link?: string | null;
  estimated_time?: string | null;
  details?: string | null;
}