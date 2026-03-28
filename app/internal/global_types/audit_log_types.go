package global_types

import auditlog "bitbucket.org/fyscal/be-commons/pkg/middlewares"

// Entity Types
const (
	EntityEntityType auditlog.EntityType = "entity"
)

// Event Categories
const (
	EntityEventCategory  auditlog.EventCategory = "entity.create"
	EntityUpdateCategory auditlog.EventCategory = "entity.update"
)
