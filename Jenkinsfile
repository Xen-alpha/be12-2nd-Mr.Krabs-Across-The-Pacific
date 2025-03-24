pipeline {
    agent any  // 어떤 에이전트에서든 실행되도록 설정

    environment {
        GIT_DEPLOYMENT_YAML = 'https://raw.githubusercontent.com/Shin-JiHyun/across-the-pacific-Front/main/k8s/frontend-deployment.yaml'
        GIT_SERVICE_YAML = 'https://raw.githubusercontent.com/Shin-JiHyun/across-the-pacific-Front/main/k8s/frontend-service.yaml'
        NAMESPACE = 'sjh'  
    }

    stages {
        stage('Pull Docker Image') {
            steps {
                script {
                    echo "Pulling Docker Image..."
                    def imageName = "sjhyun0000/user-front"
                    def imageTag = "2.0"
                    
                    // 도커 이미지를 풀 받습니다.
                    sh "docker pull ${imageName}:${imageTag}"
                }
            }
        }

        stage('Deploy Canary Version') {
            steps {
                script {
                    echo "Deploying New Canary Version via SSH..."

                    // Deployment 및 Service를 Kubernetes에 적용하는 코드
                    sh """
                        curl -sL $GIT_DEPLOYMENT_YAML | \
                        sed "s/latest/$BUILD_ID/g" | \
                        sed "s/canary/true/g" | \
                        kubectl apply -n $NAMESPACE -f -
                    """
                    sh """
                        kubectl rollout status deployment/frontend-canary -n $NAMESPACE
                        kubectl wait --for=condition=available deployment/frontend-canary --timeout=120s -n $NAMESPACE
                    """
                    sh """
                        curl -sL $GIT_SERVICE_YAML | \
                        sed "s/canary/true/g" | \
                        kubectl apply -n $NAMESPACE -f -
                    """
                }
            }
        }

        stage('Increase Traffic to Canary') {
            steps {
                script {
                    echo "Gradually Increasing Traffic to Canary..."

                    sh """
                        kubectl patch service frontend -n $NAMESPACE -p \
                        '{"spec": {"traffic": [{"weight": 50, "revisionName": "frontend-canary"}, {"weight": 50, "revisionName": "frontend-stable"}]}}'
                    """
                    sh """
                        sleep 30
                        kubectl patch service frontend -n $NAMESPACE -p \
                        '{"spec": {"traffic": [{"weight": 100, "revisionName": "frontend-canary"}]}}'
                    """
                }
            }
        }
    }
}
