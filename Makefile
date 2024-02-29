DOCKER_COMPOSE := docker-compose -f docker-compose.yml
DOCKER_COMPOSE_DOMICON_FRONTEND := domicon-frontend

RUN_DOMICON_FRONTEND := $(DOCKER_COMPOSE) up -d $(DOCKER_COMPOSE_DOMICON_FRONTEND)
STOP_DOMICON_FRONTEND := $(DOCKER_COMPOSE) stop $(DOCKER_COMPOSE_DOMICON_FRONTEND) && $(DOCKER_COMPOSE) rm -f $(DOCKER_COMPOSE_DOMICON_FRONTEND)
STOP := $(DOCKER_COMPOSE) down --remove-orphans

BUILD := npm install && npm run build

# Build the domicon frontend
.PHONY: build
build:
	$(BUILD)

# 构建镜像
.PHONY: build-docker
build-docker:
	@docker build --build-arg GIT_COMMIT_SHA=$(git rev-parse --short HEAD) --build-arg GIT_TAG=$(git describe --tags --abbrev=0) -t domicon-frontend:latest -f ./Dockerfile .

.PHONY: run-domicon-frontend
run-domicon-frontend: ## Runs the domicon frontend
	$(RUN_DOMICON_FRONTEND)

.PHONY: stop-domicon-frontend
stop-domicon-frontend: ## Stops the domicon frontend
	$(STOP_DOMICON_FRONTEND)

.PHONY: stop
stop: ## Stops all
	$(STOP)

.PHONY: restart
restart: stop run ## Executes `make stop` and `make run` commands

.PHONY: run
run: stop ## runs all
	$(RUN_DOMICON_FRONTEND)

