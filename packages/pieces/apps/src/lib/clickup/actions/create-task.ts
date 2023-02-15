import { createAction, Property, HttpMethod, getAccessTokenOrThrow } from "@activepieces/framework";
import { clickupCommon, callClickUpApi } from "../common";


export const createClickupTask = createAction({
	name: 'create_task',
	description: 'Create a new task in a ClickUp workspace and list',
	displayName: 'Create Task',
	props: {
		authentication: clickupCommon.authentication,
		workspace_id: clickupCommon.workspace_id,
		space_id: clickupCommon.space_id,
		list_id: clickupCommon.list_id,
		name: Property.ShortText({
			description: 'The name of the task to create',
			displayName: 'Task Name',
			required: true,
		}),
		description: Property.LongText({
			description: 'The description of the task to create',
			displayName: 'Task Description',
			required: true,
		}),
	},
	async run(configValue) {
		const { list_id, name, description, authentication } = configValue.propsValue;
		return await callClickUpApi(HttpMethod.POST,
			`list/${list_id}/task`, getAccessTokenOrThrow(authentication), {
			name,
			description
		});
	},
});