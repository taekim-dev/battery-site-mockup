import { Device } from "../Context/DevicesContext";

export const calculateTotalEnergy = (devices: Device[]): number => 
  devices.reduce((total, device) => total + device.quantity * device.energy, 0);

export const calculateTotalPrice = (devices: Device[]): number => 
  devices.reduce((total, device) => total + device.quantity * device.cost, 0);

export const calculateTotalQuantity = (devices: Device[]): number => 
  devices.reduce((total, device) => total + device.quantity, 0);
