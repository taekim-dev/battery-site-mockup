import React, { useEffect } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantityInputProps {
  defaultValue: number;
  onQuantityChange: (quantity: number) => void;
}

function QuantityInput({ defaultValue, onQuantityChange }: QuantityInputProps): JSX.Element {
  const [quantity, setQuantity] = React.useState(defaultValue);

  // useEffect to update quantity state whenever defaultValue prop changes
  useEffect(() => {
    setQuantity(defaultValue);
  }, [defaultValue]);

  function increment() {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  }

  function decrement() {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 0) {
      setQuantity(0);
      onQuantityChange(0);
    } else if (parsedValue > 9999) {
      setQuantity(9999);
      onQuantityChange(9999);
    } else {
      setQuantity(parsedValue);
      onQuantityChange(parsedValue);
    }
  }

  return (
    <TextField
      type="number"
      value={quantity}
      onChange={handleChange}
      inputProps={{ style: { textAlign: 'center' } }}
      InputProps={{
        sx: {
          width: '8em',
          color: 'black',
          fontSize: '1.5em',
          borderColor: 'darkgray',
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '& input[type=number]': {
            '-moz-appearance': 'textfield',
          },
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={decrement}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={increment}>
              <AddIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default QuantityInput;
