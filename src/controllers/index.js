import { test } from './test';

export async function testController(req, res) {
    return await test(req, res);
}
