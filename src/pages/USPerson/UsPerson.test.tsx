import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UsPerson from './UsPerson';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));
const mockedUpdateActiveStep = jest.fn();
const mockedRegisterUser = jest.fn();
describe('UsPerson Component', () => {
  it('submits the correct value when an option is clicked', async () => {
    const { getByText } = render(
      <UsPerson
        updateActiveStep={mockedUpdateActiveStep}
        userPayload={{ isUsResident: false }}
        updateUserPayload={() => {}}
        registerUser={mockedRegisterUser}
      />
    );
    const yesOption = getByText('Yes');
    fireEvent.click(yesOption);
    await waitFor(() => {
      expect(mockedRegisterUser).toHaveBeenCalledWith({
        payload: { dryRun: true, isUsResident: true },
        onSuccess: expect.any(Function)
      });
    });
  });
});
