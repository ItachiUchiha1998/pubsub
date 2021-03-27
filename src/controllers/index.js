import { test } from './test'
import { createPortfolio } from './createPortfolio'
import { getPortfolios } from './getPortfolios' 
import { NotFound } from './NotFound'
export async function testController(req, res) {
    return await test(req, res);
}

export async function createPortfolioController(req, res) {
    return await createPortfolio(req, res);
}

export async function getPortfoliosController(req, res) {
    return await getPortfolios(req, res);
}

export async function NotFoundController(req, res) {
    return await NotFound(req, res);
}
