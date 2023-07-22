import { Device } from '../Context/DevicesContext';

function getPermutations(array: Device[]): Device[][] {
  let results: Device[][] = [];

  if (array.length === 1) {
    results.push(array);
    return results;
  }

  for (let i = 0; i < array.length; i++) {
    let firstChar = array[i];
    let charsLeft = array.slice(0, i).concat(array.slice(i + 1));
    let innerPermutations = getPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push([firstChar].concat(innerPermutations[j]));
    }
  }
  return results;
}

export function formDeviceRowsOptimized(devices: Device[], maxRowWidth: number, gap: number): Device[][] {
  // First, flatten the devices array to account for quantities
  let flatDevices: Device[] = [];
  devices.forEach(device => {
    for (let i = 0; i < device.quantity; i++) {
      flatDevices.push(device);
    }
  });

  // get all permutations
  let allPermutations = getPermutations(flatDevices);
  
  let optimalLayout: Device[][] = [];
  let minArea = Infinity;

  // check each permutation
  allPermutations.forEach(permutation => {
    let deviceRows: Device[][] = [];
    let currentRowWidths: number[] = [];

    permutation.forEach(device => {
      let placed = false;
  
      // Try to fit the device into each row in order
      for (let i = 0; i < deviceRows.length; i++) {
        if (currentRowWidths[i] === 0 || currentRowWidths[i] + device.width + gap <= maxRowWidth) {
          deviceRows[i].push(device);
          currentRowWidths[i] += device.width;
          if (deviceRows[i].length > 1) {
            currentRowWidths[i] += gap;  // Only add the gap if the device is not the first in the row
          }
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

    // calculate area
    let maxRowWidthInLayout = Math.max(...currentRowWidths);
    let totalHeight = deviceRows.length * 10;  // assuming each row has height 10
    let area = maxRowWidthInLayout * totalHeight;
  
    // check if this permutation has less area
    if (area < minArea) {
      minArea = area;
      optimalLayout = deviceRows;
    }
  });

  return optimalLayout;
}
