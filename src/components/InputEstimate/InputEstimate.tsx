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
//import LabelledImage from '../Utils/LabelledImage';

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

    // Calculate the total quantity of other devices
    const totalOtherDevices = newDevices.reduce((total, device) => {
      if (device.deviceName !== "Transformer") {
        total += device.quantity;
      }
      return total;
    }, 0);

    // Update the Transformer device
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
    setLayoutVisible(false); // Hide the layout grid

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
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      {/* EnergyPriceLabels */}
      <Box display="flex" justifyContent="space-around" mb={2}>
        <Box>
          <Box height="1.5rem">
            <Typography
              align="center"
              variant="subtitle1"
              color="text.secondary"
            >
              Energy
            </Typography>
          </Box>
          <Box width="15rem">
            <Typography align="center" variant="h4">
              {totalEnergy} MWh
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box height="1.5rem">
            <Typography
              align="center"
              variant="subtitle1"
              color="text.secondary"
            >
              Price
            </Typography>
          </Box>
          <Box width="15rem">
            <Typography align="center" variant="h4">
              ${totalPrice.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* BatteryTable */}
      <TableContainer
        component={Paper}
        sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Device Name</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">
                  Floor Dimension <br /> (width x height in feet)
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Quantity</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device, index) => (
              <TableRow
                key={device.deviceName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="h6">{device.deviceName}</Typography>
                </TableCell>

                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={device.image}
                      alt={device.deviceName}
                      style={{
                        height: "50px",
                        width: "auto",
                        marginRight: "20px",
                      }}
                    />
                    <Typography variant="h6">{device.dimension}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {device.deviceName === "Transformer" ? (
                    <Typography variant="h6">{device.quantity}</Typography>
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

      {/* Layout Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        {/* <Button
          variant="outlined"
          color="primary"
          size="medium"
          disabled={totalQuantity === 0}
          sx={{
            fontSize: "1.2rem",
            padding: "0.7em",
            border: 2,
            marginRight: "1em",
          }}
          onClick={() => {
            setLayoutVisible(true);
            setCommittedDevices(devices.map((device) => ({ ...device }))); // deep copy
          }}
        >
          {layoutVisibilityContext.layoutVisible
            ? "Update Layout"
            : "View Layout"}
        </Button> */}

        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          disabled={totalQuantity === 0}
          sx={{ fontSize: "1.2rem", padding: "0.7em", border: 2 }}
          onClick={resetQuantities}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default InputEstimate;
