import { useContext, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import QuantityInput from "./QuantityInput";
import { DevicesContext } from "../Context/DevicesContext";
import { LayoutVisibilityContext } from "../Context/LayoutVisibilityContextType";

function InputEstimate(): JSX.Element {
  const deviceContext = useContext(DevicesContext);
  if (!deviceContext) {
    throw new Error("DevicesContext not provided!");
  }

  const layoutVisibilityContext = useContext(LayoutVisibilityContext);
  if (!layoutVisibilityContext) {
    throw new Error("LayoutVisibilityContext not provided!");
  }

  const { devices, setDevices, setCommittedDevices } = deviceContext;
  const { setLayoutVisible } = layoutVisibilityContext;

  useEffect(() => {
    setCommittedDevices(devices);
  }, [devices, setCommittedDevices]);

  const handleQuantityChange = (quantity: number, index: number) => {
    const newDevices = [...devices];
    newDevices[index].quantity = quantity;

    const totalOtherDevices = newDevices.reduce((total, device) => {
      if (device.deviceName !== "Transformer") {
        total += device.quantity;
      }
      return total;
    }, 0);

    const transformerIndex = newDevices.findIndex(
      (device) => device.deviceName === "Transformer"
    );
    if (transformerIndex !== -1) {
      newDevices[transformerIndex].quantity = Math.ceil(totalOtherDevices / 4);
    }

    setLayoutVisible(true);
    setDevices(newDevices);
  };

  const resetQuantities = () => {
    setLayoutVisible(false);

    const newDevices = devices.map((device) => ({ ...device, quantity: 0 }));
    setDevices(newDevices);
  };

  const totalEnergy = devices.reduce(
    (total, device) => total + device.quantity * device.energy,
    0
  );
  const totalPrice = devices.reduce(
    (total, device) => total + device.quantity * device.cost,
    0
  );
  const totalQuantity = devices.reduce(
    (total, device) => total + device.quantity,
    0
  );

  return (
    <Box display="flex" flexDirection="column" height="100%" overflow="auto">
      {/* EnergyPriceLabels */}
      <Box display="flex" justifyContent="space-around" mb={2}>
        <Box>
          <Box height="1.5rem">
            <Typography
              align="center"
              variant="subtitle2"
              color="text.secondary"
            >
              Energy
            </Typography>
          </Box>
          <Box width="15rem">
            <Typography align="center" variant="h5">
              {totalEnergy} MWh
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box height="1.5rem">
            <Typography
              align="center"
              variant="subtitle2"
              color="text.secondary"
            >
              Price
            </Typography>
          </Box>
          <Box width="15rem">
            <Typography align="center" variant="h5">
              ${totalPrice.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* BatteryTable */}
      <Box flexGrow={1} overflow="auto">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Device Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">
                    Floor Dimension <br /> (w x h in feet)
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Quantity</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device, index) => (
              <TableRow
                key={device.deviceName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ padding: "0.25rem 0.5rem" }}>
                  <Typography variant="subtitle1">{device.deviceName}</Typography>
                </TableCell>

                <TableCell align="left" sx={{ padding: "0.25rem 0.5rem" }}>
                  <Box display="flex" alignItems="center">
                    <img
                      src={device.image}
                      alt={device.deviceName}
                      style={{
                        height: "40px",
                        width: "auto",
                        marginRight: "20px",
                      }}
                    />
                    <Typography variant="subtitle1">{device.dimension}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ padding: "0.25rem 0.5rem" }}>
                {device.deviceName === "Transformer" ? (
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5rem' }}>
                    {device.quantity}
                  </Typography>
                ) : (
                  <QuantityInput
                    defaultValue={device.quantity}
                    onQuantityChange={(quantity) =>
                      handleQuantityChange(quantity, index)
                    }
                  />
                )}
              </TableCell>
              </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Layout Button */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          disabled={totalQuantity === 0}
          sx={{ fontSize: "1rem", padding: "0.5em", border: 2 }}
          onClick={resetQuantities}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default InputEstimate;
