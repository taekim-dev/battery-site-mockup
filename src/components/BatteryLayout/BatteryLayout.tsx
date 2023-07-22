import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { DevicesContext } from "../Context/DevicesContext";
import { LayoutVisibilityContext } from "../Context/LayoutVisibilityContextType";
import LabelledImage from "../Utils/LabelledImage";
import { formDeviceRows, getLandDimensions } from "./layoutHelpers";

function BatteryLayout(): JSX.Element {
  const deviceContext = useContext(DevicesContext);
  const layoutVisibilityContext = useContext(LayoutVisibilityContext);

  if (!deviceContext) {
    throw new Error("DevicesContext not provided!");
  }

  if (!layoutVisibilityContext) {
    throw new Error("LayoutVisibilityContext not provided!");
  }

  const { committedDevices } = deviceContext;
  const { layoutVisible } = layoutVisibilityContext;

  const deviceRows = formDeviceRows(committedDevices, 100);
  const landDimensions = getLandDimensions(deviceRows);

  //const deviceRows = formDeviceRowsOptimized(committedDevices, 100, 5); // optimized solution but with high cost (n squared)

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      overflow="auto"
      position="relative"
    >
      <Box display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h6" marginTop={2}>
          0 ft
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h5" color="text.secondary">
            Land:
          </Typography>
          <Typography variant="h5" marginLeft={2}>
            {layoutVisible
              ? `${landDimensions.width} × ${landDimensions.height} ft`
              : "0 × 0 ft"}
          </Typography>
        </Box>

        <Typography variant="h6" marginTop={2}>
          100 ft(w)
        </Typography>
      </Box>
      <Box
        sx={{
          borderTop: "5px dotted grey",
          ml: "30px",
          mr: "30px",
        }}
      />

      {/* Only render layout if visibility state is true */}
      {layoutVisible && (
        <Box display="flex">
          <Box
            sx={{
              borderLeft: "5px dotted grey",
              ml: "30px",
            }}
          />
          <Box>
            {deviceRows.map((row, rowIndex) => (
              <Box key={`row-${rowIndex}`} display="flex" marginRight={3}>
                {row.map((device, deviceIndex) => (
                  <Box
                    key={`${device.deviceName}-${deviceIndex}`}
                    width={`${device.width}%`}
                    flexBasis={`${device.width}%`}
                    flexGrow={0}
                    flexShrink={0}
                  >
                    <LabelledImage
                      imageSrc={device.image}
                      altText={device.shortName}
                      label={device.shortName}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Box display="flex" p={2}>
        <Typography variant="h6">{`${landDimensions.height} ft(h)`}</Typography>
      </Box>
    </Box>
  );
}

export default BatteryLayout;
