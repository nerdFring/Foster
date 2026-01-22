
export const sendTokenCookie=(res,token)=>{
res.cookie("token",token,{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"strict",
    maxAge: 30 * 24 * 60 * 60 * 1000 
})
}

export const clearTokenCookie=(res)=>{
res.cookie("token","",{
    httpOnly:true,
    expires:new Date(0)
})
}
