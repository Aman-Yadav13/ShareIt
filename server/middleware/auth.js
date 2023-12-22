import jwt from "jsonwebtoken";

//wants to like the post
//click the like button => auth middleware() (if all okay , then next()) => only then calling like controller
//Note:Through middlewares we can populate the requedt and have access to it in the next action that you want to perform

const auth = async (req, res, next) => {
  try {
    //Checking if the token user has is valid after signing in
    //console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData; //data we get from the token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "@a18191971Y"); //Will give the data from each specific token
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; //sub -> google'name for a specific id that diffrentiates every single google user
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
