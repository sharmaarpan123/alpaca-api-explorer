import { ResponseExample } from './dataTypes';

export const responseExamples: Record<string, ResponseExample[]> = {
  'users/clock': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          afterHours: {
            type: "boolean",
            description: "After hours market status",
          },
          currencies: {
            type: "object",
            values: {
              crypto: { type: "string", description: "Crypto market status" },
              fx: { type: "string", description: "Forex market status" },
            },
          },
          earlyHours: {
            type: "boolean",
            description: "Early hours market status",
          },
          exchanges: {
            type: "object",
            values: {
              nasdaq: {
                type: "string",
                description: "NASDAQ exchange status",
              },
              nyse: { type: "string", description: "NYSE exchange status" },
              otc: { type: "string", description: "OTC exchange status" },
            },
          },
          indicesGroups: {
            type: "object",
            values: {
              s_and_p: { type: "string", description: "S&P market status" },
              societe_generale: {
                type: "string",
                description: "Societe Generale market status",
              },
              msci: {
                type: "string",
                description: "MSCI market status",
              },
              ftse_russell: {
                type: "string",
                description: "FTSE Russell market status",
              },
              mstar: { type: "string", description: "MSTAR market status" },
              mstarc: { type: "string", description: "MSTARC market status" },
              cccy: { type: "string", description: "CCCY market status" },
              cgi: { type: "string", description: "CGI market status" },
              nasdaq: {
                type: "string",
                description: "NASDAQ index group status",
              },
              dow_jones: {
                type: "string",
                description: "Dow Jones market status",
              },
            },
          },
          market: { type: "string", description: "Market status" },
          serverTime: { type: "string", description: "Server time" },
        },
      },
    },
  ],

  'users/get-account-number': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          accountNumber: {
            type: "string",
            description: "User's account number",
          },
          accountId: {
            type: "string",
            description: "Unique identifier for the user's account",
          },
        },
      },
    },
  ],

  'users/get-accounts': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          email: { type: "string", description: "User's email address" },
          accountId: {
            type: "string",
            description: "Unique account identifier",
          },
          first_name: { type: "string", description: "User's first name" },
          last_name: { type: "string", description: "User's last name" },
          mobileNumber: {
            type: "string",
            description: "User's mobile number",
          },
          profileImage: {
            type: "string",
            description: "URL to the user's profile image",
          },
          status: { type: "string", description: "Account approval status" },
          walletCredit: {
            type: "number",
            description: "Credit amount in the wallet",
          },
          buyingPower: {
            type: "number",
            description: "Amount available to buy stocks",
          },
          equity: { type: "number", description: "Total equity value" },
          isAlpacaApproved: {
            type: "boolean",
            description: "Alpaca account approval status",
          },
          openPlValue: {
            type: "number",
            description: "Open profit/loss value",
          },
          affiliatedRequest: {
            type: ["string", "null"],
            description: "Affiliation request status (nullable)",
          },
          cash_withdrawable: {
            type: "number",
            description: "Amount that can be withdrawn",
          },
          openPositionValue: {
            type: "number",
            description: "Value of open stock positions",
          },
          portfolioValue: {
            type: "number",
            description: "Total portfolio value",
          },
          totalValue: {
            type: "number",
            description: "Total value of positions",
          },
          equityPc: {
            type: "number",
            description: "Equity percentage change",
          },
          totalValuePc: {
            type: "number",
            description: "Total value percentage change",
          },
          openPositionValuePc: {
            type: "number",
            description: "Open position value percentage change",
          },
          exchangeRate: {
            type: "number",
            description: "Exchange rate applied to calculations",
          },
        },
      },
    },
  ],

  'stocks/assets': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "Data",
      example: {
        type: "object",
        values: {
          data: {
            type: "Array of object",
            values: {
              _id: { type: "string", description: "Unique stock ID" },
              shortName: {
                type: "string",
                description: "Short name of the company",
              },
              name: {
                type: "string",
                description: "Full company name",
              },
              ISIN: {
                type: "string",
                description: "International Securities Identification Number",
              },
              type: { type: "string", description: "Security type" },
              exchange: {
                type: "string",
                description: "Stock exchange",
              },
              symbol: {
                type: "string",
                description: "Stock ticker symbol",
              },
              industryAbrev: {
                type: "string",
                description: "Industry abbreviation",
              },
              change: {
                type: "number",
                description: "Price change amount",
              },
              changePercentage: {
                type: "number",
                description: "Percentage change in price",
              },
              price: {
                type: "number",
                description: "Current stock price",
              },
              MarketCapitalization: {
                type: "number",
                description: "Market capitalization in USD",
              },
              fractionable: {
                type: "boolean",
                description:
                  "Indicates if the stock supports fractional shares",
              },
            },
          },
          totalcount: {
            type: "number",
            description: "Total number of stock items available",
          },
          totalPages: {
            type: "number",
            description: "Total number of pages available for the data",
          },
        },
      },
    },
  ],

  'stocks/assets-details': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "Data",
      example: {
        type: "object",
        values: {
          MarketCapitalization: {
            type: "number",
            description: "Total market value of the company",
          },
          createdAt: {
            type: "string",
            description: "Creation timestamp (ISO 8601 format)",
          },
          updatedAt: {
            type: "string",
            description: "Last update timestamp (ISO 8601 format)",
          },
          _id: {
            type: "string",
            description: "Unique identifier of the entry",
          },
          ISIN: {
            type: "string",
            description: "International Securities Identification Number",
          },
          type: { type: "string", description: "Type of equity or asset" },
          exchange: {
            type: "string",
            description: "Exchange where the stock is listed",
          },
          symbol: {
            type: "string",
            description: "Ticker symbol of the stock",
          },
          name: { type: "string", description: "Full name of the company" },
          status: {
            type: "string",
            description: "Listing status (e.g. active/inactive)",
          },
          shortName: {
            type: "string",
            description: "Short name or alias for the company",
          },
          industryAbrev: {
            type: "string",
            description: "Abbreviated industry name",
          },
          industryDescription: {
            type: "string",
            description: "Detailed industry description",
          },
          description: {
            type: "string",
            description: "Full business description",
          },
          imgUrl: {
            type: "string",
            description: "URL to the company logo/image",
          },
          imgUrlDark: {
            type: "string",
            description: "URL to the dark version of the image",
          },
          change: { type: "number", description: "Price change value" },
          changePercentage: {
            type: "number",
            description: "Percentage change in price",
          },
          price: { type: "number", description: "Current stock price" },
          shortable: {
            type: "string",
            description: "Shortable status (empty string means unknown)",
          },
          easy_to_borrow: {
            type: "string",
            description: "Easy to borrow status (empty string means unknown)",
          },
          attributes__: {
            type: "string",
            description: "Miscellaneous attributes (if any)",
          },
          maintenance_margin_requirement: {
            type: "string",
            description: "Maintenance margin requirement (if available)",
          },
          fractionable: {
            type: "boolean",
            description: "Indicates whether the stock is fractionable",
          },
        },
      },
    },
  ],

  'stocks/quotes-latest': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "Data",
      example: {
        type: "object",
        values: {
          tickers: {
            type: "Array of object",
            values: {
              ticker: { type: "string", description: "Ticker symbol" },
              todaysChangePerc: {
                type: "number",
                description: "Today's change in percentage",
              },
              todaysChange: {
                type: "number",
                description: "Today's change in price",
              },
              updated: {
                type: "number",
                description:
                  "Last updated timestamp (nanoseconds since epoch)",
              },
              day: {
                type: "object",
                values: {
                  o: { type: "number", description: "Opening price" },
                  h: {
                    type: "number",
                    description: "Highest price of the day",
                  },
                  l: {
                    type: "number",
                    description: "Lowest price of the day",
                  },
                  c: { type: "number", description: "Closing price" },
                  v: { type: "number", description: "Volume" },
                  vw: {
                    type: "number",
                    description: "Volume-weighted average price",
                  },
                },
              },
              lastQuote: {
                type: "object",
                values: {
                  P: { type: "number", description: "Ask price" },
                  S: { type: "number", description: "Ask size" },
                  p: { type: "number", description: "Bid price" },
                  s: { type: "number", description: "Bid size" },
                  t: {
                    type: "number",
                    description: "Quote timestamp (nanoseconds since epoch)",
                  },
                },
              },
              lastTrade: {
                type: "object",
                values: {
                  c: {
                    type: "array",
                    items: { type: "number" },
                    description: "Conditions of the trade",
                  },
                  i: { type: "string", description: "Trade ID" },
                  p: { type: "number", description: "Trade price" },
                  s: { type: "number", description: "Trade size" },
                  t: {
                    type: "number",
                    description: "Trade timestamp (nanoseconds since epoch)",
                  },
                  x: { type: "number", description: "Exchange ID" },
                },
              },
              fmv: { type: "number", description: "Fair market value" },
              min: {
                type: "object",
                values: {
                  av: {
                    type: "number",
                    description: "Aggregate volume",
                  },
                  t: {
                    type: "number",
                    description: "Timestamp (milliseconds since epoch)",
                  },
                  n: {
                    type: "number",
                    description: "Number of trades",
                  },
                  o: {
                    type: "number",
                    description: "Opening price for the minute",
                  },
                  h: {
                    type: "number",
                    description: "High price for the minute",
                  },
                  l: {
                    type: "number",
                    description: "Low price for the minute",
                  },
                  c: {
                    type: "number",
                    description: "Close price for the minute",
                  },
                  v: {
                    type: "number",
                    description: "Trade volume for the minute",
                  },
                  vw: {
                    type: "number",
                    description: "Volume-weighted average price",
                  },
                },
              },
              prevDay: {
                type: "object",
                values: {
                  o: {
                    type: "number",
                    description: "Previous day open",
                  },
                  h: {
                    type: "number",
                    description: "Previous day high",
                  },
                  l: {
                    type: "number",
                    description: "Previous day low",
                  },
                  c: {
                    type: "number",
                    description: "Previous day close",
                  },
                  v: {
                    type: "number",
                    description: "Previous day volume",
                  },
                  vw: {
                    type: "number",
                    description: "Previous day VWAP",
                  },
                },
              },
            },
          },
          status: {
            type: "string",
            description: "Request status (e.g. OK)",
          },
          request_id: {
            type: "string",
            description: "Unique request identifier",
          },
          count: {
            type: "number",
            description: "Number of tickers returned",
          },
        },
      },
    },
  ],

  'stocks/quotes-history': [
    {
      status: "200",
      description: "Successful quote snapshot",
      dataKey: "Data",
      example: {
        type: "object",
        values: {
          results: {
            type: "Array of object",
            values: {
              ask_exchange: {
                type: "number",
                description: "Exchange ID where the ask was quoted",
              },
              ask_price: { type: "number", description: "Ask price" },
              ask_size: { type: "number", description: "Ask size" },
              bid_exchange: {
                type: "number",
                description: "Exchange ID where the bid was quoted",
              },
              bid_price: { type: "number", description: "Bid price" },
              bid_size: { type: "number", description: "Bid size" },
              conditions: {
                type: "array of number",
                description: "Trade quote conditions (coded)",
              },
              indicators: {
                type: "array of number",
                description: "Market indicators (coded)",
              },
              participant_timestamp: {
                type: "number",
                description:
                  "Participant timestamp (nanoseconds since epoch)",
              },
              sequence_number: {
                type: "number",
                description: "Sequence number of the quote event",
              },
              sip_timestamp: {
                type: "number",
                description: "SIP timestamp (nanoseconds since epoch)",
              },
              tape: {
                type: "number",
                description: "Tape identifier (1 = Tape A, 2 = Tape B, etc.)",
              },
            },
          },
          status: {
            type: "string",
            description: "Request status (e.g., OK, DELAYED)",
          },
          request_id: {
            type: "string",
            description: "Unique request identifier",
          },
          next_url: {
            type: "string",
            description: "URL for the next paginated response",
          },
        },
      },
    },
  ],

  'stocks/bars-info': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "Data",
      example: {
        type: "object",
        values: {
          ticker: { type: "string", description: "Stock ticker symbol" },
          queryCount: { type: "number", description: "Total number of records queried" },
          resultsCount: { type: "number", description: "Number of results returned" },
          adjusted: { type: "boolean", description: "Whether the data is adjusted" },
          results: {
            type: "Array of object",
            values: {
              v: { type: "number", description: "Volume" },
              vw: { type: "number", description: "Volume weighted average price" },
              o: { type: "number", description: "Opening price" },
              c: { type: "number", description: "Closing price" },
              h: { type: "number", description: "Highest price" },
              l: { type: "number", description: "Lowest price" },
              t: { type: "number", description: "Timestamp in milliseconds" },
              n: { type: "number", description: "Number of trades" }
            }
          },
          status: { type: "string", description: "Request status" },
          request_id: { type: "string", description: "Unique request identifier" },
          count: { type: "number", description: "Total count of results" },
          next_url: { type: "string", description: "URL for the next page of results" }

        }
      }
    }
  ],

  'stocks/bars-latest': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "Data",
      example: {
        type: "object",
        values: {
          status: { type: "string", description: "Request status (e.g. OK)" },
          from: { type: "string", description: "Date of the bar data" },
          symbol: { type: "string", description: "Stock ticker symbol" },
          open: { type: "number", description: "Opening price" },
          high: { type: "number", description: "Highest price" },
          low: { type: "number", description: "Lowest price" },
          close: { type: "number", description: "Closing price" },
          volume: { type: "number", description: "Trading volume" },
          afterHours: { type: "number", description: "After hours price" },
          preMarket: { type: "number", description: "Pre-market price" }
        }
      }
    }
  ],

  'orders/order-buy': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        data: {
          type: "Array of object",
          values: {
            alpacaOrderId: { type: "string", description: "Alpaca order identifier" },
            status: { type: "string", description: "Order status" },
            client_order_id: { type: "string", description: "Client's order identifier" },
            type: { type: "string", description: "Order type (buy/sell)" },
            order_type: { type: "string", description: "Type of order (limit/stop/etc)" },
            time: { type: ["string", "null"], description: "Order time" },
            day: { type: ["string", "null"], description: "Order day" },
            symbol: { type: "string", description: "Stock symbol" },
            orderPrice: { type: "number", description: "Order price" },
            yesterdayClosePrice: { type: "number", description: "Yesterday's closing price" },
            requestPrice: { type: "number", description: "Requested price" },
            market_price: { type: "number", description: "Current market price" },
            average_price: { type: "number", description: "Average price" },
            executePrice: { type: "number", description: "Execution price" },
            requestAmount: { type: "number", description: "Requested amount" },
            executeAmount: { type: "number", description: "Executed amount" },
            totalStockPrice: { type: "number", description: "Total stock price" },
            stockPrice: { type: "number", description: "Current stock price" },
            avg_entry_price: { type: "number", description: "Average entry price" },
            commission: { type: "number", description: "Commission amount" },
            notional: { type: "number", description: "Notional value" },
            stopPrice: { type: "number", description: "Stop price" },
            fractionable: { type: "boolean", description: "Whether the order is fractionable" },
            stockName: { type: "string", description: "Name of the stock" },
            orderData: {
              type: "object",
              values: {
                id: { type: "string", description: "Order ID" },
                client_order_id: { type: "string", description: "Client order ID" },
                created_at: { type: "string", description: "Creation timestamp" },
                updated_at: { type: "string", description: "Last update timestamp" },
                submitted_at: { type: "string", description: "Submission timestamp" },
                filled_at: { type: ["string", "null"], description: "Fill timestamp" },
                expired_at: { type: ["string", "null"], description: "Expiration timestamp" },
                canceled_at: { type: ["string", "null"], description: "Cancellation timestamp" },
                failed_at: { type: ["string", "null"], description: "Failure timestamp" },
                replaced_at: { type: ["string", "null"], description: "Replacement timestamp" },
                replaced_by: { type: ["string", "null"], description: "Replaced by order ID" },
                replaces: { type: ["string", "null"], description: "Replaces order ID" },
                asset_id: { type: "string", description: "Asset identifier" },
                symbol: { type: "string", description: "Stock symbol" },
                asset_class: { type: "string", description: "Asset class" },
                notional: { type: ["number", "null"], description: "Notional value" },
                qty: { type: "string", description: "Quantity" },
                filled_qty: { type: "string", description: "Filled quantity" },
                filled_avg_price: { type: ["number", "null"], description: "Average fill price" },
                order_class: { type: "string", description: "Order class" },
                order_type: { type: "string", description: "Order type" },
                type: { type: "string", description: "Order type" },
                side: { type: "string", description: "Order side" },
                position_intent: { type: "string", description: "Position intent" },
                time_in_force: { type: "string", description: "Time in force" },
                limit_price: { type: ["number", "null"], description: "Limit price" },
                stop_price: { type: "string", description: "Stop price" },
                status: { type: "string", description: "Order status" },
                extended_hours: { type: "boolean", description: "Extended hours flag" },
                legs: { type: ["array", "null"], description: "Order legs" },
                trail_percent: { type: ["number", "null"], description: "Trail percentage" },
                trail_price: { type: ["number", "null"], description: "Trail price" },
                hwm: { type: ["number", "null"], description: "High water mark" },
                commission: { type: "string", description: "Commission amount" },
                commission_type: { type: "string", description: "Commission type" },
                subtag: { type: ["string", "null"], description: "Subtag" },
                source: { type: ["string", "null"], description: "Source" },
                expires_at: { type: "string", description: "Expiration timestamp" }
              }
            },
            userId: { type: "string", description: "User identifier" },
            userDetails: { type: "string", description: "User details" },
            isFraction: { type: "boolean", description: "Fractional order flag" },
            timezone: { type: ["string", "null"], description: "Timezone" },
            brokerAmount: { type: "number", description: "Broker amount" },
            qty: { type: "number", description: "Quantity" },
            limitPrice: { type: "number", description: "Limit price" },
            religion: { type: "string", description: "Currency" },
            orderNumber: { type: "string", description: "Order number" },
            scheduled: { type: "string", description: "Schedule time" },
            timeType: { type: ["string", "null"], description: "Time type" },
            flutterwaveResponseData: { type: ["object", "null"], description: "Flutterwave response data" },
            scheduledOrders: { type: "array", description: "Scheduled orders" },
            scheduledOrdersIds: { type: "array", description: "Scheduled order IDs" },
            open_order_id: { type: ["string", "null"], description: "Open order ID" },
            open_order_ids: { type: "array", description: "Open order IDs" },
            createdAt: { type: "string", description: "Creation timestamp" },
            canceleOrderData: { type: ["object", "null"], description: "Cancellation data" },
            _id: { type: "string", description: "Unique identifier" }
          }
        }
      }
    }
  ],

  'orders/pending-order-list': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "Array of object",
        values: {
          id: { type: "string", description: "Order identifier" },
          client_order_id: { type: "string", description: "Client's order identifier" },
          created_at: { type: "string", description: "Creation timestamp" },
          updated_at: { type: "string", description: "Last update timestamp" },
          submitted_at: { type: "string", description: "Submission timestamp" },
          filled_at: { type: ["string", "null"], description: "Fill timestamp" },
          expired_at: { type: ["string", "null"], description: "Expiration timestamp" },
          canceled_at: { type: ["string", "null"], description: "Cancellation timestamp" },
          failed_at: { type: ["string", "null"], description: "Failure timestamp" },
          replaced_at: { type: ["string", "null"], description: "Replacement timestamp" },
          replaced_by: { type: ["string", "null"], description: "Replaced by order ID" },
          replaces: { type: ["string", "null"], description: "Replaces order ID" },
          asset_id: { type: "string", description: "Asset identifier" },
          symbol: { type: "string", description: "Stock symbol" },
          asset_class: { type: "string", description: "Asset class" },
          notional: { type: ["number", "null"], description: "Notional value" },
          qty: { type: "string", description: "Quantity" },
          filled_qty: { type: "string", description: "Filled quantity" },
          filled_avg_price: { type: ["number", "null"], description: "Average fill price" },
          order_class: { type: "string", description: "Order class" },
          order_type: { type: "string", description: "Order type" },
          type: { type: "string", description: "Order type" },
          side: { type: "string", description: "Order side" },
          position_intent: { type: "string", description: "Position intent" },
          time_in_force: { type: "string", description: "Time in force" },
          limit_price: { type: ["number", "null"], description: "Limit price" },
          stop_price: { type: "string", description: "Stop price" },
          status: { type: "string", description: "Order status" },
          extended_hours: { type: "boolean", description: "Extended hours flag" },
          legs: { type: ["array", "null"], description: "Order legs" },
          trail_percent: { type: ["number", "null"], description: "Trail percentage" },
          trail_price: { type: ["number", "null"], description: "Trail price" },
          hwm: { type: ["number", "null"], description: "High water mark" },
          commission: { type: "number", description: "Commission amount" },
          commission_type: { type: "string", description: "Commission type" },
          subtag: { type: ["string", "null"], description: "Subtag" },
          source: { type: ["string", "null"], description: "Source" },
          expires_at: { type: "string", description: "Expiration timestamp" },
          shortName: { type: "string", description: "Short name of the company" },
          name: { type: "string", description: "Full company name" },
          imgUrl: { type: "string", description: "Company logo URL" },
          imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
          stockName: { type: "string", description: "Stock name" },
          currentPrice: { type: "number", description: "Current stock price" },
          scheduledAt: { type: ["string", "null"], description: "Scheduled time" },
          scheduled: { type: ["string", "null"], description: "Schedule status" },
          order_id: { type: "string", description: "Order identifier" },
          requestPrice: { type: "number", description: "Requested price" },
          requestAmount: { type: "number", description: "Requested amount" },
          executePrice: { type: "number", description: "Execution price" },
          executeAmount: { type: "number", description: "Executed amount" },
          amount: { type: "number", description: "Total amount" },
          stockPrice: { type: "number", description: "Stock price" },
          orderPrice: { type: "number", description: "Order price" }
        }
      }
    }
  ],

  "orders/order-details": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          asset_id: { type: "string", description: "Unique identifier for the asset" },
          symbol: { type: "string", description: "Stock ticker symbol" },
          exchange: { type: "string", description: "Stock exchange where the asset is traded" },
          asset_class: { type: "string", description: "Class of the asset (e.g., us_equity)" },
          asset_marginable: { type: "boolean", description: "Whether the asset can be margined" },
          qty: { type: "string", description: "Quantity of shares" },
          avg_entry_price: { type: "string", description: "Average entry price" },
          side: { type: "string", description: "Position side (long/short)" },
          market_value: { type: "string", description: "Current market value" },
          cost_basis: { type: "string", description: "Total cost basis" },
          unrealized_pl: { type: "string", description: "Unrealized profit/loss" },
          unrealized_plpc: { type: "string", description: "Unrealized profit/loss percentage" },
          unrealized_intraday_pl: { type: "string", description: "Unrealized intraday profit/loss" },
          unrealized_intraday_plpc: { type: "string", description: "Unrealized intraday profit/loss percentage" },
          current_price: { type: "string", description: "Current market price" },
          lastday_price: { type: "string", description: "Previous day's closing price" },
          change_today: { type: "string", description: "Price change percentage today" },
          qty_available: { type: "string", description: "Available quantity for trading" },
          order_type: { type: "string", description: "Type of order (market/limit/etc)" },
          scheduledAt: { type: ["string", "null"], description: "Scheduled execution time" },
          scheduled: { type: ["string", "null"], description: "Schedule status" },
          order_id: { type: "string", description: "Unique order identifier" },
          alpacaOrderId: { type: "string", description: "Alpaca order identifier" },
          boughtPrice: { type: "number", description: "Price at which the position was bought" },
          executePrice: { type: "string", description: "Execution price" },
          executeAmount: { type: "string", description: "Executed amount" },
          requestAmount: { type: "number", description: "Requested amount" },
          requestPrice: { type: "number", description: "Requested price" },
          shortName: { type: "string", description: "Short name of the company" },
          name: { type: "string", description: "Full company name" },
          imgUrl: { type: "string", description: "Company logo URL" },
          imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
          stockName: { type: "string", description: "Full stock name" },
          isBookmark: { type: "boolean", description: "Whether the stock is bookmarked" },
          fractionable: { type: "boolean", description: "Whether the stock supports fractional shares" }
        }
      }
    }
  ],

  "orders/delete-pending-order": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          _id: { type: "string", description: "Unique identifier for the order" },
          alpacaOrderId: { type: "string", description: "Alpaca order identifier" },
          status: { type: "string", description: "Order status (e.g., canceled)" },
          client_order_id: { type: "string", description: "Client's order identifier" },
          type: { type: "string", description: "Order type (buy/sell)" },
          order_type: { type: "string", description: "Type of order (limit/stop/etc)" },
          time: { type: ["string", "null"], description: "Order time" },
          day: { type: ["string", "null"], description: "Order day" },
          symbol: { type: "string", description: "Stock symbol" },
          orderPrice: { type: "number", description: "Order price" },
          yesterdayClosePrice: { type: "number", description: "Yesterday's closing price" },
          requestPrice: { type: "number", description: "Requested price" },
          market_price: { type: "number", description: "Current market price" },
          average_price: { type: "number", description: "Average price" },
          executePrice: { type: "number", description: "Execution price" },
          requestAmount: { type: "number", description: "Requested amount" },
          executeAmount: { type: "number", description: "Executed amount" },
          totalStockPrice: { type: "number", description: "Total stock price" },
          stockPrice: { type: "number", description: "Current stock price" },
          avg_entry_price: { type: "number", description: "Average entry price" },
          commission: { type: "number", description: "Commission amount" },
          notional: { type: "number", description: "Notional value" },
          stopPrice: { type: "number", description: "Stop price" },
          fractionable: { type: "boolean", description: "Whether the order is fractionable" },
          stockName: { type: "string", description: "Name of the stock" },
          orderData: {
            type: "object",
            values: {
              id: { type: "string", description: "Order ID" },
              client_order_id: { type: "string", description: "Client order ID" },
              created_at: { type: "string", description: "Creation timestamp" },
              updated_at: { type: "string", description: "Last update timestamp" },
              submitted_at: { type: "string", description: "Submission timestamp" },
              filled_at: { type: ["string", "null"], description: "Fill timestamp" },
              expired_at: { type: ["string", "null"], description: "Expiration timestamp" },
              canceled_at: { type: ["string", "null"], description: "Cancellation timestamp" },
              failed_at: { type: ["string", "null"], description: "Failure timestamp" },
              replaced_at: { type: ["string", "null"], description: "Replacement timestamp" },
              replaced_by: { type: ["string", "null"], description: "Replaced by order ID" },
              replaces: { type: ["string", "null"], description: "Replaces order ID" },
              asset_id: { type: "string", description: "Asset identifier" },
              symbol: { type: "string", description: "Stock symbol" },
              asset_class: { type: "string", description: "Asset class" },
              notional: { type: ["number", "null"], description: "Notional value" },
              qty: { type: "string", description: "Quantity" },
              filled_qty: { type: "string", description: "Filled quantity" },
              filled_avg_price: { type: ["number", "null"], description: "Average fill price" },
              order_class: { type: "string", description: "Order class" },
              order_type: { type: "string", description: "Order type" },
              type: { type: "string", description: "Order type" },
              side: { type: "string", description: "Order side" },
              position_intent: { type: "string", description: "Position intent" },
              time_in_force: { type: "string", description: "Time in force" },
              limit_price: { type: ["number", "null"], description: "Limit price" },
              stop_price: { type: "string", description: "Stop price" },
              status: { type: "string", description: "Order status" },
              extended_hours: { type: "boolean", description: "Extended hours flag" },
              legs: { type: ["array", "null"], description: "Order legs" },
              trail_percent: { type: ["number", "null"], description: "Trail percentage" },
              trail_price: { type: ["number", "null"], description: "Trail price" },
              hwm: { type: ["number", "null"], description: "High water mark" },
              commission: { type: "string", description: "Commission amount" },
              commission_type: { type: "string", description: "Commission type" },
              subtag: { type: ["string", "null"], description: "Subtag" },
              source: { type: ["string", "null"], description: "Source" },
              expires_at: { type: "string", description: "Expiration timestamp" }
            }
          },
          userId: { type: "string", description: "User identifier" },
          userDetails: { type: "string", description: "User details" },
          isFraction: { type: "boolean", description: "Fractional order flag" },
          timezone: { type: ["string", "null"], description: "Timezone" },
          brokerAmount: { type: "number", description: "Broker amount" },
          qty: { type: "number", description: "Quantity" },
          limitPrice: { type: "number", description: "Limit price" },
          religion: { type: "string", description: "Currency" },
          orderNumber: { type: "string", description: "Order number" },
          scheduled: { type: "string", description: "Schedule time" },
          timeType: { type: ["string", "null"], description: "Time type" },
          flutterwaveResponseData: { type: ["object", "null"], description: "Flutterwave response data" },
          scheduledOrders: { type: "array", description: "Scheduled orders" },
          scheduledOrdersIds: { type: "array", description: "Scheduled order IDs" },
          open_order_id: { type: ["string", "null"], description: "Open order ID" },
          open_order_ids: { type: "array", description: "Open order IDs" },
          createdAt: { type: "string", description: "Creation timestamp" },
          canceleOrderData: { type: "string", description: "Cancellation data" },
          canceledAt: { type: "string", description: "Cancellation timestamp" }
        }
      }
    }
  ],

  "orders/replace-orders": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          data: { type: "string", description: "success Message" },
        }
      }
    }
  ]
  ,
  "orders/open-position": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "Array of object",
        values: {
          asset_id: { type: "string", description: "Unique identifier for the asset" },
          symbol: { type: "string", description: "Stock ticker symbol" },
          exchange: { type: "string", description: "Stock exchange where the asset is traded" },
          asset_class: { type: "string", description: "Class of the asset (e.g., us_equity)" },
          asset_marginable: { type: "boolean", description: "Whether the asset can be margined" },
          qty: { type: "string", description: "Quantity of shares" },
          avg_entry_price: { type: "string", description: "Average entry price" },
          side: { type: "string", description: "Position side (long/short)" },
          market_value: { type: "string", description: "Current market value" },
          cost_basis: { type: "string", description: "Total cost basis" },
          unrealized_pl: { type: "string", description: "Unrealized profit/loss" },
          unrealized_plpc: { type: "string", description: "Unrealized profit/loss percentage" },
          unrealized_intraday_pl: { type: "string", description: "Unrealized intraday profit/loss" },
          unrealized_intraday_plpc: { type: "string", description: "Unrealized intraday profit/loss percentage" },
          current_price: { type: "string", description: "Current market price" },
          lastday_price: { type: "string", description: "Previous day's closing price" },
          change_today: { type: "string", description: "Price change percentage today" },
          qty_available: { type: "string", description: "Available quantity for trading" },
          order_type: { type: "string", description: "Type of order (market/limit/etc)" },
          scheduledAt: { type: ["string", "null"], description: "Scheduled execution time" },
          scheduled: { type: ["string", "null"], description: "Schedule status" },
          order_id: { type: "string", description: "Unique order identifier" },
          alpacaOrderId: { type: "string", description: "Alpaca order identifier" },
          boughtPrice: { type: "number", description: "Price at which the position was bought" },
          executePrice: { type: "string", description: "Execution price" },
          executeAmount: { type: "string", description: "Executed amount" },
          requestAmount: { type: "number", description: "Requested amount" },
          requestPrice: { type: "number", description: "Requested price" },
          shortName: { type: "string", description: "Short name of the company" },
          name: { type: "string", description: "Full company name" },
          imgUrl: { type: "string", description: "Company logo URL" },
          imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
          stockName: { type: "string", description: "Full stock name" },
          isBookmark: { type: "boolean", description: "Whether the stock is bookmarked" },
          fractionable: { type: "boolean", description: "Whether the stock supports fractional shares" }
        }
      }
    }
  ]
  ,
  "orders/open-position-symbol": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "Array of object",
        values: {
          asset_id: { type: "string", description: "Unique identifier for the asset" },
          symbol: { type: "string", description: "Stock ticker symbol" },
          exchange: { type: "string", description: "Stock exchange where the asset is traded" },
          asset_class: { type: "string", description: "Class of the asset (e.g., us_equity)" },
          asset_marginable: { type: "boolean", description: "Whether the asset can be margined" },
          qty: { type: "string", description: "Quantity of shares" },
          avg_entry_price: { type: "string", description: "Average entry price" },
          side: { type: "string", description: "Position side (long/short)" },
          market_value: { type: "string", description: "Current market value" },
          cost_basis: { type: "string", description: "Total cost basis" },
          unrealized_pl: { type: "string", description: "Unrealized profit/loss" },
          unrealized_plpc: { type: "string", description: "Unrealized profit/loss percentage" },
          unrealized_intraday_pl: { type: "string", description: "Unrealized intraday profit/loss" },
          unrealized_intraday_plpc: { type: "string", description: "Unrealized intraday profit/loss percentage" },
          current_price: { type: "string", description: "Current market price" },
          lastday_price: { type: "string", description: "Previous day's closing price" },
          change_today: { type: "string", description: "Price change percentage today" },
          qty_available: { type: "string", description: "Available quantity for trading" },
          order_type: { type: "string", description: "Type of order (market/limit/etc)" },
          scheduledAt: { type: ["string", "null"], description: "Scheduled execution time" },
          scheduled: { type: ["string", "null"], description: "Schedule status" },
          order_id: { type: "string", description: "Unique order identifier" },
          alpacaOrderId: { type: "string", description: "Alpaca order identifier" },
          boughtPrice: { type: "number", description: "Price at which the position was bought" },
          executePrice: { type: "string", description: "Execution price" },
          executeAmount: { type: "string", description: "Executed amount" },
          requestAmount: { type: "number", description: "Requested amount" },
          requestPrice: { type: "number", description: "Requested price" },
          shortName: { type: "string", description: "Short name of the company" },
          name: { type: "string", description: "Full company name" },
          imgUrl: { type: "string", description: "Company logo URL" },
          imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
          stockName: { type: "string", description: "Full stock name" },
          isBookmark: { type: "boolean", description: "Whether the stock is bookmarked" },
          fractionable: { type: "boolean", description: "Whether the stock supports fractional shares" }
        }
      }
    }
  ]
  ,
  "orders/close-position-symbol": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          id: { type: "string", description: "Unique identifier for the order" },
          client_order_id: { type: "string", description: "Client's order identifier" },
          created_at: { type: "string", description: "Creation timestamp" },
          updated_at: { type: "string", description: "Last update timestamp" },
          submitted_at: { type: "string", description: "Submission timestamp" },
          filled_at: { type: ["string", "null"], description: "Fill timestamp" },
          expired_at: { type: ["string", "null"], description: "Expiration timestamp" },
          canceled_at: { type: ["string", "null"], description: "Cancellation timestamp" },
          failed_at: { type: ["string", "null"], description: "Failure timestamp" },
          replaced_at: { type: ["string", "null"], description: "Replacement timestamp" },
          replaced_by: { type: ["string", "null"], description: "Replaced by order ID" },
          replaces: { type: ["string", "null"], description: "Replaces order ID" },
          asset_id: { type: "string", description: "Asset identifier" },
          symbol: { type: "string", description: "Stock symbol" },
          asset_class: { type: "string", description: "Asset class" },
          notional: { type: ["number", "null"], description: "Notional value" },
          qty: { type: "string", description: "Quantity of shares" },
          filled_qty: { type: "string", description: "Filled quantity" },
          filled_avg_price: { type: ["number", "null"], description: "Average fill price" },
          order_class: { type: "string", description: "Order class" },
          order_type: { type: "string", description: "Type of order (market/limit/etc)" },
          type: { type: "string", description: "Order type" },
          side: { type: "string", description: "Order side (buy/sell)" },
          position_intent: { type: "string", description: "Position intent" },
          time_in_force: { type: "string", description: "Time in force" },
          limit_price: { type: ["number", "null"], description: "Limit price" },
          stop_price: { type: ["number", "null"], description: "Stop price" },
          status: { type: "string", description: "Order status" },
          extended_hours: { type: "boolean", description: "Extended hours flag" },
          legs: { type: ["array", "null"], description: "Order legs" },
          trail_percent: { type: ["number", "null"], description: "Trail percentage" },
          trail_price: { type: ["number", "null"], description: "Trail price" },
          hwm: { type: ["number", "null"], description: "High water mark" },
          subtag: { type: ["string", "null"], description: "Subtag" },
          source: { type: ["string", "null"], description: "Source" },
          expires_at: { type: "string", description: "Expiration timestamp" }
        }
      }
    }
  ],

  "orders/order-history": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "Array of object",
        values: {
          id: { type: "string", description: "Unique identifier for the order" },
          client_order_id: { type: "string", description: "Client's order identifier" },
          created_at: { type: "string", description: "Creation timestamp" },
          updated_at: { type: "string", description: "Last update timestamp" },
          submitted_at: { type: "string", description: "Submission timestamp" },
          filled_at: { type: ["string", "null"], description: "Fill timestamp" },
          expired_at: { type: ["string", "null"], description: "Expiration timestamp" },
          canceled_at: { type: ["string", "null"], description: "Cancellation timestamp" },
          failed_at: { type: ["string", "null"], description: "Failure timestamp" },
          replaced_at: { type: ["string", "null"], description: "Replacement timestamp" },
          replaced_by: { type: ["string", "null"], description: "Replaced by order ID" },
          replaces: { type: ["string", "null"], description: "Replaces order ID" },
          asset_id: { type: "string", description: "Asset identifier" },
          symbol: { type: "string", description: "Stock symbol" },
          asset_class: { type: "string", description: "Asset class" },
          notional: { type: ["number", "null"], description: "Notional value" },
          qty: { type: "string", description: "Quantity of shares" },
          filled_qty: { type: "string", description: "Filled quantity" },
          filled_avg_price: { type: "string", description: "Average fill price" },
          order_class: { type: "string", description: "Order class" },
          order_type: { type: "string", description: "Type of order (market/limit/etc)" },
          type: { type: "string", description: "Order type" },
          side: { type: "string", description: "Order side (buy/sell)" },
          position_intent: { type: "string", description: "Position intent" },
          time_in_force: { type: "string", description: "Time in force" },
          limit_price: { type: ["number", "null"], description: "Limit price" },
          stop_price: { type: ["number", "null"], description: "Stop price" },
          status: { type: "string", description: "Order status" },
          extended_hours: { type: "boolean", description: "Extended hours flag" },
          legs: { type: ["array", "null"], description: "Order legs" },
          trail_percent: { type: ["number", "null"], description: "Trail percentage" },
          trail_price: { type: ["number", "null"], description: "Trail price" },
          hwm: { type: ["number", "null"], description: "High water mark" },
          subtag: { type: ["string", "null"], description: "Subtag" },
          source: { type: ["string", "null"], description: "Source" },
          expires_at: { type: "string", description: "Expiration timestamp" },
          shortName: { type: "string", description: "Short name of the company" },
          name: { type: "string", description: "Full company name" },
          imgUrl: { type: "string", description: "Company logo URL" },
          imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
          stockName: { type: "string", description: "Full stock name" },
          scheduledAt: { type: ["string", "null"], description: "Scheduled execution time" },
          scheduled: { type: ["string", "null"], description: "Schedule status" },
          order_id: { type: "string", description: "Unique order identifier" },
          requestPrice: { type: "number", description: "Requested price" },
          requestAmount: { type: "number", description: "Requested amount" },
          executePrice: { type: "number", description: "Execution price" },
          executeAmount: { type: "number", description: "Executed amount" },
          amount: { type: "number", description: "Total amount" },
          stockPrice: { type: "number", description: "Current stock price" },
          commission: { type: "number", description: "Commission amount" },
          orderPrice: { type: "number", description: "Order price" }
        }
      }
    }
  ],

  "orders/account-activities": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          tradeActivity: {
            type: "Array of object",
            values: {
              id: { type: "string", description: "Unique identifier for the trade activity" },
              account_id: { type: "string", description: "Account identifier" },
              activity_type: { type: "string", description: "Type of activity (e.g., FILL)" },
              transaction_time: { type: "string", description: "Transaction timestamp" },
              type: { type: "string", description: "Transaction type (e.g., partial_fill)" },
              price: { type: "string", description: "Transaction price" },
              qty: { type: "string", description: "Transaction quantity" },
              side: { type: "string", description: "Transaction side (buy/sell)" },
              symbol: { type: "string", description: "Stock symbol" },
              leaves_qty: { type: "string", description: "Remaining quantity" },
              order_id: { type: "string", description: "Order identifier" },
              cum_qty: { type: "string", description: "Cumulative quantity" },
              order_status: { type: "string", description: "Order status" },
              shortName: { type: "string", description: "Short name of the company" },
              name: { type: "string", description: "Full company name" },
              imgUrl: { type: "string", description: "Company logo URL" },
              imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
              stockName: { type: "string", description: "Full stock name" }
            }
          }
        }
      }
    }
  ],
  'orders/account-activities-type': [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          tradeActivity: {
            type: "Array of object",
            values: {
              id: { type: "string", description: "Unique identifier for the trade activity" },
              account_id: { type: "string", description: "Account identifier" },
              activity_type: { type: "string", description: "Type of activity (e.g., FILL)" },
              transaction_time: { type: "string", description: "Transaction timestamp" },
              type: { type: "string", description: "Transaction type (e.g., partial_fill)" },
              price: { type: "string", description: "Transaction price" },
              qty: { type: "string", description: "Transaction quantity" },
              side: { type: "string", description: "Transaction side (buy/sell)" },
              symbol: { type: "string", description: "Stock symbol" },
              leaves_qty: { type: "string", description: "Remaining quantity" },
              order_id: { type: "string", description: "Order identifier" },
              cum_qty: { type: "string", description: "Cumulative quantity" },
              order_status: { type: "string", description: "Order status" },
              shortName: { type: "string", description: "Short name of the company" },
              name: { type: "string", description: "Full company name" },
              imgUrl: { type: "string", description: "Company logo URL" },
              imgUrlDark: { type: "string", description: "Dark mode company logo URL" },
              stockName: { type: "string", description: "Full stock name" }
            }
          },
          nonTradeActivity: {
            type: "Array of object",
            values: {
              id: { type: "string", description: "Unique identifier for the activity" },
              account_id: { type: "string", description: "Account identifier" },
              activity_type: { type: "string", description: "Type of activity (e.g., FEE)" },
              activity_sub_type: { type: "string", description: "Subtype of activity (e.g., CAT)" },
              date: { type: "string", description: "Activity date" },
              net_amount: { type: "string", description: "Net amount of the activity" },
              description: { type: "string", description: "Description of the activity" },
              status: { type: "string", description: "Activity status" }

            }
          }
        }
      }
    }


  ]
  ,
  "orders/close-all-position": [
    {
      status: "200",
      description: "Successful operation",
      dataKey: "data",
      example: {
        type: "object",
        values: {
          success: {
            type: "Array of object",
            values: {
              id: { type: "string", description: "Unique identifier for the order" },
              client_order_id: { type: "string", description: "Client's order identifier" },
              created_at: { type: "string", description: "Creation timestamp" },
              updated_at: { type: "string", description: "Last update timestamp" },
              submitted_at: { type: "string", description: "Submission timestamp" },
              filled_at: { type: ["string", "null"], description: "Fill timestamp" },
              expired_at: { type: ["string", "null"], description: "Expiration timestamp" },
              canceled_at: { type: ["string", "null"], description: "Cancellation timestamp" },
              failed_at: { type: ["string", "null"], description: "Failure timestamp" },
              replaced_at: { type: ["string", "null"], description: "Replacement timestamp" },
              replaced_by: { type: ["string", "null"], description: "Replaced by order ID" },
              replaces: { type: ["string", "null"], description: "Replaces order ID" },
              asset_id: { type: "string", description: "Asset identifier" },
              symbol: { type: "string", description: "Stock symbol" },
              asset_class: { type: "string", description: "Asset class" },
              notional: { type: ["number", "null"], description: "Notional value" },
              qty: { type: "string", description: "Quantity of shares" },
              filled_qty: { type: "string", description: "Filled quantity" },
              filled_avg_price: { type: ["number", "null"], description: "Average fill price" },
              order_class: { type: "string", description: "Order class" },
              order_type: { type: "string", description: "Type of order (market/limit/etc)" },
              type: { type: "string", description: "Order type" },
              side: { type: "string", description: "Order side (buy/sell)" },
              position_intent: { type: "string", description: "Position intent" },
              time_in_force: { type: "string", description: "Time in force" },
              limit_price: { type: ["number", "null"], description: "Limit price" },
              stop_price: { type: ["number", "null"], description: "Stop price" },
              status: { type: "string", description: "Order status" },
              extended_hours: { type: "boolean", description: "Extended hours flag" },
              legs: { type: ["array", "null"], description: "Order legs" },
              trail_percent: { type: ["number", "null"], description: "Trail percentage" },
              trail_price: { type: ["number", "null"], description: "Trail price" },
              hwm: { type: ["number", "null"], description: "High water mark" },
              subtag: { type: ["string", "null"], description: "Subtag" },
              source: { type: ["string", "null"], description: "Source" },
              expires_at: { type: "string", description: "Expiration timestamp" }
            }
          }
        }
      }
    }
  ]
};
