import express from "express";
import userModel from "../models/user.js";

const createUser = async (req, res) => {
    const information = req.body

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    if(!regexPassword.test(information.password)){
        return res.json({
            "message": "Password my contain atleast one capital letter, small letter, digit, special character each and it must have at least 8 characters in total"
        })
    }
    if(!information.password || !information.email){
        return res.json({
            "message": "Please fill in the required credentials"
        })
    }

    try {
        const newUser = new userModel(information)
        const storeUser = await newUser.save()

        return res.json({
            "message": "Account Successfully Created",
            User: storeUser
        })
        
    } catch (error) {
        res.json({
            "message": error
        })
    }
}

const getUsers = async (req, res) => {
    try{
        const Users = await userModel.find()
        return res.json({
            users: Users
        })
    }
    catch(error){
        return res.json({
            "message": "something went wrong"
        })
    }
}

const updateUsers = async (req, res) => {
    const {id} = req.params
    const info = req.body
    try {
        const update = await userModel.findByIdAndUpdate(
        id,
        {...info},
        {new: true}
    )
    return res.json({
        "message": "updated successfully",
        updated: update
    })
    } catch (error) {
        return res.send("something went wrong")
    }
    
}

const deleteUsers = async (req, res) => {
    const {id} = req.query
    const remove =  userModel.findByIdAndDelete(id)
}

const Userlogin = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.send("Please input your credentials")
    }
    try {
        const user = await userModel.findOne(email)
    if(!user){
        return res.json({
            "message": "Account does not exist, please navigate to the create account, THANKS"
        })
    } else {
       return res.json({
            id: user_id,
            name: user.name
        })
    }
    } catch (error) {
        return res.send(error)
    }
    
}

export {createUser, getUsers, updateUsers, deleteUsers, Userlogin}