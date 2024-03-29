export default {
	createSentence: async (ctx, next) => {
		try {
			const { data, cel } = ctx.request.body;
			const sentences = [];
			let user = await strapi.db.query('plugin::users-permissions.user').findOne({
				where: {
					cel: cel,
				},
			});
			if (!user) {
				user = await strapi.db.query('plugin::users-permissions.user').create({
					data: {
						cel: cel,
						blocked: false,
						confirm: true,
						publishedAt: new Date(),
					},
				});
			}
			console.table(user);
			for (const sentence of data) {
				sentence['userphone'] = user.id;
				let newSentence = await strapi.entityService.create('api::sentence.sentence', {
					data: sentence,
				});
				sentences.push(newSentence);
			}

			return { status: 200, data: user };
		} catch (err) {
			return { error: err.message };
		}
	},
	getSentences: async (ctx, next) => {
		const { cel } = ctx.request.body;

		try {
			const user = await strapi.db.query('plugin::users-permissions.user').findOne({
				where: {
					cel: cel,
				},
			});
			const data = await strapi.entityService.findMany('api::sentence.sentence', {
				filters: {
					userphone: user.id,
				},
				// populate: '*',
			});
			return data;
		} catch (err) {
			return { error: 'dont found' };
		}
	},
	deleteSentence: async (ctx, next) => {
		const { id, cel } = ctx.request.body;
		try {
			const sentence = await strapi.entityService.findOne('api::sentence.sentence', id, { populate: '*' });
			if (!sentence) {
				return { status: 404, data: 'error' };
			}
			if (sentence.userphone.cel !== cel) {
				return { status: 404, data: 'error' };
			}
			const data = await strapi.entityService.delete('api::sentence.sentence', id);
			return { status: 200, data };
		} catch (err) {
			return { error: err.message };
		}
	},
	cronSentences: async (ctx, next) => {
		const { cel, interval } = ctx.request.body;
		if (interval) {
			const setInterval = await strapi.db.query('plugin::users-permissions.user').update({
				where: {
					cel: cel,
				},
				data: {
					interval: `0 */${interval} * * * *`,
				},
			});
		}
		const user = await strapi.db.query('plugin::users-permissions.user').findOne({
			where: {
				cel: cel,
			},
		});
		return { status: 200, data: user };
	},
};
