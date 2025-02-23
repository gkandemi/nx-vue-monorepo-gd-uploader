import { StatusType } from "@google-drive-monorepo/types";

/**
 * Represents the type of an alert message.
 * Uses `StatusType` from the shared types library.
 */
export type AlertType = StatusType;

/**
 * Interface defining the properties for an Alert component.
 */
export interface AlertProps {
  /**
   * The type of alert (e.g., success, error, info).
   * Defaults to `info` if not provided.
   */
  type?: AlertType;

  /**
   * The message to be displayed inside the alert.
   */
  message: string;
}
