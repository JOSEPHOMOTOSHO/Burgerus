import {Request} from 'express'
interface obj {
    [key: string]: any
}

export interface IGetUserAuthInfoRequest extends Request {
    user?: obj // or any other type
  }

export default obj