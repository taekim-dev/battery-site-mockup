import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import BatteryLayout from './BatteryLayout/BatteryLayout';
import { DevicesContext, Device } from './Context/DevicesContext';
import { LayoutVisibilityContext } from './Context/LayoutVisibilityContextType';
import InputEstimate from './InputEstimate/InputEstimate';

function MainPage(): JSX.Element {
  const [devices, setDevices] = useState<Device[]>([]);
  const [committedDevices, setCommittedDevices] = useState<Device[]>([]);
  const [layoutVisible, setLayoutVisible] = useState(false);

  useEffect(() => {
    fetch('https://battery-mockup-api.glitch.me/devices')
      .then(response => response.json())
      .then(data => {
        const updatedDevices = data.map((device: Device) => ({ ...device, quantity: 0 }));
        setDevices(updatedDevices);
        setCommittedDevices(updatedDevices);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleCommit = () => {
    setCommittedDevices(devices);
  };

  return (
    <DevicesContext.Provider
      value={{ devices, setDevices, committedDevices, setCommittedDevices }}
    >
      <LayoutVisibilityContext.Provider
        value={{ layoutVisible, setLayoutVisible, handleCommit }}
      >
        <Box>
          <Header />
          <Box display="flex" height="100vh" m={2}>
            <Box
              border={1}
              m={2}
              width="50%"
              maxHeight="calc(100vh - 120px - 2rem)"
              overflow="scroll"
            >
              <BatteryLayout />
            </Box>
            <Box
              border={0}
              m={2}
              width="50%"
              maxHeight="calc(100vh - 120px - 2rem)"
            >
              <InputEstimate />
            </Box>
          </Box>
        </Box>
      </LayoutVisibilityContext.Provider>
    </DevicesContext.Provider>
  );
}

export default MainPage;
