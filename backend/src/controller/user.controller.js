import { getUserUrls } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res) => {
    const {_id} = req.user;
    // console.log(_id)
    const urls = await getUserUrls(_id);
    console.log(urls)
    res.status(200).json({message: "Success",urls});
}