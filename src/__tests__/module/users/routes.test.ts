// import mongoose from 'mongoose'
import app from '../../../app'
// jest.setTimeout(100000000)

import request from 'supertest'
import { expect, test } from 'vitest'

// describe('POST /user/signup ', () => {
// })
test('User signup: ', async () => {
    const res = await 
    request(app.app)
            .post('/api/v1/user/signup')
            .send({
                "name": "DJ",
                "email": "dharmaraj.jadeja911@gmail.com",
                "password": "abcd123456",
                "mobileNumber": "+917874594418"
            })
            .set('Accept', 'application/json')
            // .end((err,res)=>{
            //     if(err) console.log('ERROR: ',err)
                
            // })
            if (res.statusCode === 201) {
                expect(res.body).toMatchObject({
                    "result": 1,
                    "message": "Registration successfully",
                    "data": {}
                })
            }
    
            if (res.statusCode === 500) {
                expect(res.body).toMatchObject({
                    "result": 0,
                    "data": {}
                })
            }
})

// afterAll(async () => {
//     await mongoose.connection.close()
// })