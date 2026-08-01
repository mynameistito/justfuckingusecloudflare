CREATE TABLE IF NOT EXISTS demo_products (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	job TEXT NOT NULL,
	free_allowance TEXT NOT NULL
);

INSERT OR REPLACE INTO demo_products (id, name, job, free_allowance) VALUES
	(1, 'D1', 'Relational data', '5M rows read per day'),
	(2, 'Workers KV', 'Read-heavy configuration', '100K reads per day'),
	(3, 'R2', 'Private object storage', '10 GB-month storage'),
	(4, 'Durable Objects', 'Strongly consistent coordination', 'SQLite-backed free allocation'),
	(5, 'Images', 'Edge image transformation', '5K unique transformations per month');
