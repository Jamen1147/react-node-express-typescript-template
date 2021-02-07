import cx from 'classnames';
import styles from './TextArea.module.scss';
import InputStyle, { TInputStyleProps } from '../Input/InputStyle';

export type TProps = Pick<
  TInputStyleProps,
  'error' | 'errorMessage' | 'label' | 'containerClassName'
> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({
  error,
  errorMessage,
  label,
  containerClassName,
  id,
  className,
  ...props
}: TProps) => {
  return (
    <InputStyle
      containerClassName={containerClassName}
      error={error}
      errorMessage={errorMessage}
      id={id}
      label={label}
    >
      <textarea
        className={cx(styles.textarea, className)}
        rows={3}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </InputStyle>
  );
};

export default TextArea;
