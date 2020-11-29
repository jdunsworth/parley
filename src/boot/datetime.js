/**
 * ============================================================
 * Parley Date & Time Utility
 * ============================================================
 */

import { format, formatDistanceStrict, isValid } from 'date-fns';

export default ({ Vue }) => {
  const DateTimeFunctions = {
    // Difference Between 2 Dates/Times
    timeElapsed: (date1 = null, date2 = null) => {
      const formatDate1 = (date1) ? new Date(date1) : new Date();
      const formatDate2 = (date2) ? new Date(date2) : new Date();
      return formatDistanceStrict(formatDate1, formatDate2);
    },

    // Main Function
    formatDateTime: (date = null, dateFormat = 'MMM do, y hh:mm a') => {
      let formatDate;

      // Check for Date
      if (date) {
        formatDate = new Date(date);
      } else if (typeof date === 'undefined') {
        // Date is undefined
        return false;
      } else {
        // If date is null, return now
        formatDate = new Date(date);
      }

      // Validate Date
      if (!isValid(formatDate)) {
        return false;
      }

      return format(formatDate, dateFormat);
    },

    // Full Common :: September 28, 2020 1:36 pm
    fCommon: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMMM d, y h:mm a'),

    // Full Common Date :: September 28, 2020
    fCommonDate: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMMM d, y'),

    // Full Common with Ordinal :: September 28th, 2020 1:36pm
    fCommonO: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMMM do, y h:mm a'),

    // Full Common Date with Ordinal :: September 28th, 2020
    fCommonDateO: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMMM do, y'),

    // Abbreviated Common :: Sept 28, 2020 1:36 pm
    aCommon: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMM d, y h:mm a'),

    // Abbreviated Common Date :: Sept 28, 2020
    aCommonDate: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMM d, y'),

    // Abbrevieated Common with Ordinal :: Sept 28th, 2020 1:36 pm
    aCommonO: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMM do, y h:mm a'),

    // Abreviated Common Date with Ordinal :: Sept 28th, 2020
    aCommonDateO: (date = null) => DateTimeFunctions.formatDateTime(date, 'MMM do, y'),

    // MySQL Valid Timestamp :: 2020-09-28 13:36
    MySQLTimestamp: (date = null) => DateTimeFunctions.formatDateTime(date, 'y-MM-dd HH:mm'),

    // MySQL Valid Timestamp Pretty :: 09-28-2020 13:36
    MySQLTimestampPretty: (date = null) => DateTimeFunctions.formatDateTime(date, 'MM-dd-y HH:mm'),

    // MySQL Valid Date :: 2020-09-28
    MySQLDate: (date = null) => DateTimeFunctions.formatDateTime(date, 'y-MM-dd'),

    // MySQL Valid Date Pretty :: 09-28-2020
    MySQLDatePretty: (date = null) => DateTimeFunctions.formatDateTime(date, 'MM-dd-y'),

    // International Organizations for Standardization Valid :: 2020-09-28 13:36:42
    ISO: (date = null) => DateTimeFunctions.formatDateTime(date, 'y-MM-dd HH:mm:ss'),

    // International Organizations fro Standardization Valid Pretty :: 09-28-2020 13:36:42
    ISOPretty: (date = null) => DateTimeFunctions.formatDateTime(date, 'MM/dd/y'),

    // Date :: 09/28/2020
    Date: (date = null) => DateTimeFunctions.formatDateTime(date, 'y-MM-dd HH:mm:ss'),

    // Military Time (24hr):: 13:36
    Time: (date = null) => DateTimeFunctions.formatDateTime(date, 'HH:mm'),

    // Full Military Time (24hr) :: 13:36:42
    fTime: (date = null) => DateTimeFunctions.formatDateTime(date, 'HH:mm:ss'),

    // Time (AMPM):: 1:36 pm
    AMPM: (date = null) => DateTimeFunctions.formatDateTime(date, 'h:mm a'),

    // Full Time (AMPM) :: 1:36:42 pm
    fAMPM: (date = null) => DateTimeFunctions.formatDateTime(date, 'h:mm:ss a'),

  };

  Vue.prototype.$date = DateTimeFunctions;
};
