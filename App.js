import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddPost = () => {
    if (inputText.trim() !== '') {
      if (editIndex !== null) {
        // If editing, update the existing post
        const updatedPosts = [...posts];
        updatedPosts[editIndex] = inputText;
        setPosts(updatedPosts);
        setEditIndex(null);
      } else {
        // If not editing, add a new post
        setPosts([...posts, inputText]);
      }
      setInputText('');
    }
  };

  const handleEditPost = (index) => {
    setInputText(posts[index]);
    setEditIndex(index);
  };

  const handleDeletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시글 목록</Text>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <View style={styles.postItem}>
            <Text>{item}</Text>
            <View style={styles.buttonContainer}>
              <Button title="수정" onPress={() => handleEditPost(index)} />
              <Button title="삭제" onPress={() => handleDeletePost(index)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        placeholder="게시글을 입력하세요"
      />
      <Button title={editIndex !== null ? '수정하기' : '추가하기'} onPress={handleAddPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});