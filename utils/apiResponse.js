const apiResponse = (success, message, data,status,  res)=>{
    return res.status(status).json({success, message, data});
}

export default apiResponse