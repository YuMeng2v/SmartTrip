import React, {useState, useRef} from 'react';
import {StyleSheet, View, FlatList, Animated, Easing} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { BlurView } from "@react-native-community/blur";
import ResultItem from './result_item';


const searchbar = props => {
  const {itemList, navigation} = props
  const [queryText, setQueryText] = useState('')
  const [dataSource, setDataSource] = useState(itemList)
  const [dataBackup, setDataBackup] = useState(itemList)
  const [showList, setShowList] = useState(false)

  const fadeAnim = useRef(new Animated.Value(0)).current
  const driftAnim = useRef(new Animated.Value(700)).current
  const parallelAni = Animated.parallel([
    // after decay, in parallel:
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:300, // return to start
      useNativeDriver: true,
    }),
    Animated.timing(driftAnim, {
      toValue: 60,
      duration:400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    })
  ])

  // React.useEffect(() => {
  //   // Animated.timing(                  // 随时间变化而执行动画
  //   //   fadeAnim,                       // 动画中的变量值
  //   //   {
  //   //     toValue: 1,                   // 透明度最终变为1，即完全不透明
  //   //     duration: 400,              // 让动画持续一段时间
  //   //   }
  //   // ).start();    
  //   .start();
  // }, [showList])


  const filterList = (text) => {
    var newData = dataBackup;
    newData = dataBackup.filter((item) => {
      const itemData = item.place.toLowerCase().split(" ").join("");
      const textData = text.toLowerCase().split(" ").join("");
      return itemData.includes(textData);
    });
    setDataSource(newData)
    setQueryText(text)
    console.log(newData)
  };

  const renderItems = item => {
    return(
      <ResultItem />
    )
  }

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.bar}
        fontSize={19}
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        placeholder="Search here"
        onFocus={()=>{
          setShowList(true);
          parallelAni.start();
        }}
        onBlur={()=>{
          setShowList(false);
          fadeAnim.setValue(0);
          driftAnim.setValue(700);
        }}
        onChangeText={(text) => filterList(text)}
        onSearchPress={() => console.log("Search Icon is pressed")}
        onClearPress={() => {
          filterList("");
          setShowList(false);
          fadeAnim.setValue(0);
          driftAnim.setValue(700);
        }}
        onPress={() => setShowList(true)}
      />
      {showList?
        <View style={styles.wrapper}>
          <Animated.View style={{...styles.blurWrapper,opacity:fadeAnim}}>
            <BlurView
              style={styles.blur}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"/>
          </Animated.View>
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={{...styles.flatlist, top:driftAnim}}
            data={dataSource}
            renderItem={renderItems}/>
        </View> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    top:45,
    width:430,
    height:720,
    alignItems: 'center',
    position: 'absolute',
    // justifyContent:'center',
  },
  blurWrapper: {
    width:430,
    height:720,
    position: 'absolute',
  },
  flatlist: {
    top:60,
    width: 350,
    zIndex:4,
    // alignItems: 'center',
  },
  blur: {
    top:-50,
    width: 430,
    height:800,
    position: 'absolute',
    zIndex:3,
  },
  contentContainer: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#ffffff',
    height: 150,
    width: 320,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#757575',
    shadowOpacity: 0.3,
    shadowOffset:{
      width:0,
      height:3
    },
    shadowRadius:8,
    alignItems: 'center',
    justifyContent:'center',
  },
  container: {
    zIndex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar:{
    zIndex:4,
    top: 40,
    height:45,
    width:350,
    fontSize:40
  }
});

export default searchbar