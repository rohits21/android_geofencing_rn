import AsyncStorage from '@react-native-async-storage/async-storage'

const getUserData = async()=>{
    let res = await AsyncStorage.getItem('user')
    //console.log("Action bar", res);
    
    if(res){
     res = await JSON.parse(res);
     console.log(" User data fun called ", res.displayName,  userData.displayName);
     return res
    }else{
        return null;
    }
  }

  export {getUserData}
