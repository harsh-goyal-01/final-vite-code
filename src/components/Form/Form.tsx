import React, { useRef, FormEvent } from 'react';
import { StyledButton,StyledForm,StyledInput } from './FormStyles';
import { FormattedMessage,injectIntl, defineMessages} from 'react-intl';

interface FormProps {
  addMessageHandler: (message: string) => void;
}


const Form: React.FC<FormProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
const messages = defineMessages({
  placeholder : 'Enter Your Message'
});

  const InputComponent = injectIntl(({ intl }) => {
    const placeholder = intl.formatMessage(messages.placeholder);
    return ( <StyledInput type='text' placeholder={placeholder} ref={inputRef} />
     );
  });
  const ButtonComponent = injectIntl(({ intl }) => {
    const text = intl.formatMessage({ id: 'sendButton',
    defaultMessage: 'Send',
   });
   const ariaLabelval=intl.formatMessage({ id: 'arialabel',
   defaultMessage: 'Send Your Message',
  });
    return <StyledButton aria-label={ariaLabelval}>{text}</StyledButton>;
  });

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const message = inputRef.current.value;
      if(message!=='')
      props.addMessageHandler(message);
      inputRef.current.value = '';
      
    }
  };
  return (
    <div>
      <StyledForm onSubmit={onSubmitHandler}>
        <InputComponent/>
        <ButtonComponent/>
      </StyledForm>
    </div>
  );
};

export default Form;
