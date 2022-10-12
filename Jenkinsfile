def gitBranch = env.BRANCH_NAME
def gitURL = "git@github.com:Memphisdev/memphis-cli.git"
def repoUrlPrefix = "memphisos"

node ("small-ec2-fleet") {
  git credentialsId: 'main-github', url: gitURL, branch: gitBranch
  
  try{
    stage('NPM Install') {
      sh 'sudo npm install pkg -g'
      sh 'pkg package.json'
    }

    stage('Create tar') {
      sh 'mv release/memphis-dev-cli-macos release/mem'
      sh 'tar -czf mem.tar.gz release/mem'
      sh(script:"""sha256sum mem.tar.gz | awk '{print \$1}' > sha256""", returnStdout: true)
    }

    stage('Create new release') {
      sh 'sudo yum install jq -y'
      sh(script:"""jq -r '"v" + .version' package.json > version.conf""", returnStdout: true)
      withCredentials([string(credentialsId: 'gh_token', variable: 'GH_TOKEN')]) {
        sh(script:"""gh release create \$(cat version.conf) ./mem.tar.gz --generate-notes -d""", returnStdout: true)
        //sh(script:"""gh release create 5.5.5 ./mem.tar.gz --generate-notes -d""", returnStdout: true)
      }
    }
    stage('Push to NPM') {
      sh 'sudo npm install -g npm-cli-login'
      withCredentials([usernamePassword(credentialsId: 'npm_login', passwordVariable: 'pass', usernameVariable: 'user')]) {
        sh 'NPM_USER=$user NPM_PASS=$pass NPM_EMAIL=team@memphis.dev npm-cli-login'
        sh 'npm publish'
      }
    }

    stage('Push to BREW') {

    }
    notifySuccessful()

  } catch (e) {
      currentBuild.result = "FAILED"
      cleanWs()
      notifyFailed()
      throw e
  }
}

def notifySuccessful() {
  emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}

def notifyFailed() {
  emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
