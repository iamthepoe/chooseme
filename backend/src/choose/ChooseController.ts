import Express from 'express';
import Choose from './Choose';
import Auth from '../middlewares/Auth';

const router = Express.Router();

router.get('/choose', async (req, res)=>{
	let chooses = await Choose.findAll();
	res.status(200);
	res.json(chooses);
});

router.get('/choose/:id', async (req,res)=>{
	let id = parseInt(req.params.id);
	if(!isNaN(id)){
		let choose = await Choose.findOne({id: id});
		if(choose != null){
			res.status(200);
			res.json(choose);
		}else{
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(403);
	}
});

router.post('/choose', async (req,res)=>{
	let {firstOption, secondOption} = req.body;
	if(firstOption == null || secondOption == null){
		res.sendStatus(403);
	}else{
		await Choose.create({
			firstOption: firstOption,
			secondOption: secondOption,
			firstVotes: 0,
			secondVotes: 0
		});

		res.sendStatus(201);
	}
});

router.post('/choose/vote/:id', Auth, async (req,res)=>{
	let id = parseInt(req.params.id);
	let {second} = req.query;
	
	if(!isNaN(id)){
		let choose = await Choose.findByPk(id);
		if(choose != null){
			if(second){
				await Choose.update({secondVotes: (choose.secondVotes+1)}, {where:{id: id}});
			}else{
				await Choose.update({firstVotes: (choose.firstVotes+1)}, {where:{id: id}});
			}
			res.sendStatus(200);
		}else{
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(403);
	}
});

router.put('/choose/:id', async (req,res)=>{
	let id = parseInt(req.params.id);
	if(!isNaN(id)){
		let choose = await Choose.findByPk(id);
		if(choose != null){
			let {firstOption, secondOption, firstVotes, secondVotes} = req.body;

			if(firstOption != null){
				await Choose.update({firstOption: firstOption}, {where:{id: id}});
			}

			if(secondOption != null){
				await Choose.update({secondOption: secondOption}, {where:{id: id}});
			}

			if(firstVotes != null){
				await Choose.update({firstVotes: firstVotes}, {where:{id: id}});
			}

			if(secondVotes != null){
				await Choose.update({secondVotes: secondVotes}, {where:{id: id}});
			}

			res.sendStatus(200);
		}else{
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(403);
	}
});

router.delete('/choose/:id', async (req, res)=>{
	let id = parseInt(req.params.id);
	if(!isNaN(id)){
		await Choose.destroy({where:{id:id}});
		res.sendStatus(200);
	}else{
		res.sendStatus(403);
	}
});

export default router;