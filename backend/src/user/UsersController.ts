import Express from 'express';
import User from './User';
import Token from 'generate-password';

const router = Express.Router();

router.get('/user', async (req, res)=>{
	let users = await User.findAll();
	res.status(200);
	res.json(users);
});

router.get('/user/:id', async (req,res)=>{
	let id = parseInt(req.params.id);
	if(!isNaN(id)){
		let user = await User.findByPk(id);
		if(user != null){
			res.status(200);
			res.json(user);
		}else{
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(403);
	}
});

router.post('/user', async (req,res)=>{
	let {username, password, color} = req.body;
	if(username == null || password == null){
		res.sendStatus(403);
	}else{

		if(color == null){
			color = '#fff';
		}

		let user = await User.findOne({where:{username: username}});
		if(user != null){
			res.sendStatus(406);
		}else{
			await User.create({
				username: username,
				password: password,
				token: Token.generate({
					length: 50,
					numbers: true,
					symbols: true,
					lowercase: true,
					uppercase: true
					}),
				color: color
			});
		}

		res.sendStatus(201);
	}
});

router.post('/user/login', async (req,res)=>{
	let {username, password} = req.body;
	if(username == null || password == null){
		res.sendStatus(403);
	}else{
		let user = await User.findOne({where:{username: username}});
		if(user != null){
			res.json({username: user.username, color: user.color, token: user.token});
		}else{
			res.sendStatus(404);
		}
	}
}); 

router.put('/user/:id', async (req,res)=>{
	let id = parseInt(req.params.id);
	if(!isNaN(id)){
		let user = await User.findByPk(id);
		if(user != null){
			let {username, password, color} = req.body;

			if(username != null){
				await User.update({username: username}, {where:{id: id}});
			}

			if(password != null){
				await User.update({password: password}, {where:{id: id}});
			}

			if(color != null){
				await User.update({color: color}, {where:{id: id}});
			}

			res.sendStatus(200);

		}else{
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(403);
	}
});

router.delete('/user/:id', async (req, res)=>{
	let id = parseInt(req.params.id);
	if(!isNaN(id)){
		await User.destroy({where:{id:id}});
		res.sendStatus(200);
	}else{
		res.sendStatus(403);
	}
});

export default router;