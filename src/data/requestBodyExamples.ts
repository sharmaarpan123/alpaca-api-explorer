import { RequestBodyField, payloadTypes } from "./dataTypes";

export const requestBodyExamples: Record<
  string,
  Record<string, RequestBodyField>
> = {
  "stocks/assets": {
    limit: {
      type: payloadTypes.number,
      description: "Limit the number of assets to return",
      required: true,
      default: 10,
    },
    order: {
      type: payloadTypes.number,
      description: "Order the assets by a specific field",
      default: -1,
    },
    orderBy: {
      type: payloadTypes.select,
      description: "Field to order the assets by",
      required: true,
      default: "exchange",
      options: ["exchange", "name", "shortName", "symbol", "type"],
    },
    page: {
      type: payloadTypes.number,
      description: "Page number to return",
      required: true,
      default: 1,
    },
  },

  "stocks/assets-details": {
    value: {
      type: payloadTypes.string,
      description: "The asset to get details for",
      required: true,
      default: "",
    },
  },

  "stocks/quotes-latest": {
    symbol: {
      type: payloadTypes.string,
      description: "The symbol to get data for",
      default: "",
    },
  },

  "orders/order-buy": {
    scheduled: {
      type: payloadTypes.select,
      description: "Scheduled order",
      options: ["", "scheduled"],
      default: "",
    },
    scheduledType: {
      type: payloadTypes.select,
      description: "Type of purchase (e.g. Money)",
      requiredCondition: {
        otherKey: "scheduled",
        otherKeyValue: ["scheduled"],
      },
      default: "",
      options: ["", "everyweek", "everyday", "everymonth"],
    },
    time: {
      type: payloadTypes.select,
      description: "Type of purchase (e.g. Money)",
      required: true,
      requiredCondition: {
        otherKey: "scheduledType",
        otherKeyValue: ["everyweek", "everyday"],
      },
      default: "",
      options: ["", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    },
    timeType: {
      type: payloadTypes.select,
      description: "Type of purchase (e.g. Money)",
      requiredCondition: {
        otherKey: "scheduledType",
        otherKeyValue: ["everymonth"],
      },
      default: "",
      options: ["", "Last", "First"],
    },
    day: {
      type: payloadTypes.select,
      description: "Type of purchase (e.g. Money)",
      requiredCondition: {
        otherKey: "scheduledType",
        otherKeyValue: ["everyweek", "everymonth"],
      },
      default: "",
      options: ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    purchaseType: {
      type: payloadTypes.select,
      description: "Type of purchase (e.g. Money)",
      required: true,
      options: ["Money", "Share"],
      default: "Money",
    },
    purchaseValue: {
      type: payloadTypes.number,
      description: "Value of the purchase",
      required: true,
    },
    timezone: {
      type: payloadTypes.string,
      description: "Timezone for the order (e.g. Asia/kolkata)",
      required: true,
      default: "Asia/kolkata",
      hidden: true,
    },
    side: {
      type: payloadTypes.select,
      description: "Order side (e.g. buy)",
      required: true,
      default: "buy",
      options: ["buy", "sell"],
      hidden: true,
    },
    symbol: {
      type: payloadTypes.string,
      description: "Stock ticker symbol",
      required: true,
    },
    type: {
      type: payloadTypes.select,
      description: "Order type (e.g. market)",
      required: true,
      default: "market",
      options: ["limit", "market"],
    },
    limitOrderPrice: {
      type: payloadTypes.number,
      description: "Order type (e.g. market)",
    },
    timeInForce: {
      type: payloadTypes.select,
      description: "Order type (e.g. market)",
      requiredCondition: {
        otherKey: "type",
        otherKeyValue: ["limit"],
      },
      default: "",
      options: ["", "day", "gtc"],
    },
  },

  "stocks/quotes-history": {
    symbol: {
      type: payloadTypes.string,
      required: true,
      description: "symbol to get the history",
    },
    startTime: {
      type: payloadTypes.datetimeLocal,
      required: true,
      description: "start Time",
      format: "YYYY-MM-DDTHH:mm:ss[Z]",
    },
    endTime: {
      type: payloadTypes.datetimeLocal,
      required: true,
      format: "YYYY-MM-DDTHH:mm:ss[Z]",
      description: "End time",
    },
  },

  "stocks/bars-info": {
    symbol: {
      type: payloadTypes.string,
      description: "The symbol used for retrieving bar results",
    },
    multiplier: {
      type: payloadTypes.string,
      description: "The multiplier value",
    },
    timespan: {
      type: payloadTypes.select,
      options: ["minute", "hour", "day", "week", "month", "quarter", "year"],
      description: "Available time span options",
      default: "minute",
    },
    from: {
      type: payloadTypes.date,
      description: "Start date for data retrieval",
    },
    to: {
      type: payloadTypes.date,
      description: "End date for data retrieval",
    },
  },

  "stocks/bars-latest": {
    symbol: {
      type: payloadTypes.string,
      required: true,
      description: "The symbol used for retrieving bar results",
    },
    date: {
      required: true,
      type: payloadTypes.date,
      description: "The date to get the latest bar for",
    },
  },

  "orders/close-position-symbol": {
    value: {
      type: payloadTypes.string,
      description: "The symbol to close position for",
    },
    type: {
      type: payloadTypes.select,
      description: "Type of closure",
      options: ["PARTIAL_CLOSURE", "FULL_CLOSURE"],
    },
    closeBy: {
      type: payloadTypes.select,
      description: "How to close the position",
      options: ["SHARE", "PERCENTAGE"],
    },
    closeValue: {
      type: payloadTypes.number,
      description: "Value to close by",
    },
  },

  "orders/order-history": {
    limit: {
      type: payloadTypes.number,
      description: "Number of records to return",
      default: 20,
    },
    page: {
      type: payloadTypes.number,
      description: "Page number",
      default: 1,
    },
    type: {
      type: payloadTypes.select,
      description: "Type of history to return",
      options: ["ORDER", "TRADE"],
    },
  },

  "orders/pending-order-list": {
    type: {
      type: payloadTypes.string,
      default :"pending",
      hidden: true,
      description: "Number of records to return",
    },
  },
};
