import { createDate } from "./date-utils";
type CreateDate = typeof createDate;
export type DuetDateParser = (input: string, createDate: CreateDate) => Date | undefined;
export type DuetDateFormatter = (date: Date) => string;
export interface DuetDateAdapter {
  parse: DuetDateParser;
  format: DuetDateFormatter;
}
declare const isoAdapter: DuetDateAdapter;
export default isoAdapter;
