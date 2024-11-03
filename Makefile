
all: run-db run

run:
	yarn dev

build:
	npx prisma migrate dev --name init
	npx prisma db seed

run-db:
	docker compose up -d

run-with-postgres:
	docker compose -f docker-compose.yml -f docker-compose.postgres.yml up --build

clean-sqlite:
	rm -rf prisma/migrations
	rm -f prisma/dev.db

clean:
	docker compose down
	docker volume rm account-book_db-vol
	rm -rf prisma/migrations
