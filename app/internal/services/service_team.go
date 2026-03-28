package services

import (
	"context"
	"errors"
	"time"

	"app/ontology/internal/models"
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"gorm.io/gorm"
)

type ServiceTeam struct {
	access *ServiceAccess
}

type ServiceTeamMethods interface {
	CreateTeam(ctx context.Context, req *types_ontology.RequestCreateTeam) (*types_ontology.ResponseCreateTeam_Team, *response.ApplicationError)
	UpdateTeam(ctx context.Context, teamID int64, req *types_ontology.RequestUpdateTeam) (*types_ontology.ResponseUpdateTeam_Team, *response.ApplicationError)
	GetAllTeams(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetTeams_Team, *types_ontology.ResponseGetTeams_Pagination, *response.ApplicationError)
	GetFeatureTeams(ctx context.Context, featureID int64) ([]*types_ontology.ResponseGetFeatureTeams_Team, *response.ApplicationError)
}

func NewServiceTeam(access *ServiceAccess) ServiceTeamMethods {
	return &ServiceTeam{
		access: access,
	}
}

func (st *ServiceTeam) GetAllTeams(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetTeams_Team, *types_ontology.ResponseGetTeams_Pagination, *response.ApplicationError) {
	var (
		logger = st.access.Logger.With(ctx)
	)

	result, err := st.access.Repositories.Team.GetAllTeams(ctx, filterAndPageParams)
	if err != nil {
		logger.Errorf("[GetAllTeams] Failed to get teams: %+v", err)
		return nil, nil, response.ErrFetchingTeams
	}

	teamIDs := make([]int64, 0, len(result.Result))
	for _, item := range result.Result {
		teamIDs = append(teamIDs, item.ID)
	}

	roleNames := map[int64]string{}
	if len(teamIDs) > 0 {
		roleNames, err = st.access.Repositories.Team.GetTeamRoleNamesByTeamIDs(ctx, teamIDs)
		if err != nil {
			logger.Errorf("[GetAllTeams] Failed to get team roles: %+v", err)
			return nil, nil, response.ErrFetchingTeamRoles
		}
	}

	var teams []*types_ontology.ResponseGetTeams_Team
	for _, item := range result.Result {
		teams = append(teams, &types_ontology.ResponseGetTeams_Team{
			Id:           item.ID,
			Name:         item.Name,
			SlackChannel: item.SlackChannel,
			OncallEmail:  item.OncallEmail,
			RoleName:     roleNames[item.ID],
		})
	}

	pagination := &types_ontology.ResponseGetTeams_Pagination{
		CurrentPage: int32(result.CurrentPage),
		PageSize:    int32(result.Limit),
		TotalCount:  result.TotalItems,
		TotalPages:  int32(result.TotalPages),
	}

	return teams, pagination, nil
}

func (st *ServiceTeam) GetFeatureTeams(ctx context.Context, featureID int64) ([]*types_ontology.ResponseGetFeatureTeams_Team, *response.ApplicationError) {
	var (
		logger = st.access.Logger.With(ctx)
	)

	featureTeams, err := st.access.Repositories.Team.GetFeatureTeamRolesByFeatureID(ctx, featureID)
	if err != nil {
		logger.Errorf("[GetFeatureTeams] Failed to get feature team roles: %+v", err)
		return nil, response.ErrFetchingTeams
	}

	teamIDs := make([]int64, 0, len(featureTeams))
	for _, item := range featureTeams {
		teamIDs = append(teamIDs, item.TeamID)
	}

	teamNames := map[int64]string{}
	if len(teamIDs) > 0 {
		teamNames, err = st.access.Repositories.Team.GetTeamNamesByIDs(ctx, teamIDs)
		if err != nil {
			logger.Errorf("[GetFeatureTeams] Failed to get team names: %+v", err)
			return nil, response.ErrFetchingTeams
		}
	}

	result := make([]*types_ontology.ResponseGetFeatureTeams_Team, 0, len(featureTeams))
	for _, item := range featureTeams {
		result = append(result, &types_ontology.ResponseGetFeatureTeams_Team{
			TeamId:   item.TeamID,
			TeamName: teamNames[item.TeamID],
			RoleName: item.Role,
		})
	}

	return result, nil
}

func (st *ServiceTeam) CreateTeam(ctx context.Context, req *types_ontology.RequestCreateTeam) (*types_ontology.ResponseCreateTeam_Team, *response.ApplicationError) {
	var (
		logger = st.access.Logger.With(ctx)
	)

	existingTeam, getErr := st.access.Repositories.Team.GetTeamByName(ctx, req.Name)
	if getErr != nil && !errors.Is(getErr, gorm.ErrRecordNotFound) {
		logger.Errorf("[CreateTeam] Failed to check for existing team: %+v", getErr)
		return nil, response.ErrCreatingTeam
	}
	if existingTeam != nil {
		return nil, response.ErrTeamAlreadyExists
	}

	model := &models.Team{
		Name:         req.Name,
		SlackChannel: req.SlackChannel,
		OncallEmail:  req.OncallEmail,
	}

	result, err := st.access.Repositories.Team.CreateTeam(ctx, model)
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return nil, response.ErrTeamAlreadyExists
		}
		logger.Errorf("[CreateTeam] Failed to create team: %+v", err)
		return nil, response.ErrCreatingTeam
	}

	return &types_ontology.ResponseCreateTeam_Team{
		Id:           result.ID,
		Name:         result.Name,
		SlackChannel: result.SlackChannel,
		OncallEmail:  result.OncallEmail,
		CreatedAt:    result.CreatedAt.UTC().Format(time.RFC3339),
		UpdatedAt:    result.UpdatedAt.UTC().Format(time.RFC3339),
	}, nil
}

func (st *ServiceTeam) UpdateTeam(ctx context.Context, teamID int64, req *types_ontology.RequestUpdateTeam) (*types_ontology.ResponseUpdateTeam_Team, *response.ApplicationError) {
	var (
		logger = st.access.Logger.With(ctx)
	)

	updates := map[string]interface{}{}
	if req.Name != nil {
		updates["name"] = req.GetName()
	}
	if req.SlackChannel != nil {
		updates["slack_channel"] = req.GetSlackChannel()
	}
	if req.OncallEmail != nil {
		updates["oncall_email"] = req.GetOncallEmail()
	}

	if len(updates) == 0 {
		existingTeam, getErr := st.access.Repositories.Team.GetTeamByID(ctx, teamID)
		if getErr != nil {
			if errors.Is(getErr, gorm.ErrRecordNotFound) {
				return nil, response.ErrTeamNotFound
			}
			logger.Errorf("[UpdateTeam] Failed to get existing team: %+v", getErr)
			return nil, response.ErrUpdatingTeam
		}
		return &types_ontology.ResponseUpdateTeam_Team{
			Id:           existingTeam.ID,
			Name:         existingTeam.Name,
			SlackChannel: existingTeam.SlackChannel,
			OncallEmail:  existingTeam.OncallEmail,
			CreatedAt:    existingTeam.CreatedAt.UTC().Format(time.RFC3339),
			UpdatedAt:    existingTeam.UpdatedAt.UTC().Format(time.RFC3339),
		}, nil
	}

	result, err := st.access.Repositories.Team.UpdateTeam(ctx, teamID, updates)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, response.ErrTeamNotFound
		}
		logger.Errorf("[UpdateTeam] Failed to update team: %+v", err)
		return nil, response.ErrUpdatingTeam
	}

	return &types_ontology.ResponseUpdateTeam_Team{
		Id:           result.ID,
		Name:         result.Name,
		SlackChannel: result.SlackChannel,
		OncallEmail:  result.OncallEmail,
		CreatedAt:    result.CreatedAt.UTC().Format(time.RFC3339),
		UpdatedAt:    result.UpdatedAt.UTC().Format(time.RFC3339),
	}, nil
}
