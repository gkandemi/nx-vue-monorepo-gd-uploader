/**
 * Interface representing a single dropdown option.
 */
export interface DropdownOption {
  /**
   * Dynamic key-value pairs for additional metadata.
   */
  [key: string]: any;
}

/**
 * Interface defining the properties for a Dropdown component.
 */
export interface DropdownProps {
  /**
   * The key used to extract the display text from each option.
   * If not provided, the entire object may be used.
   * @default undefined
   */
  textExpression?: string;

  /**
   * The key used to extract the unique identifier from each option.
   * If not provided, a default index-based key may be used.
   * @default undefined
   */
  keyExpression?: string;

  /**
   * The list of options to be displayed in the dropdown.
   */
  options: DropdownOption[];
}
