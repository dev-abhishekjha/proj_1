import {
  AlertCircle,
  BarChart3,
  Briefcase,
  Database,
  FileText,
  LayoutDashboard,
  List,
  Settings,
  Shield,
  Users,
  Workflow,
} from "lucide-react";

import { ROUTES } from "@/types/routes";

export const navItems = [
  {
    title: "Alerts",
    icon: AlertCircle,
    url: ROUTES.ALERTS,
  },
  {
    title: "Cases",
    icon: Briefcase,
    url: ROUTES.CASES,
  },
  {
    title: "Lists",
    icon: List,
    url: ROUTES.LISTS,
  },
  {
    title: "Rules",
    icon: Shield,
    url: ROUTES.RULES.INDEX,
  },
  {
    title: "Report Filings",
    icon: FileText,
    url: ROUTES.REPORT_FILINGS,
  },
];

export const secondaryNavItems = [
  {
    title: "Dashboards",
    icon: LayoutDashboard,
    url: ROUTES.DASHBOARDS,
  },
  {
    title: "Data Explorer",
    icon: Database,
    url: ROUTES.DATA_EXPLORER,
  },
  {
    title: "Data Management",
    icon: Settings,
    url: ROUTES.DATA_MANAGEMENT,
  },
  {
    title: "Risk Ratings",
    icon: BarChart3,
    url: ROUTES.RISK_RATINGS,
  },
  {
    title: "User Management",
    icon: Users,
    url: ROUTES.USER_MANAGEMENT,
  },
  {
    title: "Workflows",
    icon: Workflow,
    url: ROUTES.WORKFLOWS,
  },
  {
    title: "Reporting",
    icon: FileText,
    url: ROUTES.REPORTING,
  },
];
