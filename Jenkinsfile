pipeline {
    environment {
        NAME = 'mongoose-backend'
    }

    agent any
    stages {
        stage('Cloning our Git') {
            steps {
                git branch: 'main', url: 'https://github.com/SarthakRana21/mongoose-backend.git'
            }
        }

        stage('Building Docker Image') {
            steps {
                    sh 'docker build -t ${NAME} .'
            }
        }
        stage('Clean up old Docker Containers') {
            steps {
                // Stop the old container if it's running
                sh 'docker ps -q -f name=${NAME} | xargs -r docker stop'

                // Remove the old container
                sh 'docker ps -a -q -f name=${NAME} | xargs -r docker rm'
            }
        }

        stage('Deploy') {
            steps {
                    sh '''
                        echo "workspace is: \$WORKSPACE"
                        set -a
                        [ -f "\$WORKSPACE/.env" ] && . "\$WORKSPACE/.env"
                        set +a
                        docker run -dit -p 3003:3003 --name ${NAME} ${NAME}
                    '''

            }
        }
    }
}