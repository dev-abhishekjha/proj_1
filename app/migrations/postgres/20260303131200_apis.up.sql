CREATE TABLE IF NOT EXISTS apis (
    id BIGSERIAL PRIMARY KEY,
    service_id BIGINT NOT NULL,
    endpoint VARCHAR(512) NOT NULL,
    http_method VARCHAR(16) NOT NULL,    -- e.g. 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'
    is_internal BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT unique_service_endpoint_method UNIQUE (service_id, endpoint, http_method)
);

CREATE INDEX idx_apis_is_internal ON apis(is_internal);