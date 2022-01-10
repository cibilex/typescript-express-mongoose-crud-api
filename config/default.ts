export default{
    PORT:8181,
    mode:"dev",
    dbUrl:"mongodb+srv://cibilex:cibilex@tsc-backend.ibdrr.mongodb.net/ts-express-db-test?retryWrites=true&w=majority",
    bcryptSalt:10,
    accessTokenTTL:10,
    refreshTokenTTL:31556926,
    jwtKey:`
    -----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCe+OAHFeM+hWpa8KS/xALUUpo5J+eKfVAtDwwhmf9BCSPcFCtj
8UHg89QEjaCIf5HdQZgxjMoIFO4MguKUTTEeQkHfraI3cS/nvdjqSKnHXKTs5Izh
3nJYEb70COCXpe1iwG2KbOnwraqpxYgdc44KEv+cN7kc94dwazij3dcEowIDAQAB
AoGAZ+vVt4wNY5+fqRdK+7lNCDN/cgGuERBeSzZc/dJH1OH+uS3ON6VNJZr/bIKR
AOo0Fml87ldU8veLrk4ZhEz53/1eYNJs6HPiqZvVBqri+SNOzXQrY8xB6DF0G2ly
ejeF8KED67jFe9M9DPCBiNLQ/KfXzkzhrZDd90Pxuvdx0aECQQDpuRYy04/YCUd9
zKBSwroADvH2nUhgZucrCjB9qm46XvzuYxx1Fzri/PxecmjE2ZepMcI2B92b8bCP
HDd7xCLpAkEArh/YWpC7XDsEaFrEdStybbxZlizuhml96FdyNW3CZDq6iNy2h5vm
WAc/inHTxsyLBvSekhtnkbmsS/ckoog7qwJBAJZC7mii53nHDXVtVy2eD6L1+M3K
dLu1rK1ZEa/ZIKDabNZ+Vc9Zrfw9FatK9tyH4B9g5DGEgQ8/JXn8dBdYE/ECQDQG
8+Brqm/uemyr4lOYPcKoKqSCnGqxDpvjtQ5d012bZq0KNcfjPzpCQCwfwsV9zHSx
lsfVRGb4cZDpMZsW1a0CQQDicusC/PslAIsOWW40TNotfdAxKThYwfBc0En09Wq8
hRIJRp/K8/Yily82vNPE1jw4dr2SZnDasGBnaXsvFDlA
-----END RSA PRIVATE KEY-----
`
}