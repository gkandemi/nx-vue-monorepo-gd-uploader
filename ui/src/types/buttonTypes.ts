/**
 * Enum representing the button types.
 */
export enum ButtonType {
  /** Standard button element */
  BUTTON = 'button',
  /** Submit button for forms */
  SUBMIT = 'submit',
  /** Reset button for forms */
  RESET = 'reset',
}

/**
 * Enum representing different button variants.
 */
export enum ButtonVariant {
  /** Primary button with default styling */
  PRIMARY = 'primary',
  /** Secondary button with alternative styling */
  SECONDARY = 'secondary',
  /** Danger button for destructive actions */
  DANGER = 'danger',
}

/**
 * Enum representing different button sizes.
 */
export enum ButtonSize {
  /** Small button size */
  SM = 'sm',
  /** Medium button size (default) */
  MD = 'md',
  /** Large button size */
  LG = 'lg',
}

/**
 * Interface defining the properties for a Button component.
 */
export interface ButtonProps {
  /**
   * The type of the button (default: `BUTTON`).
   */
  type?: ButtonType;

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The variant of the button (default: `PRIMARY`).
   */
  variant?: ButtonVariant;

  /**
   * The size of the button (default: `MD`).
   */
  size?: ButtonSize;
}
