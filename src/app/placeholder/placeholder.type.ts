export interface PlaceholderActiveInactive {
  id?: string;
  name?: string;
  isActive?: boolean;
}
export interface PlaceholderTurnOnTurnOff {
  id?: string;
  actionType?: string;
  name?: string;
}

export interface PlaceholderActiveInactiveResponse {
  status?: boolean;
  message?: string;
}
export interface PlaceholderTurnOnResponse {
  status?: boolean;
  message?: string;
}

export interface SinglePlaceholder {
  name: string;
  description: string;
  actionType: string;
  action: string;
  sampleText: string;
  actionTypeName: string;
  id: number;
  createdAt: string;
  createdBy: number;
  isActive: boolean;
}
