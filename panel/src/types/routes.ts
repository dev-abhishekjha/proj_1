export const ROUTES = {
  HOME: "/",
  RULES: {
    INDEX: "/rules",
    CREATE: {
      SIMPLE: "/rules/create/simple",
      SCENARIO: "/rules/create/scenario",
    },
    VIEW: "/rules/view",
  },
  ALERTS: "/alerts",
  CASES: "/cases",
  LISTS: "/lists",
  REPORT_FILINGS: "/report-filings",
  DASHBOARDS: "/dashboards",
  DATA_EXPLORER: "/data-explorer",
  DATA_MANAGEMENT: "/data-management",
  RISK_RATINGS: "/risk-ratings",
  USER_MANAGEMENT: "/user-management",
  WORKFLOWS: "/workflows",
  REPORTING: "/reporting",
} as const;

// Type for all valid routes
export type Route = (typeof ROUTES)[keyof typeof ROUTES] | string;
