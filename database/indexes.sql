-- Company lookups
CREATE INDEX idx_company_users_user_id ON company_users(user_id);
CREATE INDEX idx_company_users_company_id ON company_users(company_id);

-- Area hierarchy lookups
CREATE INDEX idx_areas_parent_id ON areas(parent_id);
CREATE INDEX idx_areas_company_id ON areas(company_id);

-- Budget queries
CREATE INDEX idx_budget_items_company_id ON budget_items(company_id);
CREATE INDEX idx_budget_items_area_id ON budget_items(area_id);
CREATE INDEX idx_budget_items_date ON budget_items(date);

-- Invitation lookups
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_token ON invitations(token); 