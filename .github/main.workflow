workflow "New workflow" {
  on = "push"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  env = {
    GIT_USER = "yangshun"
    USE_SSH = "1"
  }
  runs = "yarn deploy"
}
