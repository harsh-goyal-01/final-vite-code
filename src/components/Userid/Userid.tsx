import React from 'react'
import { NumberFormat } from '@formatjs/intl-numberformat';
import { FormattedMessage } from 'react-intl';
import { StyledContainer } from './UseridStyles';
let user_id=1237893423234;
const user_idUS =Intl.NumberFormat('en-US').format(user_id);
// const user_idSpain=Intl.NumberFormat('es').format(user_id);
// const user_idUk=Intl.NumberFormat('en-UK').format(user_id);
const Userid = () => {
  return (
    <StyledContainer>
           <FormattedMessage id="useridUS" defaultMessage='User_id In US format: '></FormattedMessage>{user_idUS}</StyledContainer>
  )
}

export default Userid