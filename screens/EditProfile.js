// import React, { useState, useEffect } from "react";
// import { Text, View } from "react-native";
// import {
//   ChannelList,
//   Channel,
//   MessageList,
//   MessageInput,
//   useChatContext,
// } from "stream-chat-expo";
// import useLoginState from "../hooks/UseLoginState";

// const ModalScreen = ({ route }) => {
//   const { client } = useChatContext();

//   const params = route.params;
//   const [channel, setChannel] = useState(null);
//   console.log(channel);

//   useEffect(() => {
//     const fetchChannel = async () => {
//       // Correctly formatted query using filters
//       // const filter = { type: "messaging", members: { $in: ["sarvam seetohul"] } };
//       // const sort = [{ last_message_at: -1 }];

//       const channels = await chatClient.queryChannels(params);
//       setChannel(channels[0]);
//     };
//     fetchChannel();
//   }, [params]);

//   return (
//     <Text>dsfsfsfsfs</Text>
//     // <Channel>
//     //   <MessageList />
//     //   <MessageInput />
//     // </Channel>
//   );
// };

// export default ModalScreen;

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Switch,
//   Image,
// } from 'react-native';
// import { AntDesign } from "@expo/vector-icons";

// const tabs = [
//   { name: 'Preferences', icon: 'settings' },
//   { name: 'Help', icon: 'help-circle' },
//   { name: 'Content', icon: 'align-center' },
// ];

// export default function ModalScreen() {
//   const [value, setValue] = React.useState(0);
//   const [form, setForm] = useState({
//     emailNotifications: true,
//     pushNotifications: false,
//   });

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Settings</Text>

//           <Text style={styles.subtitle}>
//             Lorem ipsum dolor sit amet consectetur.
//           </Text>
//         </View>

//         <View style={styles.profile}>
//           <View style={styles.profileHeader}>
//             <Image
//               alt=""
//               source={{
//                 uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
//               }}
//               style={styles.profileAvatar} />

//             <View>
//               <Text style={styles.profileName}>John Doe</Text>

//               <Text style={styles.profileHandle}>@john.doe</Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() => {
//               // handle onPress
//             }}>
//             <View style={styles.profileAction}>
//               <Text style={styles.profileActionText}>Edit Profile</Text>

//              <AntDesign name="search1" size={22} color="gray" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.tabs}>
//           {tabs.map(({ name, icon }, index) => {
//             const isActive = index === value;

//             return (
//               <View
//                 key={name}
//                 style={[
//                   styles.tabWrapper,
//                   isActive && { borderBottomColor: '#6366f1' },
//                 ]}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setValue(index);
//                   }}>
//                   <View style={styles.tab}>
//                   <AntDesign name="search1" size={22} color="gray" />

//                     <Text
//                       style={[
//                         styles.tabText,
//                         isActive && { color: '#6366f1' },
//                       ]}>
//                       {name}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             );
//           })}
//         </View>

//         {value === 0 && (
//           <ScrollView>
//             <View style={styles.section}>
//               <View style={styles.sectionBody}>
//                 <View style={[styles.rowWrapper, styles.rowFirst]}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       // handle onPress
//                     }}
//                     style={styles.row}>
//                     <Text style={styles.rowLabel}>Language</Text>

//                     <View style={styles.rowSpacer} />

//                     <Text style={styles.rowValue}>English</Text>

//                 <AntDesign name="search1" size={22} color="gray" />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.rowWrapper}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       // handle onPress
//                     }}
//                     style={styles.row}>
//                     <Text style={styles.rowLabel}>Location</Text>

//                     <View style={styles.rowSpacer} />

//                     <Text style={styles.rowValue}>Los Angeles, CA</Text>

//                   <AntDesign name="search1" size={22} color="gray" />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.rowWrapper}>
//                   <View style={styles.row}>
//                     <Text style={styles.rowLabel}>Email Notifications</Text>

//                     <View style={styles.rowSpacer} />

//                     <Switch
//                       onValueChange={emailNotifications =>
//                         setForm({ ...form, emailNotifications })
//                       }
//                       style={{
//                         transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
//                       }}
//                       value={form.emailNotifications} />
//                   </View>
//                 </View>

//                 <View style={styles.rowWrapper}>
//                   <View style={styles.row}>
//                     <Text style={styles.rowLabel}>Push Notifications</Text>

//                     <View style={styles.rowSpacer} />

//                     <Switch
//                       onValueChange={pushNotifications =>
//                         setForm({ ...form, pushNotifications })
//                       }
//                       style={{
//                         transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
//                       }}
//                       value={form.pushNotifications} />
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Resources</Text>

//               <View style={styles.sectionBody}>
//                 <View style={[styles.rowWrapper, styles.rowFirst]}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       // handle onPress
//                     }}
//                     style={styles.row}>
//                     <Text style={styles.rowLabel}>Contact Us</Text>

//                     <View style={styles.rowSpacer} />
// <AntDesign name="search1" size={22} color="gray" />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.rowWrapper}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       // handle onPress
//                     }}
//                     style={styles.row}>
//                     <Text style={styles.rowLabel}>Report Bug</Text>

//                     <View style={styles.rowSpacer} />

//                   <AntDesign name="search1" size={22} color="gray" />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.rowWrapper}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       // handle onPress
//                     }}
//                     style={styles.row}>
//                     <Text style={styles.rowLabel}>Rate in App Store</Text>

//                     <View style={styles.rowSpacer} />

//                    <AntDesign name="search1" size={22} color="gray" />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.rowWrapper}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       // handle onPress
//                     }}
//                     style={styles.row}>
//                     <Text style={styles.rowLabel}>Terms and Privacy</Text>

//                     <View style={styles.rowSpacer} />

//                    <AntDesign name="search1" size={22} color="gray" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     paddingHorizontal: 0,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   header: {
//     paddingLeft: 24,
//     paddingRight: 24,
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1d1d1d',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#929292',
//   },
//   tabs: {
//     flexDirection: 'row',
//     paddingTop: 16,
//     backgroundColor: '#fff',
//   },
//   /** Profile */
//   profile: {
//     paddingTop: 12,
//     paddingHorizontal: 24,
//     paddingBottom: 24,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e3e3e3',
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   profileAvatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 9999,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginRight: 12,
//   },
//   profileName: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#3d3d3d',
//   },
//   profileHandle: {
//     marginTop: 4,
//     fontSize: 15,
//     color: '#989898',
//   },
//   profileAction: {
//     marginTop: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007bff',
//     borderRadius: 12,
//   },
//   profileActionText: {
//     marginRight: 8,
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   /** Tab */
//   tab: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 10,
//     paddingBottom: 10,
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   tabWrapper: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//     borderColor: '#e5e7eb',
//     borderBottomWidth: 2,
//   },
//   tabText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#6b7280',
//     marginLeft: 5,
//   },
//   /** Section */
//   section: {
//     marginTop: 12,
//   },
//   sectionBody: {
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e3e3e3',
//     paddingLeft: 24,
//   },
//   sectionTitle: {
//     marginTop: 0,
//     marginHorizontal: 24,
//     marginBottom: 8,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#a7a7a7',
//     textTransform: 'uppercase',
//     letterSpacing: 1.2,
//   },
//   /** Row */
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     height: 44,
//     paddingRight: 24,
//   },
//   rowWrapper: {
//     borderTopWidth: 1,
//     borderColor: '#e3e3e3',
//   },
//   rowFirst: {
//     borderTopWidth: 0,
//   },
//   rowLabel: {
//     fontSize: 17,
//     fontWeight: '500',
//     color: '#2c2c2c',
//   },
//   rowSpacer: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   rowValue: {
//     fontSize: 17,
//     fontWeight: '500',
//     color: '#7f7f7f',
//     marginRight: 4,
//   },
// });


import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const users = [
  {
    img: '',
    name: 'Bell Burgess',
    phone: '+1 (887) 478-2693',
  },
  {
    img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    name: 'Bernard Baker',
    phone: '+1 (862) 581-3022',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    name: 'Elma Chapman',
    phone: '+1 (913) 497-2020',
  },
  {
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Knapp Berry',
    phone: '+1 (951) 472-2967',
  },
  {
    img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    name: 'Larson Ashbee',
    phone: '+1 (972) 566-2684',
  },
  {
    img: '',
    name: 'Lorraine Abbott',
    phone: '+1 (959) 422-3635',
  },
  {
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Rosie Arterton',
    phone: '+1 (845) 456-2237',
  },
  {
    img: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Shelby Ballard',
    phone: '+1 (824) 467-3579',
  },
];

export default function ModalScreen() {
  const [input, setInput] = useState('');
  const filteredRows = useMemo(() => {
    const rows = [];
    const query = input.toLowerCase();

    for (const item of users) {
      const nameIndex = item.name.toLowerCase().search(query);

      if (nameIndex !== -1) {
        rows.push({
          ...item,
          index: nameIndex,
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [input]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon
                color="#848484"
                name="search"
                size={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={val => setInput(val)}
              placeholder="Start typing.."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.searchContent}>
          {filteredRows.length ? (
            filteredRows.map(({ img, name, phone }, index) => {
              return (
                <View key={index} style={styles.cardWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.card}>
                      {img ? (
                        <Image
                          alt=""
                          resizeMode="cover"
                          source={{ uri: img }}
                          style={styles.cardImg} />
                      ) : (
                        <View style={[styles.cardImg, styles.cardAvatar]}>
                          <Text style={styles.cardAvatarText}>{name[0]}</Text>
                        </View>
                      )}

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{name}</Text>

                        <Text style={styles.cardPhone}>{phone}</Text>
                      </View>

                      <View style={styles.cardAction}>
                        <FeatherIcon
                          color="#9ca3af"
                          name="chevron-right"
                          size={22} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={styles.searchEmpty}>No results</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Search */
  search: {
    position: 'relative',
    backgroundColor: '#efefef',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: '500',
    fontSize: 15,
    color: '#9ca1ac',
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
});