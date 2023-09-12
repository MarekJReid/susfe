export interface Devices {
  devices: Device[];
}

export interface Device {
  id: string;
  displayName: string;
  template: string;
  simulated: boolean;
  enabled: boolean;
  provisioned: boolean;
  organizations: string[] | undefined;
  lastActivity: string; // This can also be typed as `Date` if you plan to convert it to a Date object.
  cloudProperties: CloudProperties;
  tags: Tags;
  telemetry: Telemetry;
}

export interface CloudProperties {
  location: string;
}

export interface Tags {
  location: string;
  type: string;
}

export type Telemetry = TemperatureTelemetry | PressureTelemetry;

export interface TemperatureTelemetry {
  temperature: number;
  humidity: number;
}

export interface PressureTelemetry {
  pressure: number;
}
