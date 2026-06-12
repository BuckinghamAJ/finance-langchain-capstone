-- name: CreateItem :one
INSERT INTO items (name)
VALUES (?)
RETURNING id, name, created_at;

-- name: GetItem :one
SELECT id, name, created_at
FROM items
WHERE id = ?
LIMIT 1;

-- name: ListItems :many
SELECT id, name, created_at
FROM items
ORDER BY created_at DESC, id DESC;

-- name: DeleteItem :exec
DELETE FROM items
WHERE id = ?;
