export type UrlDTO = {
  slug: string;
  redirectUrl: string;
  discordWebhook: string;
  adminUuid: string;
  createdAt: string;
  updatedAt: string;
  logs: LogDTO[];
};

export type LogDTO = {
  ipAddress: string;
  userAgent: string;
  referer: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type LogResponse = {
  redirectUrl: string;
};
