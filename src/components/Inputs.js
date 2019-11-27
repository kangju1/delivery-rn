import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";

export const LabelInput = (props) => {
    return (
        <View style={[styles.labelInput, props.style]}>
            <Text>{props.label}</Text>
            <TextInput
                style={{
                    backgroundColor: '#fff',
                    fontSize: 16,
                    padding: 10,
                    marginTop: 5,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 3,
                    minHeight: props.multiline ? 100 : 0,
                    textAlignVertical: 'top',
                }}
                value={props.value}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
                onBlur={() => props.onBlur}
                multiline={props.multiline}
            />
        </View>
    )
};


const styles = {
    labelInput: {
        marginTop: 20,
    },
};
