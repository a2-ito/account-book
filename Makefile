
all: build run-db run

run:
	yarn dev

build:
	yarn build

build-db:
	npx prisma migrate dev --name init
	npx prisma db seed

run-db:
	docker compose up -d

run-with-postgres:
	docker compose -f docker-compose.yml -f docker-compose.postgres.yml up --build

clean-sqlite:
	rm -rf prisma/migrations
	rm -f prisma/dev.db

down:
	docker compose down

clean: down
	docker volume rm account-book_db-vol
	rm -rf prisma/migrations
