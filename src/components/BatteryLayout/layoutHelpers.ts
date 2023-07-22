import { Device } from "../Context/DevicesContext";

export function formDeviceRows(
  devices: Device[],
  maxRowWidth: number
): Device[][] {
  const deviceRows: Device[][] = [];
  const remainingRowSpaces: number[] = [];

  // First, flatten the devices array to account for quantities
  const flatDevices: Device[] = [];
  devices.forEach((device) => {
    for (let i = 0; i < device.quantity; i++) {
      flatDevices.push(device);
    }
  });

  // Sort the flatDevices array by width in decreasing order
  flatDevices.sort((a, b) => b.width - a.width);

  for (let i = 0; i < flatDevices.length; i++) {
    let device = flatDevices[i];

    // Check if the device can be placed in existing row
    let placed = false;
    for (let j = 0; j < remainingRowSpaces.length; j++) {
      if (device.width <= remainingRowSpaces[j]) {
        deviceRows[j].push(device);
        remainingRowSpaces[j] -= device.width;
        placed = true;
        break;
      }
    }

    // If the device didn't fit into any row, create a new row
    if (!placed) {
      deviceRows.push([device]);
      remainingRowSpaces.push(maxRowWidth - device.width);
    }

    // Sort the rows by remaining space in ascending order
    let combined = deviceRows.map((row, idx) => ({row, space: remainingRowSpaces[idx]}));
    combined.sort((a, b) => a.space - b.space);
    for (let j = 0; j < combined.length; j++) {
      deviceRows[j] = combined[j].row;
      remainingRowSpaces[j] = combined[j].space;
    }
  }

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
