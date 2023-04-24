import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EditableTextProps {
    initialText: string;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    enableEdit?: boolean;
    onAccept?: (newText: string) => void;
    onDecline?: () => void;
}

const EditableText = ({ initialText, textStyle, containerStyle, enableEdit, onAccept, onDecline }: EditableTextProps) => {
    const [savedText, setSavedText] = useState(initialText)
    const [text, setText] = useState(savedText);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleAccept = () => {
        setIsEditing(false);
        setSavedText(text);
        onAccept && onAccept(text);
    };

    const handleDecline = () => {
        setText(savedText);
        setIsEditing(false);
        onDecline && onDecline();
    };

    const handleChangeText = (newText: string) => {
        setText(newText);
    };

    return (
        <View style={containerStyle}>
            {isEditing ? (
                <View style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}>
                    <TextInput autoFocus={true} style={textStyle} value={text} onChangeText={handleChangeText} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={handleAccept}>
                            <Icon name="done" size={20} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleDecline}>
                            <Icon name="close" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}>
                    <Text style={textStyle}>{text}</Text>
                    {enableEdit && <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Icon name="edit" size={20} color="black" />
                    </TouchableOpacity>}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
    },
});

export default EditableText;