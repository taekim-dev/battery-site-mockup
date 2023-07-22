import { Device } from "../Context/DevicesContext";

export function formDeviceRows(
  devices: Device[],
  maxRowWidth: number
): Device[][] {
  const deviceRows: Device[][] = [];
  const currentRowWidths: number[] = [];

  // First, flatten the devices array to account for quantities
  const flatDevices: Device[] = [];
  devices.forEach((device) => {
    for (let i = 0; i < device.quantity; i++) {
      flatDevices.push(device);
    }
  });

  // Sort the flatDevices array by width in decreasing order
  flatDevices.sort((a, b) => b.width - a.width);

  flatDevices.forEach((device) => {
    let placed = false;

    // Try to fit the device into each row in order
    for (let i = 0; i < deviceRows.length; i++) {
      if (currentRowWidths[i] + device.width <= maxRowWidth) {
        deviceRows[i].push(device);
        currentRowWidths[i] += device.width;
        placed = true;
        break;
      }
    }

    // If the device didn't fit into any row, create a new row
    if (!placed) {
      deviceRows.push([device]);
      currentRowWidths.push(device.width);
    }
  });

  return deviceRows;
}

export function getLandDimensions(deviceRows: Device[][]): {
  width: number;
  height: number;
} {
  const totalWidth = deviceRows.reduce((maxWidth, row) => {
    const width = row.reduce((sum, device) => sum + device.width, 0);
    return width > maxWidth ? width : maxWidth;
  }, 0);

  // Assuming each row is 10ft high
  const totalHeight = deviceRows.length * 10;

  return { width: totalWidth, height: totalHeight };
}
