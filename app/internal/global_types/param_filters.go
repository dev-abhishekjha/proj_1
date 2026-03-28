package global_types

import (
	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

var (
	TableNameEntities          = "entities"
	TableNameEntityMetrics     = "entity_metrics"
	TableNameEntityTransitions = "entity_transitions"
	TableNameEntityApis        = "entity_apis"
	TableNameKpis              = "kpis"
	TableNameKpiRelationships  = "kpis_relationships"

	ColumnNameFeatureID     utils.Query = "feature_id"
	ColumnNameCode          utils.Query = "code"
	ColumnNameName          utils.Query = "name"
	ColumnNameIsStart       utils.Query = "is_start"
	ColumnNameIsTerminal    utils.Query = "is_terminal"
	ColumnNameCreatedAtFrom utils.Query = "created_at_from"
	ColumnNameCreatedAtTo   utils.Query = "created_at_to"

	ColumnNameWindowStartFrom utils.Query = "window_start_from"
	ColumnNameWindowStartTo   utils.Query = "window_start_to"
	ColumnNameWindowMinutes   utils.Query = "window_minutes"

	ColumnNameFromEntityID   utils.Query = "from_entity_id"
	ColumnNameToEntityID     utils.Query = "to_entity_id"
	ColumnNameTransitionType utils.Query = "transition_type"

	ColumnNameEntityID utils.Query = "entity_id"
	ColumnNameApiID    utils.Query = "api_id"

	ColumnNameCreatedAt   utils.Query = "created_at"
	ColumnNameWindowStart utils.Query = "window_start"
)

const (
	TableServiceDeployments = "service_deployments"
	TableServices           = "services"
	TableTeams              = "teams"
	TableFeatures           = "features"
	TableFeatureInstances   = "feature_instances"
	TableFeatureMetrics     = "feature_metrics"
)

const (
	QueryServiceID           utils.Query = "service_id"
	QueryEnvironment         utils.Query = "environment"
	QueryVersion             utils.Query = "version"
	QueryCommitHash          utils.Query = "commit_hash"
	QueryDeployedAtFrom      utils.Query = "deployed_at_from"
	QueryDeployedAtTo        utils.Query = "deployed_at_to"
	QueryDeployedAt          utils.Query = "deployed_at"
	QueryServiceDeploymentID utils.Query = "id"
	QueryCode                utils.Query = "code"
	QueryName                utils.Query = "name"
	QueryCriticalityLevel    utils.Query = "criticality_level"
	QueryRepositoryURL       utils.Query = "repository_url"
	QueryCreatedAtFrom       utils.Query = "created_at_from"
	QueryCreatedAtTo         utils.Query = "created_at_to"
	QuerySlackChannel        utils.Query = "slack_channel"
	QueryOncallEmail         utils.Query = "oncall_email"
	QueryIsActive            utils.Query = "is_active"
	QueryFeatureID           utils.Query = "feature_id"
	QueryStatus              utils.Query = "status"
	QueryStartedAtFrom       utils.Query = "started_at_from"
	QueryStartedAtTo         utils.Query = "started_at_to"
	QueryCompletedAtFrom     utils.Query = "completed_at_from"
	QueryCompletedAtTo       utils.Query = "completed_at_to"
	QueryCompletedAt         utils.Query = "completed_at"
	QueryFeatureInstanceID   utils.Query = "id"
	QueryWindowStartFrom     utils.Query = "window_start_from"
	QueryWindowStartTo       utils.Query = "window_start_to"
	QueryWindowMinutes       utils.Query = "window_minutes"

	QueryMetricType       utils.Query = "metric_type"
	QueryUnit             utils.Query = "unit"
	QueryKpiID            utils.Query = "kpi_id"
	QueryRelationType     utils.Query = "relation_type"
	QueryTargetType       utils.Query = "target_type"
	QueryTargetID         utils.Query = "target_id"
	QueryWeightSetBy      utils.Query = "weight_set_by"
	QueryWeightReviewedBy utils.Query = "weight_reviewed_by"
)

var MapQueryToServiceDeploymentProperty = map[utils.Query]utils.SearchProperty{
	QueryServiceID: {
		ColumnName: "service_id",
		TableName:  TableServiceDeployments,
		Operator:   utils.OperatorEqual,
	},
	QueryEnvironment: {
		ColumnName: "environment",
		TableName:  TableServiceDeployments,
		Operator:   utils.OperatorEqual,
	},
	QueryVersion: {
		ColumnName: "version",
		TableName:  TableServiceDeployments,
		Operator:   utils.OperatorEqual,
	},
	QueryCommitHash: {
		ColumnName: "commit_hash",
		TableName:  TableServiceDeployments,
		Operator:   utils.OperatorEqual,
	},
	QueryDeployedAtFrom: {
		ColumnName: "deployed_at",
		TableName:  TableServiceDeployments,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryDeployedAtTo: {
		ColumnName: "deployed_at",
		TableName:  TableServiceDeployments,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

// Cursor fields for service deployments, applied in order of precedence; must include unique field as last field
var ServiceDeploymentsCursorFieldsList = []utils.CursorProperty{
	{
		QueryParam: QueryDeployedAt,
		ColumnName: "deployed_at",
		TableName:  TableServiceDeployments,
	},
	{
		QueryParam: QueryServiceDeploymentID,
		ColumnName: "id",
		TableName:  TableServiceDeployments,
	},
}

var MapQueryToServiceProperty = map[utils.Query]utils.SearchProperty{
	QueryCode: {
		ColumnName: "code",
		TableName:  TableServices,
		Operator:   utils.OperatorEqual,
	},
	QueryName: {
		ColumnName: "name",
		TableName:  TableServices,
		Operator:   utils.OperatorLike,
	},
	QueryCriticalityLevel: {
		ColumnName: "criticality_level",
		TableName:  TableServices,
		Operator:   utils.OperatorEqual,
	},
	QueryRepositoryURL: {
		ColumnName: "repository_url",
		TableName:  TableServices,
		Operator:   utils.OperatorLike,
	},
	QueryCreatedAtFrom: {
		ColumnName: "created_at",
		TableName:  TableServices,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCreatedAtTo: {
		ColumnName: "created_at",
		TableName:  TableServices,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

var MapQueryToTeamProperty = map[utils.Query]utils.SearchProperty{
	QueryName: {
		ColumnName: "name",
		TableName:  TableTeams,
		Operator:   utils.OperatorLike,
	},
	QuerySlackChannel: {
		ColumnName: "slack_channel",
		TableName:  TableTeams,
		Operator:   utils.OperatorLike,
	},
	QueryOncallEmail: {
		ColumnName: "oncall_email",
		TableName:  TableTeams,
		Operator:   utils.OperatorLike,
	},
	QueryCreatedAtFrom: {
		ColumnName: "created_at",
		TableName:  TableTeams,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCreatedAtTo: {
		ColumnName: "created_at",
		TableName:  TableTeams,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

// Feature filter mappings (offset pagination, like services)
var MapQueryToFeatureProperty = map[utils.Query]utils.SearchProperty{
	QueryCode: {
		ColumnName: "code",
		TableName:  TableFeatures,
		Operator:   utils.OperatorEqual,
	},
	QueryName: {
		ColumnName: "name",
		TableName:  TableFeatures,
		Operator:   utils.OperatorLike,
	},
	QueryIsActive: {
		ColumnName: "is_active",
		TableName:  TableFeatures,
		Operator:   utils.OperatorEqual,
	},
	QueryCreatedAtFrom: {
		ColumnName: "created_at",
		TableName:  TableFeatures,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCreatedAtTo: {
		ColumnName: "created_at",
		TableName:  TableFeatures,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

// Feature Instance filter mappings (cursor pagination, like service deployments)
var MapQueryToFeatureInstanceProperty = map[utils.Query]utils.SearchProperty{
	QueryFeatureID: {
		ColumnName: "feature_id",
		TableName:  TableFeatureInstances,
		Operator:   utils.OperatorEqual,
	},
	QueryStatus: {
		ColumnName: "status",
		TableName:  TableFeatureInstances,
		Operator:   utils.OperatorEqual,
	},
	QueryStartedAtFrom: {
		ColumnName: "started_at",
		TableName:  TableFeatureInstances,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryStartedAtTo: {
		ColumnName: "started_at",
		TableName:  TableFeatureInstances,
		Operator:   utils.OperatorLessThanOrEqual,
	},
	QueryCompletedAtFrom: {
		ColumnName: "completed_at",
		TableName:  TableFeatureInstances,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCompletedAtTo: {
		ColumnName: "completed_at",
		TableName:  TableFeatureInstances,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

// Feature Metric filter mappings
var MapQueryToFeatureMetricProperty = map[utils.Query]utils.SearchProperty{
	QueryWindowStartFrom: {
		ColumnName: "window_start",
		TableName:  TableFeatureMetrics,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryWindowStartTo: {
		ColumnName: "window_start",
		TableName:  TableFeatureMetrics,
		Operator:   utils.OperatorLessThanOrEqual,
	},
	QueryWindowMinutes: {
		ColumnName: "window_minutes",
		TableName:  TableFeatureMetrics,
		Operator:   utils.OperatorEqual,
	},
}

// Cursor fields for feature instances, applied in order of precedence; must include unique field as last field
var FeatureInstancesCursorFieldsList = []utils.CursorProperty{
	{
		QueryParam: QueryCompletedAt,
		ColumnName: "completed_at",
		TableName:  TableFeatureInstances,
	},
	{
		QueryParam: QueryFeatureInstanceID,
		ColumnName: "id",
		TableName:  TableFeatureInstances,
	},
}

// API-related constants
const (
	TableApis       = "apis"
	TableApiMetrics = "api_metrics"

	QueryApiID            utils.Query = "id"
	QueryEndpoint         utils.Query = "endpoint"
	QueryMethod           utils.Query = "method"
	QueryProtocol         utils.Query = "protocol"
	QueryIsInternal       utils.Query = "is_internal"
	QueryApisDeploymentID utils.Query = "apis_deployment_id"
)

// API filter mappings (offset pagination, like services)
var MapQueryToApiProperty = map[utils.Query]utils.SearchProperty{
	QueryApiID: {
		ColumnName: "id",
		TableName:  TableApis,
		Operator:   utils.OperatorEqual,
	},
	QueryEndpoint: {
		ColumnName: "endpoint",
		TableName:  TableApis,
		Operator:   utils.OperatorLike,
	},
	QueryMethod: {
		ColumnName: "http_method",
		TableName:  TableApis,
		Operator:   utils.OperatorEqual,
	},
	QueryProtocol: {
		ColumnName: "protocol",
		TableName:  TableApis,
		Operator:   utils.OperatorEqual,
	},
	QueryIsInternal: {
		ColumnName: "is_internal",
		TableName:  TableApis,
		Operator:   utils.OperatorEqual,
	},
	QueryCreatedAtFrom: {
		ColumnName: "created_at",
		TableName:  TableApis,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCreatedAtTo: {
		ColumnName: "created_at",
		TableName:  TableApis,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

// API Metrics filter mappings
var MapQueryToApiMetricProperty = map[utils.Query]utils.SearchProperty{
	QueryApisDeploymentID: {
		ColumnName: "apis_deployment_id",
		TableName:  TableApiMetrics,
		Operator:   utils.OperatorEqual,
	},
	QueryWindowStartFrom: {
		ColumnName: "window_start",
		TableName:  TableApiMetrics,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryWindowStartTo: {
		ColumnName: "window_start",
		TableName:  TableApiMetrics,
		Operator:   utils.OperatorLessThanOrEqual,
	},
	QueryWindowMinutes: {
		ColumnName: "window_minutes",
		TableName:  TableApiMetrics,
		Operator:   utils.OperatorEqual,
	},
}

var ApiMetricsCursorFieldsList = []utils.CursorProperty{
	{
		QueryParam: QueryWindowStartFrom,
		ColumnName: "window_start",
		TableName:  TableApiMetrics,
	},
	{
		QueryParam: ColumnNameCreatedAt,
		ColumnName: "created_at",
		TableName:  TableApiMetrics,
	},
}

var MapQueryProperties = map[utils.Query]utils.SearchProperty{
	ColumnNameFeatureID: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameFeatureID),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameCode: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameCode),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameName: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameName),
		Operator:   utils.OperatorLike,
	},
	ColumnNameIsStart: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameIsStart),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameIsTerminal: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameIsTerminal),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameCreatedAtFrom: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameCreatedAt),
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	ColumnNameCreatedAtTo: {
		TableName:  TableNameEntities,
		ColumnName: string(ColumnNameCreatedAt),
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

var MapQueryMetricProperties = map[utils.Query]utils.SearchProperty{
	ColumnNameWindowStartFrom: {
		TableName:  TableNameEntityMetrics,
		ColumnName: string(ColumnNameWindowStart),
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	ColumnNameWindowStartTo: {
		TableName:  TableNameEntityMetrics,
		ColumnName: string(ColumnNameWindowStart),
		Operator:   utils.OperatorLessThanOrEqual,
	},
	ColumnNameWindowMinutes: {
		TableName:  TableNameEntityMetrics,
		ColumnName: string(ColumnNameWindowMinutes),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameCreatedAtFrom: {
		TableName:  TableNameEntityMetrics,
		ColumnName: string(ColumnNameCreatedAt),
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	ColumnNameCreatedAtTo: {
		TableName:  TableNameEntityMetrics,
		ColumnName: string(ColumnNameCreatedAt),
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

var EntityMetricsCursorFieldsList = []utils.CursorProperty{
	{
		QueryParam: ColumnNameWindowStart,
		ColumnName: string(ColumnNameWindowStart),
		TableName:  TableNameEntityMetrics,
	},
	{
		QueryParam: ColumnNameCreatedAt,
		ColumnName: string(ColumnNameCreatedAt),
		TableName:  TableNameEntityMetrics,
	},
}

var MapQueryTransitionProperties = map[utils.Query]utils.SearchProperty{
	ColumnNameFromEntityID: {
		TableName:  TableNameEntityTransitions,
		ColumnName: string(ColumnNameFromEntityID),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameToEntityID: {
		TableName:  TableNameEntityTransitions,
		ColumnName: string(ColumnNameToEntityID),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameTransitionType: {
		TableName:  TableNameEntityTransitions,
		ColumnName: string(ColumnNameTransitionType),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameCreatedAtFrom: {
		TableName:  TableNameEntityTransitions,
		ColumnName: string(ColumnNameCreatedAt),
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	ColumnNameCreatedAtTo: {
		TableName:  TableNameEntityTransitions,
		ColumnName: string(ColumnNameCreatedAt),
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

var MapQueryEntityApisProperties = map[utils.Query]utils.SearchProperty{
	ColumnNameEntityID: {
		TableName:  TableNameEntityApis,
		ColumnName: string(ColumnNameEntityID),
		Operator:   utils.OperatorEqual,
	},
	ColumnNameApiID: {
		TableName:  TableNameEntityApis,
		ColumnName: string(ColumnNameApiID),
		Operator:   utils.OperatorEqual,
	},
}

// KPI filter mappings
var MapQueryToKpiProperty = map[utils.Query]utils.SearchProperty{
	QueryCode: {
		ColumnName: "code",
		TableName:  TableNameKpis,
		Operator:   utils.OperatorEqual,
	},
	QueryName: {
		ColumnName: "name",
		TableName:  TableNameKpis,
		Operator:   utils.OperatorLike,
	},
	QueryMetricType: {
		ColumnName: "metric_type",
		TableName:  TableNameKpis,
		Operator:   utils.OperatorEqual,
	},
	QueryUnit: {
		ColumnName: "unit",
		TableName:  TableNameKpis,
		Operator:   utils.OperatorEqual,
	},
	QueryCreatedAtFrom: {
		ColumnName: "created_at",
		TableName:  TableNameKpis,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCreatedAtTo: {
		ColumnName: "created_at",
		TableName:  TableNameKpis,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}

// KPI Relationship filter mappings
var MapQueryToKpiRelationshipProperty = map[utils.Query]utils.SearchProperty{
	QueryKpiID: {
		ColumnName: "kpi_id",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorEqual,
	},
	QueryRelationType: {
		ColumnName: "relation_type",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorEqual,
	},
	QueryTargetType: {
		ColumnName: "target_type",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorEqual,
	},
	QueryTargetID: {
		ColumnName: "target_id",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorEqual,
	},
	QueryWeightSetBy: {
		ColumnName: "weight_set_by",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorEqual,
	},
	QueryWeightReviewedBy: {
		ColumnName: "weight_reviewed_by",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorEqual,
	},
	QueryCreatedAtFrom: {
		ColumnName: "created_at",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorGreaterThanOrEqual,
	},
	QueryCreatedAtTo: {
		ColumnName: "created_at",
		TableName:  TableNameKpiRelationships,
		Operator:   utils.OperatorLessThanOrEqual,
	},
}
