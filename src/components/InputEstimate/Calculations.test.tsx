import { calculateTotalEnergy, calculateTotalPrice, calculateTotalQuantity } from './Calculations';

describe("Device Calculations", () => {
  const devices = [
    { deviceName: 'device1', energy: 10, cost: 20, quantity: 2, dimension: '', releaseDate: '', image: '', width: 0, height: 0, shortName: '' },
    { deviceName: 'device2', energy: 5, cost: 10, quantity: 3, dimension: '', releaseDate: '', image: '', width: 0, height: 0, shortName: '' },
  ];

  test("Total Energy Calculation", () => {
    const expectedEnergy = (10 * 2) + (5 * 3);  // Expected energy calculation based on the above devices
    expect(calculateTotalEnergy(devices)).toBe(expectedEnergy);
  });

  test("Total Price Calculation", () => {
    const expectedPrice = (20 * 2) + (10 * 3); // Expected price calculation based on the above devices
    expect(calculateTotalPrice(devices)).toBe(expectedPrice);
  });

  test("Total Quantity Calculation", () => {
    const expectedQuantity = 2 + 3; // Expected quantity calculation based on the above devices
    expect(calculateTotalQuantity(devices)).toBe(expectedQuantity);
  });
});
