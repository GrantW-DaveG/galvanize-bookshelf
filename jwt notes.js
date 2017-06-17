function tryuserLogin( req, res, next) {

}


router.post('/', checkifuserisregistered, tryuserlogin, (req, res) => {
  const jwtPayload ={
    iss: "jwtLesson";
    sub: {
      unam: req.user.username,
      id: req.user.id
    },
    exp: math.floor(Date.now()/ 1000) + 60*60,
    liggodIn: true
  }

  const secret - process.env.TOKEN_SECRET;
  const token = jwt.sign(jwtPaylod, secret);

})


jwt was inside cookie header bc we res.send(COOKIE)
function checkifuserisregistered() {
  destruct
  const {username, password} = req.body
    if


}

function tryuserlogin() {
  object about the user
}
function checkfor token() {
  cookie heard auth field is where JWT goes
}

define jwt.sign
define JWT.verify(req.cookies.auth, process.env.TOKEN_SECRET, (err, decoded))
