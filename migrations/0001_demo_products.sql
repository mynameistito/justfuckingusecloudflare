CREATE TABLE IF NOT EXISTS demo_products (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	job TEXT NOT NULL,
	free_allowance TEXT NOT NULL
);

INSERT OR REPLACE INTO demo_products (id, name, job, free_allowance) VALUES
	(1, 'D1', 'Relational data', '1,000 demo requests per day'),
	(2, 'Workers KV', 'Read-heavy configuration', '100 demo requests per day'),
	(3, 'R2', 'Private object storage', '500 demo requests per day'),
	(4, 'Cache API', 'Data-center cache reads', '5,000 demo requests per day'),
	(5, 'Images', 'Edge image transformation', '100 demo requests per day');
