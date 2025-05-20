export interface MessageTemplateActiveInactive {
  id?: string;
  name?: string;
  isActive?: boolean;
}
export interface MessageTemplateTurnOnTurnOff {
  id?: string;
  accountTypeId?: string;
  name?: string;
}

export interface MessageTemplateActiveInactiveResponse {
  status?: boolean;
  message?: string;
}
export interface MessageTemplateTurnOnResponse {
  status?: boolean;
  message?: string;
}

export interface SingleMessageTemplate {
  name: string;
  body: string;
  id: number;
  createdAt: string;
  createdBy: number;
  isActive: boolean;
}
