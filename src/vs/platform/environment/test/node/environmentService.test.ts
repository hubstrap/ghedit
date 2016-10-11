/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as assert from 'assert';
import { parseArgs } from 'vs/code/node/argv';
import { parseExtensionHostPort } from 'vs/platform/environment/node/environmentService';

suite('EnvironmentService', () => {

	test('parseExtensionHostPort when built', () => {
		const parse = a => parseExtensionHostPort(parseArgs(a), true);

		assert.deepEqual(parse([]), { port: null, break: false });
		assert.deepEqual(parse(['--debugPluginHost']), { port: null, break: false });
		assert.deepEqual(parse(['--debugPluginHost=1234']), { port: 1234, break: false });
		assert.deepEqual(parse(['--debugBrkPluginHost']), { port: null, break: false });
		assert.deepEqual(parse(['--debugBrkPluginHost=5678']), { port: 5678, break: true });
		assert.deepEqual(parse(['--debugPluginHost=1234', '--debugBrkPluginHost=5678']), { port: 5678, break: true });
	});

	test('parseExtensionHostPort when unbuilt', () => {
		const parse = a => parseExtensionHostPort(parseArgs(a), false);

		assert.deepEqual(parse([]), { port: 5870, break: false });
		assert.deepEqual(parse(['--debugPluginHost']), { port: 5870, break: false });
		assert.deepEqual(parse(['--debugPluginHost=1234']), { port: 1234, break: false });
		assert.deepEqual(parse(['--debugBrkPluginHost']), { port: 5870, break: false });
		assert.deepEqual(parse(['--debugBrkPluginHost=5678']), { port: 5678, break: true });
		assert.deepEqual(parse(['--debugPluginHost=1234', '--debugBrkPluginHost=5678']), { port: 5678, break: true });
	});
});