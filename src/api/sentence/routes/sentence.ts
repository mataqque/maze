export default {
	routes: [
		{
			method: 'POST',
			path: '/sentences/list',
			handler: 'sentence.getSentences',
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: 'POST',
			path: '/sentences/sentence',
			handler: 'sentence.getSentence',
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: 'POST',
			path: '/sentences',
			handler: 'sentence.createSentence',
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: 'POST',
			path: '/sentences/delete',
			handler: 'sentence.deleteSentence',
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: 'POST',
			path: '/sentences/cron',
			handler: 'sentence.cronSentences',
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};
