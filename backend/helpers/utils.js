/* eslint-disable no-tabs */
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const fs = require('fs')
import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;
import { readFileSync } from 'fs';

import { genSaltSync, hashSync } from 'bcrypt';


const privateKEY = readFileSync('./private.key', 'utf8')
const publicKEY = readFileSync('./public.key', 'utf8')

const i = 'jwt-node'
const s = 'jwt-node'
const a = 'jwt-node'

const verifyOptions = {
	issuer: i,
	subject: s,
	audience: a,
	expiresIn: '8784h',
	algorithm: ['RS256'],
}

const saltRounds = 10
const salt = genSaltSync(saltRounds)


	export const generateJWT = (payload) => {
		const signOptions = {
			issuer: i,
			subject: s,
			audience: a,
			expiresIn: '8784h',
			algorithm: 'RS256',
		}

		const options = signOptions
		if (payload && payload.exp) {
			delete options.expiresIn
		}
		return sign(payload, privateKEY, options)
	}

	export const verifyJWT = (payload) => {
		return verify(payload, publicKEY, verifyOptions)
	}

	export const hashPassword = (password) => {
		const hash = hashSync(password, salt)
		return hash
	}


// module.exports = {
// 	hashPassword, verifyJWT, generateJWT
// }
