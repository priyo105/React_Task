import React,{useEffect, useState} from "react";
import {View,Text,StyleSheet,FlatList,Image, ActivityIndicator, SafeAreaView} from "react-native";
import Appbar from "./Appbar";
import FetchMeme from '../app/api/FetchMeme'
import QRCode from 'react-native-qrcode-svg';

import RNQRGenerator from 'rn-qr-generator';


export default function Home(){
    const[responseData,setData]=useState('');
    const[qrCode,setQrCode]=useState([]);
    let qrcodeArrayList=[]
    let count=0
   
    useEffect(()=>{
           callApi();
       },[])

       const flatListrenderLoader=()=>{
        return(
          <View>
              <ActivityIndicator size="large" color="red"></ActivityIndicator>
          </View>
        );
    }

    

    const FlatListItem = ({ title,index }) => (
              <View style={styles.item}>
                <View style={{flexDirection:"row"}}>
                        <Image
                        style={{width: 150, height: 150}}
                        source={{uri:title.url}}
                        />

                        <SafeAreaView style={{alignSelf:"center",marginLeft:20,flexShrink:1}}>
                        <Text style={styles.title}> ID : {title.id} {index}</Text>
                        <Text style={styles.title}> Name : {title.name}</Text>
                        <Image
                        style={{width: 100, height: 100}}
                        source={{uri:qrCode[title.index]}
                      }
                        />

                        </SafeAreaView>
                 </View>

                 <View
                     style={{
                            borderBottomColor: 'black',
                            marginTop:20,
                            borderBottomWidth: 1,
                            }}/>
        
        </View>
      ); 

       const renderItem = ({ item,index }) => (    
        <FlatListItem title={item}  index={index}/>);
      
    return(
        <SafeAreaView>
            <Appbar title="Home"></Appbar>
            <Text style={{textAlign:"center",marginTop:10,fontWeight:"bold"}}>Data shown below in flatlist</Text>

            <FlatList
                 data={responseData}
                 style={{marginBottom:200}}
                 renderItem={(item,index)=>renderItem(item,index)}
                 onEndReached={()=>{
                      onEndReach();
                 }}
                 
                 ListFooterComponent={flatListrenderLoader}
                 keyExtractor={item => item.id}
      />
        </SafeAreaView>
    );


   
    async function onEndReach(){
        let data=await FetchMeme.fetchData();
        let previousData=[];
        previousData=responseData;  

        let memeArr=[];  
        count=0;    
      
      //refine new data for qr codes
        data.data.data.memes.map(x=>{
          x["index"]=count;
          memeArr.push(x)
          count++;
        })

        previousData.push(...memeArr);
        // setData(newData);
        
       console.warn(qrcodeArrayList);

      
        
    }

    async function callApi(){
        let data=await FetchMeme.fetchData();
        
        //refine the data  for qr codes
        let memeArr=[];      
        data.data.data.memes.map(x=>{
          x["index"]=count;
          memeArr.push(x)
          count++;
        })

       // console.warn(memeArr);

        setData(memeArr);

        // QR CODE GENERATOR only once for first 100 data
          generateQrCode(memeArr); 

  }


   function generateQrCode(responseData){
    
    let qrArray=[];
    qrArray=responseData;

   for(let i=0;i<qrArray.length;i++){

         RNQRGenerator.generate({
          value: qrArray[i].url,
          height: 100,
          width: 100,
        }).then(response => {
            const { uri, width, height, base64 } = response;
            // console.warn(uri);
            qrcodeArrayList.push(uri);
          }).catch(error => console.log(console.warn("error")));

        }
  setQrCode(qrcodeArrayList);
 // console.warn(qrCode);
   
}

}









const styles = StyleSheet.create({

    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 14,
      flexShrink: 1,
      fontWeight:"bold"
       
    },
  });
  