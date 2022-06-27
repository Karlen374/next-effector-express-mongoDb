import AlertWarning from './alertWarning';

export default {
  title: 'Alert',
  component: AlertWarning,
  argTypes: {
    variant: {
      options: ['filled', 'standard', 'outlined'],
      control: { type: 'radio' },
    },
    severity: {
      options: ['error', 'info', 'success', 'warning'],
      control: { type: 'radio' },
    },
  },
};

const Template = (arg) => <AlertWarning {...arg} />;

export const ErrorVariant = Template.bind({});
ErrorVariant.args = {
  severity: 'error',
  variant: 'standard',
  text: 'Error',
};
export const SuccessVariant = Template.bind({});
SuccessVariant.args = {
  severity: 'success',
  variant: 'outlined',
  text: 'Success',
};
