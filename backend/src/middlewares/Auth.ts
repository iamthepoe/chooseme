import User from '../user/User';
import Express from 'express';

async function Auth(req: Express.Request,res: Express.Response,next: Express.NextFunction){
	let {username, token} = req.body;
	if(token == null || username == null){
		res.sendStatus(406);
	}else{
		let user = await User.findOne({where:{username: username}});
		if(user == null){
			res.sendStatus(404);
		}else{
			if(user.token == token){
				next();
			}else{
				res.sendStatus(403);
			}
		}
	}
}

export default Auth;