import React from 'react';

export interface Device {
  deviceName: string;
  dimension: string;
  energy: number;
  cost: number;
  releaseDate: string;
  image: string;
  quantity: number;
  width: number;
  height: number;
  shortName: string;
}

export interface DevicesContextType {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  committedDevices: Device[];
  setCommittedDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

// Initialize the context with an empty object
export const DevicesContext = React.createContext<DevicesContextType | undefined>(undefined);
