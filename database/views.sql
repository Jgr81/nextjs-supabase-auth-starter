-- Company members with roles
CREATE VIEW company_members AS
SELECT 
  cu.company_id,
  c.name as company_name,
  p.id as user_id,
  p.email,
  p.full_name,
  cu.role
FROM company_users cu
JOIN companies c ON c.id = cu.company_id
JOIN profiles p ON p.id = cu.user_id;

-- Budget summary view
CREATE VIEW budget_summary AS
SELECT 
  bi.company_id,
  bi.area_id,
  bi.product_id,
  bi.type,
  bi.currency,
  date_trunc('month', bi.date) as month,
  SUM(bi.amount) as total_amount
FROM budget_items bi
GROUP BY 1, 2, 3, 4, 5, 6; 