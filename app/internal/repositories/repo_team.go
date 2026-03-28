package repositories

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/models"
	"context"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type RepositoryTeam struct {
	access *RepositoryAccess
}

type RepositoryTeamMethods interface {
	GetAllTeams(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Team], error)
	GetTeamRoleNamesByTeamIDs(ctx context.Context, teamIDs []int64) (map[int64]string, error)
	GetFeatureTeamRolesByFeatureID(ctx context.Context, featureID int64) ([]*models.FeatureTeamRole, error)
	GetTeamNamesByIDs(ctx context.Context, teamIDs []int64) (map[int64]string, error)
	GetTeamByID(ctx context.Context, teamID int64) (*models.Team, error)
	GetTeamByName(ctx context.Context, name string) (*models.Team, error)
	CreateTeam(ctx context.Context, model *models.Team) (*models.Team, error)
	UpdateTeam(ctx context.Context, teamID int64, updates map[string]interface{}) (*models.Team, error)
}

func NewRepositoryTeam(access *RepositoryAccess) RepositoryTeamMethods {
	return &RepositoryTeam{
		access: access,
	}
}

func (rt *RepositoryTeam) GetAllTeams(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Team], error) {
	resultModel := []*models.Team{}

	query := rt.access.Db.SlaveDB.WithContext(ctx).Model(&models.Team{})
	result, err := utils.PaginateWithSearchFilter(query, global_types.MapQueryToTeamProperty, filterAndPageParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (rt *RepositoryTeam) GetTeamRoleNamesByTeamIDs(ctx context.Context, teamIDs []int64) (map[int64]string, error) {
	var rows []models.FeatureTeamRole
	err := rt.access.ClickHouseDb.GetDB().WithContext(ctx).
		Model(&models.FeatureTeamRole{}).
		Select("team_id, role, assigned_at").
		Where("team_id IN ?", teamIDs).
		Order("assigned_at DESC").
		Find(&rows).Error
	if err != nil {
		return nil, err
	}

	roleNames := make(map[int64]string, len(teamIDs))
	for _, row := range rows {
		if _, exists := roleNames[row.TeamID]; exists {
			continue
		}
		roleNames[row.TeamID] = row.Role
	}

	return roleNames, nil
}

func (rt *RepositoryTeam) GetFeatureTeamRolesByFeatureID(ctx context.Context, featureID int64) ([]*models.FeatureTeamRole, error) {
	var result []*models.FeatureTeamRole

	err := rt.access.ClickHouseDb.GetDB().WithContext(ctx).
		Model(&models.FeatureTeamRole{}).
		Where("feature_id = ?", featureID).
		Find(&result).Error
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (rt *RepositoryTeam) GetTeamNamesByIDs(ctx context.Context, teamIDs []int64) (map[int64]string, error) {
	var rows []models.Team
	err := rt.access.Db.SlaveDB.WithContext(ctx).
		Model(&models.Team{}).
		Select("id, name").
		Where("id IN ?", teamIDs).
		Find(&rows).Error
	if err != nil {
		return nil, err
	}

	teamNames := make(map[int64]string, len(rows))
	for _, row := range rows {
		teamNames[row.ID] = row.Name
	}

	return teamNames, nil
}

func (rt *RepositoryTeam) GetTeamByID(ctx context.Context, teamID int64) (*models.Team, error) {
	var model models.Team
	err := rt.access.Db.MasterDB.WithContext(ctx).
		Model(&models.Team{}).
		Where("id = ?", teamID).
		First(&model).Error
	if err != nil {
		return nil, err
	}

	return &model, nil
}

func (rt *RepositoryTeam) GetTeamByName(ctx context.Context, name string) (*models.Team, error) {
	var model models.Team
	err := rt.access.Db.MasterDB.WithContext(ctx).
		Model(&models.Team{}).
		Where("name = ?", name).
		First(&model).Error
	if err != nil {
		return nil, err
	}

	return &model, nil
}

func (rt *RepositoryTeam) CreateTeam(ctx context.Context, model *models.Team) (*models.Team, error) {
	db := rt.access.Db.MasterDB.WithContext(ctx)

	if err := db.Create(&model).Error; err != nil {
		return nil, err
	}

	return model, nil
}

func (rt *RepositoryTeam) UpdateTeam(ctx context.Context, teamID int64, updates map[string]interface{}) (*models.Team, error) {
	db := rt.access.Db.MasterDB.WithContext(ctx)

	var model models.Team
	result := db.Model(&model).Clauses(clause.Returning{}).Where("id = ?", teamID).Updates(updates)
	if result.Error != nil {
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	return &model, nil
}
