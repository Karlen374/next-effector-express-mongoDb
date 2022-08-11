import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import NumberFormat from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { value: string } }) => void;
}
export const NumberFormatMask = forwardRef<ForwardRefExoticComponent<CustomProps & RefAttributes<any>>, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(NewPrice) => {
          onChange({
            target: {
              value: NewPrice.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  },
);
