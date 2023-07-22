import { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import BatteryLayout from "./BatteryLayout/BatteryLayout";
//import RightPanel from './RightPanel';
import { DevicesContext, Device } from "./Context/DevicesContext";
import { LayoutVisibilityContext } from "./Context/LayoutVisibilityContextType";
import devicesData from "./Context/devices.json";
import InputEstimate from "./InputEstimate/InputEstimate";

function MainPage(): JSX.Element {
  const [devices, setDevices] = useState<Device[]>(
    devicesData.map((device) => ({ ...device, quantity: 0 }))
  );
  const [committedDevices, setCommittedDevices] = useState<Device[]>([]);
  const [layoutVisible, setLayoutVisible] = useState(false);

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
