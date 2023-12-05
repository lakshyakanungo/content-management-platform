import dayjs from "dayjs";
import { pipe, either, isNil, isEmpty, not } from "ramda";

export const isPresent = pipe(either(isNil, isEmpty), not);

export const formatDate = date => dayjs(date).format("MMM D, YYYY, h:mm A");
