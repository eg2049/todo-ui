pipeline {
    agent {
        node {
            label 'jenkins-agent-docker'
        }
    }

    environment {

        // DOCKER_REGISTRY='https://hub.docker.com'
        // DOCKER_REPOSITORY=''
        // DOCKER_CREDENTIALS='DOCKER_CREDENTIALS'

        SERVICE_NAME='todo-ui'
        VERSION='0.1.0'
    }

    stages {

        stage('Build') {

            steps {

                echo "Build ${SERVICE_NAME} on ${VERSION} version..."

                // вторым аргументом передаётся относительный путь до Dockerfile, который нужно использовать 
                script {
                    dockerImage = docker.build("${DOCKER_REPOSITORY}/${SERVICE_NAME}:${VERSION}", "-f Dockerfile.prod")
                }

            }
        }

        stage('Test') {

            when {

                expression {

                    env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'staging'
                }
            }

            steps {
                
                echo 'Test...'
            }
        }

        stage('Push') {

            steps {

                echo 'Push...'

                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Remove') {

            steps {

                echo 'Remove...'

                sh "docker rmi ${DOCKER_REPOSITORY}/${SERVICE_NAME}:${VERSION}"
            }
        }
    }
}