.PHONY: up down dev build

up:
	docker compose up -d

down:
	docker compose down

dev: up
	cd backend && air

build:
	cd backend && go build -o tmp/main .
