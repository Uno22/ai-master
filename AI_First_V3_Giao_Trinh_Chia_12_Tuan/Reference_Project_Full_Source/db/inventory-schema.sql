-- Teaching schema only. Never run against production.
CREATE TABLE IF NOT EXISTS product_items (
  id BIGINT NOT NULL PRIMARY KEY,
  quantity INT NOT NULL,
  reserved_quantity INT NOT NULL DEFAULT 0,
  CHECK (quantity >= 0),
  CHECK (reserved_quantity >= 0),
  CHECK (reserved_quantity <= quantity)
);

CREATE TABLE IF NOT EXISTS inventory_reservations (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  idempotency_key VARCHAR(128) NOT NULL,
  product_item_id BIGINT NOT NULL,
  requested_quantity INT NOT NULL,
  status VARCHAR(16) NOT NULL,
  UNIQUE KEY ux_inventory_reservation_tenant_key (tenant_id, idempotency_key),
  CONSTRAINT fk_inventory_item FOREIGN KEY (product_item_id) REFERENCES product_items(id),
  CHECK (requested_quantity > 0)
);

-- Update must be performed inside a transaction together with reservation insert.
-- UPDATE product_items SET reserved_quantity = reserved_quantity + ?
-- WHERE id = ? AND quantity - reserved_quantity >= ?;
-- Check affectedRows == 1, then create reservation and commit.
