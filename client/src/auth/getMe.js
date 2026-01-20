export const getMe=async()=>{
    try {
        const res=await fetch("http://localhost:3000/me",{
            method:'GET',
            credentials:"include"
        })
        if(!res.ok) return null
        return res.json()
    } catch (error) {
        console.log('err fetching user backend :',error)
    }
}
