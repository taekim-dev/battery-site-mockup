import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";

function BatterySizes(): JSX.Element {
  const batteries = [
    { name: "Megapack 2XL", size: "40×10", imagePath: "/40x10.png" },
    { name: "Megapack 2", size: "30×10", imagePath: "/30x10.png" },
    { name: "Megapack", size: "30×10", imagePath: "/30x10(2).png" },
    { name: "Powerpack", size: "10×10", imagePath: "/10x10.png" },
    { name: "Transformer", size: "10×10", imagePath: "/10x10(2).png" },
  ];

  return (
    <List>
      <img
        src="/tesla-logo.png"
        alt="Logo"
        height={50}
        style={{ marginLeft: "10px" }}
      />
      {batteries.map((battery, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <img
              src={battery.imagePath}
              alt={battery.name}
              style={{ height: "50px", width: "auto", marginRight: "20px" }}
            />
          </ListItemAvatar>
          <ListItemText primary={battery.name} secondary={battery.size} />
        </ListItem>
      ))}
    </List>
  );
}

export default BatterySizes;
