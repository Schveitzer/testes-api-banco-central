IMAGE_NAME="test-image"
CONTAINER_NAME="test-container"
CURRENT_PATH=$(shell pwd)
REPORT_DIRECTORY=allure-results
REPORT_LOCAL_PATH=${CURRENT_PATH}/${REPORT_DIRECTORY}
REPORT_CONTAINER_PATH=/testes_api_banco_central/${REPORT_DIRECTORY}

test.run:
	@docker run --name ${CONTAINER_NAME} ${IMAGE_NAME} /bin/ash -c "npx jest"

remove:
	@docker rmi -f ${IMAGE_NAME}
	@docker rm ${CONTAINER_NAME}

build: remove
	@docker build -t ${IMAGE_NAME} -f Dockerfile .

get.report:
	@docker cp ${CONTAINER_NAME}:/testes_api_banco_central/relatorios ./
